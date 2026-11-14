/* ------------------------------------------------------------------
   SPACE SOUNDS — made with the browser's Web Audio API (no sound files)
   - playTransmission(): radio static + the "beep" heard on Apollo radio calls
   - startHum(): a soft, deep space hum. Returns a function that stops it.
------------------------------------------------------------------- */

let ctx: AudioContext | null = null;

function audio(): AudioContext | null {
  const AudioCtx =
    window.AudioContext ||
    (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!AudioCtx) return null;
  if (!ctx) ctx = new AudioCtx();
  if (ctx.state === "suspended") ctx.resume();
  return ctx;
}

/** White noise, used for radio static and the hum's "air" */
function noiseBuffer(context: AudioContext, seconds: number) {
  const buffer = context.createBuffer(1, context.sampleRate * seconds, context.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
  return buffer;
}

/** Short burst of radio static, then a 2525 Hz "Quindar" beep like Apollo radio */
export function playTransmission() {
  const c = audio();
  if (!c) return;
  const now = c.currentTime;

  // static
  const noise = c.createBufferSource();
  noise.buffer = noiseBuffer(c, 0.4);
  const band = c.createBiquadFilter();
  band.type = "bandpass";
  band.frequency.value = 1800;
  band.Q.value = 0.8;
  const staticGain = c.createGain();
  staticGain.gain.setValueAtTime(0.0001, now);
  staticGain.gain.exponentialRampToValueAtTime(0.06, now + 0.03);
  staticGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.35);
  noise.connect(band).connect(staticGain).connect(c.destination);
  noise.start(now);
  noise.stop(now + 0.4);

  // beep
  const beep = c.createOscillator();
  beep.type = "sine";
  beep.frequency.value = 2525;
  const beepGain = c.createGain();
  beepGain.gain.setValueAtTime(0.0001, now + 0.36);
  beepGain.gain.exponentialRampToValueAtTime(0.035, now + 0.38);
  beepGain.gain.setValueAtTime(0.035, now + 0.58);
  beepGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.62);
  beep.connect(beepGain).connect(c.destination);
  beep.start(now + 0.36);
  beep.stop(now + 0.65);
}

/** Soft background hum. Call the returned function to fade it out. */
export function startHum(): () => void {
  const c = audio();
  if (!c) return () => {};
  const now = c.currentTime;

  const master = c.createGain();
  master.gain.setValueAtTime(0.0001, now);
  master.gain.exponentialRampToValueAtTime(0.05, now + 2.5); // slow fade in
  master.connect(c.destination);

  // two low tones, slightly out of tune, for a slow "wobble"
  const tones = [55, 82.7].map((freq) => {
    const osc = c.createOscillator();
    osc.type = "sine";
    osc.frequency.value = freq;
    const g = c.createGain();
    g.gain.value = 0.5;
    osc.connect(g).connect(master);
    osc.start();
    return osc;
  });

  // very quiet, muffled "air"
  const air = c.createBufferSource();
  air.buffer = noiseBuffer(c, 2);
  air.loop = true;
  const low = c.createBiquadFilter();
  low.type = "lowpass";
  low.frequency.value = 400;
  const airGain = c.createGain();
  airGain.gain.value = 0.25;
  air.connect(low).connect(airGain).connect(master);
  air.start();

  return () => {
    const t = c.currentTime;
    master.gain.cancelScheduledValues(t);
    master.gain.setValueAtTime(master.gain.value, t);
    master.gain.exponentialRampToValueAtTime(0.0001, t + 0.8);
    [...tones, air].forEach((node) => node.stop(t + 0.9));
  };
}