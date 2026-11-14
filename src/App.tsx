import { Canvas, ThreeEvent, useFrame, useThree } from "@react-three/fiber";
import { Float, Html, OrbitControls, Stars, useGLTF, useTexture } from "@react-three/drei";
import {
  ArrowLeft,
  ChevronRight,
  ExternalLink,
  Headphones,
  Home,
  Info,
  Menu,
  Rotate3D,
  SkipForward,
  Volume2,
  VolumeX,
  X,
} from "lucide-react";
import React, { Suspense, useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { Equipment, sources, World, WorldId, worlds } from "./data";
import { playTransmission, startHum } from "./sounds";

type View = "home" | "launch" | "surface";

/* ------------------------------------------------------------------
   PLANETS
   By default each globe is a sphere wrapped in a real surface map
   (public/textures). If you add a NASA planet .glb and set `modelUrl`
   in data.ts, that model is used instead — it is resized automatically.
------------------------------------------------------------------- */

function TexturedSurface({ url, radius }: { url: string; radius: number }) {
  const texture = useTexture(url, (t) => {
    const tex = Array.isArray(t) ? t[0] : t;
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.anisotropy = 8;
  });
  return (
    <mesh castShadow receiveShadow>
      <sphereGeometry args={[radius, 96, 96]} />
      <meshStandardMaterial map={texture} roughness={0.95} metalness={0} />
    </mesh>
  );
}

// Start downloading both surface maps straight away
Object.values(worlds).forEach((w) => useTexture.preload(w.texture));

function GlbSurface({ url, radius }: { url: string; radius: number }) {
  const { scene } = useGLTF(url);
  const model = useMemo(() => {
    const clone = scene.clone(true);
    clone.traverse((object) => {
      if (object instanceof THREE.Mesh) {
        object.castShadow = true;
        object.receiveShadow = true;
      }
    });
    // Centre the model and scale it so it is exactly `radius` big
    const sphere = new THREE.Box3().setFromObject(clone).getBoundingSphere(new THREE.Sphere());
    const s = sphere.radius > 0 ? radius / sphere.radius : 1;
    clone.position.sub(sphere.center).multiplyScalar(s);
    clone.scale.setScalar(s);
    return clone;
  }, [scene, radius]);
  return <primitive object={model} />;
}

function Planet({
  world,
  position,
  scale = 1,
  interactive = false,
  onSelect,
}: {
  world: World;
  position: [number, number, number];
  scale?: number;
  interactive?: boolean;
  onSelect?: () => void;
}) {
  const group = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  useEffect(
    () => () => {
      document.body.style.cursor = "";
    },
    [],
  );

  useFrame((_, delta) => {
    if (group.current) group.current.rotation.y += delta * (hovered ? 0.22 : 0.055);
  });

  const interaction = interactive
    ? {
        onClick: (e: ThreeEvent<MouseEvent>) => {
          e.stopPropagation();
          onSelect?.();
        },
        onPointerEnter: (e: ThreeEvent<PointerEvent>) => {
          e.stopPropagation();
          setHovered(true);
          document.body.style.cursor = "pointer";
        },
        onPointerLeave: () => {
          setHovered(false);
          document.body.style.cursor = "";
        },
      }
    : {};

  return (
    <group ref={group} position={position} {...interaction}>
      {world.modelUrl ? (
        <GlbSurface url={world.modelUrl} radius={scale} />
      ) : (
        <TexturedSurface url={world.texture} radius={scale} />
      )}
      {hovered && (
        <mesh scale={1.08}>
          <sphereGeometry args={[scale, 48, 48]} />
          <meshBasicMaterial
            color={world.accent}
            transparent
            opacity={0.08}
            side={THREE.BackSide}
          />
        </mesh>
      )}
    </group>
  );
}

/* ------------------------------------------------------------------
   SIMPLE 3D EQUIPMENT (used when an object has no NASA model)
------------------------------------------------------------------- */

function Wheel({ position }: { position: [number, number, number] }) {
  return (
    <mesh position={position} rotation={[Math.PI / 2, 0, 0]}>
      <cylinderGeometry args={[0.17, 0.17, 0.1, 16]} />
      <meshStandardMaterial color="#24282b" roughness={0.8} />
    </mesh>
  );
}

function EquipmentModel({
  type,
  scale = 1,
  highlight = false,
}: {
  type: Equipment["type"];
  scale?: number;
  highlight?: boolean;
}) {
  const material = (
    <meshStandardMaterial
      color={highlight ? "#ffb15c" : "#b7aa8d"}
      metalness={0.68}
      roughness={0.36}
      emissive="#ff8a3d"
      emissiveIntensity={highlight ? 0.75 : 0.02}
    />
  );

  if (type === "helicopter") {
    return (
      <group scale={scale}>
        <mesh>
          <boxGeometry args={[0.48, 0.2, 0.38]} />
          {material}
        </mesh>
        <mesh position={[0, 0.33, 0]}>
          <cylinderGeometry args={[0.025, 0.025, 0.6, 8]} />
          {material}
        </mesh>
        <mesh position={[0, 0.62, 0]}>
          <boxGeometry args={[1.35, 0.025, 0.06]} />
          {material}
        </mesh>
        <mesh position={[0, 0.55, 0]} rotation={[0, Math.PI / 2, 0]}>
          <boxGeometry args={[1.2, 0.025, 0.05]} />
          {material}
        </mesh>
        {[-0.25, 0.25].map((x) =>
          [-0.2, 0.2].map((z) => (
            <mesh key={`${x}-${z}`} position={[x, -0.2, z]} rotation={[0, 0, x > 0 ? -0.45 : 0.45]}>
              <cylinderGeometry args={[0.018, 0.018, 0.5, 6]} />
              {material}
            </mesh>
          )),
        )}
      </group>
    );
  }

  if (type === "lander") {
    return (
      <group scale={scale}>
        <mesh position={[0, 0.3, 0]}>
          <cylinderGeometry args={[0.28, 0.48, 0.45, 6]} />
          {material}
        </mesh>
        <mesh position={[0, 0.72, 0]}>
          <boxGeometry args={[0.48, 0.38, 0.42]} />
          {material}
        </mesh>
        {[-0.5, 0.5].map((x) =>
          [-0.42, 0.42].map((z) => (
            <group key={`${x}-${z}`}>
              <mesh position={[x * 0.55, 0, z * 0.55]} rotation={[z * 0.7, 0, x * 0.7]}>
                <cylinderGeometry args={[0.025, 0.025, 0.8, 6]} />
                {material}
              </mesh>
              <mesh position={[x, -0.22, z]}>
                <cylinderGeometry args={[0.12, 0.16, 0.05, 12]} />
                {material}
              </mesh>
            </group>
          )),
        )}
      </group>
    );
  }

  return (
    <group scale={scale}>
      <mesh position={[0, 0.22, 0]}>
        <boxGeometry args={[0.82, 0.2, 0.55]} />
        {material}
      </mesh>
      <mesh position={[0, 0.51, -0.05]} rotation={[-0.18, 0, 0]}>
        <boxGeometry args={[0.68, 0.05, 0.5]} />
        <meshStandardMaterial color="#21435a" metalness={0.5} roughness={0.25} />
      </mesh>
      <mesh position={[0.12, 0.75, 0]}>
        <cylinderGeometry args={[0.025, 0.025, 0.46, 8]} />
        {material}
      </mesh>
      <mesh position={[0.12, 0.97, 0]} rotation={[0, 0, -0.35]}>
        <cylinderGeometry args={[0.12, 0.15, 0.08, 16]} />
        {material}
      </mesh>
      <Wheel position={[-0.34, 0, -0.32]} />
      <Wheel position={[0.34, 0, -0.32]} />
      <Wheel position={[-0.34, 0, 0.32]} />
      <Wheel position={[0.34, 0, 0.32]} />
    </group>
  );
}

/* ------------------------------------------------------------------
   HOME — choose a world
------------------------------------------------------------------- */

function ChoiceScene({ onChoose }: { onChoose: (world: WorldId) => void }) {
  return (
    <Canvas camera={{ position: [0, 0.2, 8], fov: 44 }} dpr={[1, 1.7]}>
      <ambientLight intensity={0.35} />
      <directionalLight position={[-4, 5, 6]} intensity={3} color="#fff4dc" />
      <pointLight position={[0, -2, 3]} intensity={1.2} color="#d35f32" />
      <Stars radius={60} depth={35} count={1800} factor={2.5} saturation={0} fade speed={0.25} />
      <Planet
        world={worlds.moon}
        position={[-2.15, 0.35, 0]}
        scale={1.15}
        interactive
        onSelect={() => onChoose("moon")}
      />
      <Planet
        world={worlds.mars}
        position={[2.15, 0.35, 0]}
        scale={1.15}
        interactive
        onSelect={() => onChoose("mars")}
      />
      <Float speed={1.15} rotationIntensity={0.25} floatIntensity={0.35}>
        <group position={[-2.15, -1.42, 0.15]} rotation={[0.15, -0.4, 0]}>
          <EquipmentModel type="rover" scale={0.48} />
        </group>
      </Float>
      <Float speed={1} rotationIntensity={0.22} floatIntensity={0.35}>
        <group position={[2.15, -1.42, 0.15]} rotation={[0.15, -0.5, 0]}>
          <EquipmentModel type="rover" scale={0.48} />
        </group>
      </Float>
    </Canvas>
  );
}

function Starfield() {
  return (
    <div className="starfield" aria-hidden="true">
      <div className="stars stars-a" />
      <div className="stars stars-b" />
      <div className="stars stars-c" />
    </div>
  );
}

function Visor() {
  return (
    <div className="visor" aria-hidden="true">
      <div className="visor-corner visor-top-left">A7 / NAV</div>
      <div className="visor-corner visor-top-right">O₂ 98%</div>
      <div className="visor-corner visor-bottom-left">HEART RATE 72</div>
      <div className="visor-corner visor-bottom-right">SIGNAL GOOD</div>
    </div>
  );
}

function DestinationPage({ onChoose }: { onChoose: (world: WorldId) => void }) {
  return (
    <main className="destination-page">
      <Starfield />
      <section className="destination-intro">
        <p className="kicker">
          <span /> NASA’S QUIET MACHINES <span />
        </p>
        <h1>Where will you land?</h1>
        <p>You are the astronaut. Choose a world.</p>
      </section>
      <div className="choice-canvas" aria-hidden="true">
        <Suspense fallback={null}>
          <ChoiceScene onChoose={onChoose} />
        </Suspense>
      </div>
      <div className="world-choices">
        {(["moon", "mars"] as WorldId[]).map((id, index) => (
          <button
            key={id}
            className="world-choice"
            onClick={() => onChoose(id)}
            aria-label={`Launch toward ${worlds[id].name}`}
          >
            <span className="choice-number">0{index + 1}</span>
            <span>
              <strong>{worlds[id].name}</strong>
              <small>{worlds[id].eyebrow}</small>
            </span>
            <span className="choice-arrow">
              <ChevronRight size={18} />
            </span>
          </button>
        ))}
      </div>
      <div className="drag-hint">
        <Rotate3D size={15} /> Planets drift in real time
      </div>
      <Visor />
    </main>
  );
}
async function playLaunchSound() {
  const context = new window.AudioContext();
  await context.resume();

  const start = context.currentTime + 0.05;

  // Three countdown beeps, timed with the visual countdown.
  [0, 0.7, 1.4].forEach((delay) => {
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    const at = start + delay;

    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(880, at);

    gain.gain.setValueAtTime(0.0001, at);
    gain.gain.exponentialRampToValueAtTime(0.18, at + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, at + 0.22);

    oscillator.connect(gain);
    gain.connect(context.destination);
    oscillator.start(at);
    oscillator.stop(at + 0.24);
  });

  // One sustained rocket whoosh, from liftoff through the approach.
  const duration = 3.1;
  const at = start + 2.1;
  const length = Math.ceil(context.sampleRate * duration);
  const buffer = context.createBuffer(1, length, context.sampleRate);
  const samples = buffer.getChannelData(0);

  for (let i = 0; i < length; i++) {
    samples[i] = Math.random() * 2 - 1;
  }

  const source = context.createBufferSource();
  const filter = context.createBiquadFilter();
  const gain = context.createGain();

  source.buffer = buffer;

  filter.type = "lowpass";
  filter.frequency.setValueAtTime(180, at);
  filter.frequency.exponentialRampToValueAtTime(1800, at + 1.2);
  filter.frequency.setValueAtTime(1800, at + 2.1);
  filter.frequency.exponentialRampToValueAtTime(400, at + duration);

  gain.gain.setValueAtTime(0.0001, at);
  gain.gain.exponentialRampToValueAtTime(0.28, at + 0.5);
  gain.gain.setValueAtTime(0.28, at + 2.3);
  gain.gain.exponentialRampToValueAtTime(0.0001, at + duration);

  source.connect(filter);
  filter.connect(gain);
  gain.connect(context.destination);

  source.start(at);
  source.stop(at + duration);

  window.setTimeout(() => void context.close(), 6000);
}
/* ------------------------------------------------------------------
   LAUNCH — countdown animation
------------------------------------------------------------------- */

function LaunchSequence({ world, onComplete }: { world: World; onComplete: () => void }) {
  const [elapsed, setElapsed] = useState(0);
  const reduced = useMemo(() => window.matchMedia("(prefers-reduced-motion: reduce)").matches, []);

  useEffect(() => {
    if (reduced) {
      const timeout = window.setTimeout(onComplete, 700);
      return () => window.clearTimeout(timeout);
    }
    const start = performance.now();
    const timer = window.setInterval(() => {
      const next = performance.now() - start;
      setElapsed(next);
      if (next >= 5200) {
        window.clearInterval(timer);
        onComplete();
      }
    }, 50);
    return () => window.clearInterval(timer);
  }, [onComplete, reduced]);

  const message =
    elapsed < 700
      ? "T–MINUS 3"
      : elapsed < 1400
        ? "T–MINUS 2"
        : elapsed < 2100
          ? "T–MINUS 1"
          : elapsed < 3300
            ? "LIFTOFF"
            : `APPROACHING ${world.name.toUpperCase()}`;

  return (
    <main className={`launch-page ${reduced ? "reduced" : ""}`}>
      <Starfield />
      <div className="star-streaks" aria-hidden="true" />
      <div className="earth" aria-hidden="true" />
      <div className={`approach-planet ${world.id}`} aria-hidden="true" />
      <div className="rocket-window" aria-hidden="true" />
      <div className="launch-hud">
        <p>FLIGHT COMPUTER / AUTO</p>
        <h1 aria-live="polite">{message}</h1>
        <div className="progress-track">
          <span style={{ width: `${Math.min(100, elapsed / 52)}%` }} />
        </div>
        <small>DESTINATION LOCKED · {world.name.toUpperCase()}</small>
      </div>
      <button className="skip-button" onClick={onComplete}>
        <SkipForward size={16} /> Skip flight
      </button>
      <Visor />
    </main>
  );
}

/* ------------------------------------------------------------------
   SURFACE — 3D globe with markers
------------------------------------------------------------------- */

function latLonPosition(lat: number, lon: number, radius: number): [number, number, number] {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  return [
    -(radius * Math.sin(phi) * Math.cos(theta)),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta),
  ];
}

function Astronaut({ target }: { target: [number, number, number] }) {
  const group = useRef<THREE.Group>(null);
  const current = useRef(new THREE.Vector3(...target));

  useFrame((state, delta) => {
    current.current.lerp(new THREE.Vector3(...target), Math.min(1, delta * 1.2));
    if (group.current) {
      group.current.position.copy(current.current);
      group.current.lookAt(0, 0, 0);
      group.current.rotateX(-Math.PI / 2);
      group.current.position.y += Math.abs(Math.sin(state.clock.elapsedTime * 4)) * 0.025;
    }
  });

  return (
    <group ref={group} scale={0.15}>
      <mesh position={[0, 0.42, 0]}>
        <capsuleGeometry args={[0.22, 0.38, 8, 14]} />
        <meshStandardMaterial color="#ece8dc" roughness={0.65} />
      </mesh>
      <mesh position={[0, 0.88, 0.03]}>
        <sphereGeometry args={[0.24, 20, 20]} />
        <meshStandardMaterial color="#e9e7dd" />
      </mesh>
      <mesh position={[0, 0.9, 0.19]}>
        <sphereGeometry args={[0.17, 20, 10]} />
        <meshStandardMaterial color="#291c18" metalness={0.75} roughness={0.18} />
      </mesh>
      <mesh position={[-0.18, 0.08, 0]} rotation={[0, 0, -0.12]}>
        <capsuleGeometry args={[0.06, 0.34, 5, 8]} />
        <meshStandardMaterial color="#e9e7dd" />
      </mesh>
      <mesh position={[0.18, 0.08, 0]} rotation={[0, 0, 0.12]}>
        <capsuleGeometry args={[0.06, 0.34, 5, 8]} />
        <meshStandardMaterial color="#e9e7dd" />
      </mesh>
    </group>
  );
}

function CameraJourney({ traveling }: { traveling: boolean }) {
  const { camera } = useThree();

  useFrame((_, delta) => {
    const targetDistance = traveling ? 4.35 : 6.1;
    const currentDistance = camera.position.length();
    const nextDistance = THREE.MathUtils.lerp(
      currentDistance,
      targetDistance,
      Math.min(1, delta * 1.6),
    );
    camera.position.setLength(nextDistance);
  });

  return null;
}

/* One glowing marker on the globe. Its label hides while it is on the far side of the planet. */
function GlobeMarker({
  item,
  active,
  visited,
  labelLayer,
  onSelect,
  onHover,
}: {
  item: Equipment;
  active: boolean;
  visited: boolean;
  labelLayer: React.RefObject<HTMLDivElement | null>;
  onSelect: (equipment: Equipment) => void;
  onHover: (equipment: Equipment | null) => void;
}) {
  const group = useRef<THREE.Group>(null);
  const [facing, setFacing] = useState(true);
  const position = useMemo(() => latLonPosition(item.lat, item.lon, 2.07), [item.lat, item.lon]);
  const world = useMemo(() => new THREE.Vector3(), []);
  const center = useMemo(() => new THREE.Vector3(), []);
  const toCamera = useMemo(() => new THREE.Vector3(), []);

  useFrame(({ camera }) => {
    if (!group.current?.parent) return;
    group.current.getWorldPosition(world);
    group.current.parent.getWorldPosition(center);
    toCamera.copy(camera.position).sub(world);
    const isFacing = world.sub(center).dot(toCamera) > 0;
    if (isFacing !== facing) setFacing(isFacing);
  });

  return (
    <group ref={group} position={position}>
      <mesh>
        <sphereGeometry args={[active ? 0.09 : 0.065, 18, 18]} />
        <meshBasicMaterial color="#ff914d" />
      </mesh>
      <pointLight color="#ff7838" intensity={active ? 2.5 : 1.2} distance={0.8} />
      <Html
        center
        // Render labels into our own fixed layer (see .label-layer). Without this,
        // drei swaps containers after the first render and one label disappears.
        portal={labelLayer as React.MutableRefObject<HTMLElement>}
        distanceFactor={5.2}
        zIndexRange={[20, 0]}
        style={{
          opacity: facing ? 1 : 0,
          pointerEvents: facing ? "auto" : "none",
          transition: "opacity 0.3s",
        }}
      >
        <button 
          className={`marker ${active ? "active" : ""} ${item.labelSide === "left" ? "label-left" : ""} ${visited ? "visited" : ""}`}
          onClick={() => onSelect(item)}
          onFocus={() => onHover(item)}
          onBlur={() => onHover(null)}
          onMouseEnter={() => onHover(item)}
          onMouseLeave={() => onHover(null)}
          tabIndex={facing ? 0 : -1}
          aria-label={`Visit ${item.name}, landed ${item.year}`}
        >
          <span className="marker-pulse" />
          <span className="marker-label">
            {item.shortName}
            <small>{item.year}</small>
          </span>
        </button>
      </Html>
    </group>
  );
}

function SurfaceGlobe({
  world,
  selected,
  visited,
  labelLayer,
  onSelect,
  onHover,
}: {
  world: World;
  selected: Equipment | null;
  visited: string[];
  labelLayer: React.RefObject<HTMLDivElement | null>;
  onSelect: (equipment: Equipment) => void;
  onHover: (equipment: Equipment | null) => void;
}) {
  const defaultAstronaut = latLonPosition(12, world.focusLon - 12, 2.12);
  const astronautTarget = selected
    ? latLonPosition(selected.lat, selected.lon, 2.12)
    : defaultAstronaut;

  return (
    <Canvas camera={{ position: [0, 0.25, 6.1], fov: 42 }} dpr={[1, 1.75]} gl={{ antialias: true }}>
      <color attach="background" args={["#050709"]} />
      <fog attach="fog" args={["#050709", 8, 18]} />
      <ambientLight intensity={0.32} />
      <directionalLight position={[-4, 6, 5]} intensity={3.5} color="#fff2d8" castShadow />
      <pointLight position={[4, -2, 3]} intensity={0.8} color="#d35f32" />
      <Stars radius={60} depth={30} count={2200} factor={2.2} saturation={0} fade speed={0.2} />
      {/* Turn the globe so world.focusLon faces the camera (latLonPosition puts lon −90° in front) */}
      <group rotation={[0.05, THREE.MathUtils.degToRad(-90 - world.focusLon), 0.02]}>
        {/* Own Suspense so the markers below never wait on (or get unmounted by) the texture load */}
        <Suspense fallback={null}>
          <Planet world={world} position={[0, 0, 0]} scale={2} />
        </Suspense>
        {world.equipment.map((item) => (
          <GlobeMarker
            key={item.id}
            item={item}
            active={selected?.id === item.id}
            visited={visited.includes(item.id)}
            labelLayer={labelLayer}
            onSelect={onSelect}
            onHover={onHover}
          />
        ))}
        <Astronaut target={astronautTarget} />
      </group>
      <OrbitControls
        enablePan={false}
        minDistance={3.4}
        maxDistance={8}
        autoRotate={!selected}
        autoRotateSpeed={0.18}
        dampingFactor={0.06}
        enableDamping
      />
      <CameraJourney traveling={Boolean(selected)} />
    </Canvas>
  );
}

/* ------------------------------------------------------------------
   STORY CARD — uses NASA's <model-viewer> when a real model exists
------------------------------------------------------------------- */

/* Types text out letter by letter, like a radio transmission. Click it to show everything. */
function Typewriter({ text, speed = 14 }: { text: string; speed?: number }) {
  const chars = useMemo(() => Array.from(text), [text]);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setCount(chars.length);
      return;
    }
    // Work out how many letters to show from the time passed, so it never falls behind
    const start = performance.now();
    setCount(0);
    const timer = window.setInterval(() => {
      const shown = Math.min(chars.length, Math.floor((performance.now() - start) / speed));
      setCount(shown);
      if (shown >= chars.length) window.clearInterval(timer);
    }, 30);
    return () => window.clearInterval(timer);
  }, [chars, speed]);

  const done = count >= chars.length;
  return (
    <span className="typewriter" onClick={() => setCount(chars.length)}>
      {chars.slice(0, count).join("")}
      {!done && <span className="type-cursor">▍</span>}
      {/* invisible rest of the text keeps the box the same size while typing */}
      {!done && <span className="type-ghost">{chars.slice(count).join("")}</span>}
    </span>
  );
}

/* Clickable tabs inside the story card */
function StoryTabs({ tabs }: { tabs: { label: string; text: string }[] }) {
  const [active, setActive] = useState(0);
  return (
    <div className="story-tabs">
      <div className="tab-list" role="tablist">
        {tabs.map((tab, i) => (
          <button
            key={tab.label}
            role="tab"
            aria-selected={i === active}
            className={i === active ? "tab active" : "tab"}
            onClick={() => setActive(i)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <p className="tab-panel" role="tabpanel">
          <Typewriter key={active} text={tabs[active].text} />
      </p>
    </div>
  );
}

function StoryCard({ item, onBack }: { item: Equipment; onBack: () => void }) {
  return (
    <aside className="story-card">
      <div className="card-model" aria-hidden={!item.model}>
        {item.model ? (
          <model-viewer
            key={item.id}
            src={item.model}
            alt={`NASA 3D model of ${item.name}`}
            auto-rotate=""
            camera-controls=""
            rotation-per-second="24deg"
            interaction-prompt="none"
            shadow-intensity="1"
            exposure="1.1"
            style={{ width: "100%", height: "100%", background: "transparent" }}
          />
        ) : (
          <Canvas camera={{ position: [2.2, 1.5, 3.3], fov: 35 }}>
            <ambientLight intensity={0.65} />
            <directionalLight position={[2, 4, 3]} intensity={3} color="#ffe4c2" />
            <Float speed={1.1} rotationIntensity={0.25} floatIntensity={0.2}>
              <EquipmentModel type={item.type} scale={0.9} highlight />
            </Float>
                        {/* Spin slowly by itself, and let visitors drag to turn it (like the NASA models) */}
            <OrbitControls
              autoRotate
              autoRotateSpeed={4}
              enableZoom={false}
              enablePan={false}
              enableDamping
            />
          </Canvas>
        )}
      </div>
      <div className="card-content">
        <p className="card-eyebrow">
          <span>FOUND</span> {item.year}
          {item.model && <em className="model-badge">NASA 3D MODEL · DRAG TO ROTATE</em>}
        </p>
        <h2>{item.name}</h2>
        <p className="card-intro">{item.did}</p>
                {item.tabs ? (
          <StoryTabs key={item.id} tabs={item.tabs} />
        ) : (
          <dl>
            <div>
              <dt>LAST TRANSMISSION</dt>
              <dd>{item.ended}</dd>
            </div>
            <div>
              <dt>WHERE IT SLEEPS</dt>
              <dd>{item.now}</dd>
            </div>
          </dl>
        )}
        <button className="back-globe" onClick={onBack}>
          <ArrowLeft size={16} /> Back to globe
        </button>
      </div>
    </aside>
  );
}

function SurfacePage({
  world,
  soundEnabled,
  onSoundChange,
  selected,
  onSelected,
}: {
  world: World;
  soundEnabled: boolean;
  onSoundChange: (value: boolean) => void;
  selected: Equipment | null;
  onSelected: (item: Equipment | null) => void;
}) {
  const [hovered, setHovered] = useState<Equipment | null>(null);
  const [arrived, setArrived] = useState<Equipment | null>(null);
  const lastSpoken = useRef("");
  const labelLayer = useRef<HTMLDivElement>(null);

  /* ---------- Collect them all ---------- */
  // Which machines this visitor has opened. Saved in the browser, so it survives a refresh.
  const storageKey = `visited-${world.id}`;
  const [visited, setVisited] = useState<string[]>(() => {
    try {
      return JSON.parse(localStorage.getItem(storageKey) || "[]");
    } catch {
      return [];
    }
  });
  const total = world.equipment.length;
  const foundCount = world.equipment.filter((e) => visited.includes(e.id)).length;

  // When a story card opens, remember that machine
  useEffect(() => {
    if (!arrived || visited.includes(arrived.id)) return;
    const next = [...visited, arrived.id];
    setVisited(next);
    try {
      localStorage.setItem(storageKey, JSON.stringify(next));
    } catch {}
  }, [arrived]);

  useEffect(() => {
    if (!hovered) {
      lastSpoken.current = "";
      window.speechSynthesis?.cancel();
      return;
    }
    if (!soundEnabled || hovered.id === lastSpoken.current || !("speechSynthesis" in window))
      return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(hovered.voice);
    utterance.rate = 0.9;
    utterance.pitch = hovered.type === "helicopter" ? 1.18 : 0.94;
    window.speechSynthesis.speak(utterance);
    lastSpoken.current = hovered.id;
  }, [hovered, soundEnabled]);

  useEffect(() => {
    if (!soundEnabled) window.speechSynthesis?.cancel();
  }, [soundEnabled]);

  // Space sounds: a soft hum while sound is on…
  useEffect(() => {
    if (!soundEnabled) return;
    const stopHum = startHum();
    return stopHum;
  }, [soundEnabled]);

  // …and a radio "transmission" every time a story card opens
  useEffect(() => {
    if (soundEnabled && arrived) playTransmission();
  }, [arrived]);

  useEffect(() => {
    setArrived(null);
    if (!selected) return;
    const timer = window.setTimeout(() => setArrived(selected), 1350);
    return () => window.clearTimeout(timer);
  }, [selected]);

  return (
    <main className="surface-page">
      <div className="surface-heading">
        <p className="kicker">FIELD LOG · {world.id === "moon" ? "LUNA" : "ARES"}</p>
        <h1>
          Walk among the
          <br />
          <em>quiet machines.</em>
        </h1>
        <p>{world.description}</p>
      </div>
      <div className="surface-canvas">
        <Suspense fallback={<div className="loading">Preparing landing site…</div>}>
          <SurfaceGlobe
            world={world}
            selected={selected}
            visited={visited}
            labelLayer={labelLayer}
            onSelect={onSelected}
            onHover={setHovered}
          />
        </Suspense>
        <div ref={labelLayer} className="label-layer" />
      </div>
            {/* Collect them all: progress counter */}
      <div className="found-counter" aria-live="polite">
        <span>MACHINES FOUND</span>
        <strong>
          {foundCount} / {total}
        </strong>
        <div className="found-dots">
          {world.equipment.map((e) => (
            <i key={e.id} className={visited.includes(e.id) ? "on" : ""} />
          ))}
        </div>
      </div>
      <div className="explore-hint">
        <Rotate3D size={16} />
        <span>
          <strong>DRAG TO EXPLORE</strong> Scroll or pinch to zoom
        </span>
      </div>
      <div className="sound-dock">
        {!soundEnabled && <span>Click to enable sound</span>}
        <button
          onClick={() => onSoundChange(!soundEnabled)}
          aria-label={soundEnabled ? "Mute storytelling voices" : "Enable storytelling voices"}
        >
          {soundEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
        </button>
        <small>Voices are storytelling, not NASA’s words.</small>
      </div>
      {hovered && (
        <div className="caption" role="status">
          <Headphones size={15} /> <span>{hovered.voice}</span>
        </div>
      )}
      {arrived && <StoryCard item={arrived} onBack={() => onSelected(null)} />}
      <Visor />
    </main>
  );
}

/* ------------------------------------------------------------------
   SOURCES + NAVIGATION
------------------------------------------------------------------- */

function SourcesModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="modal-backdrop" onMouseDown={onClose}>
      <section
        className="sources-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="sources-title"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <button className="modal-close" onClick={onClose} aria-label="Close sources">
          <X size={19} />
        </button>
        <p className="kicker">MISSION ARCHIVE</p>
        <h2 id="sources-title">Sources & credits</h2>
        <p>
          Story facts and landing locations are based on NASA mission archives. The Moon and Mars
          globes are wrapped in surface maps, the equipment models with a “NASA 3D model” label come
          from NASA 3D Resources and are shown with Google’s model-viewer, and the remaining
          equipment is original stylized geometry.
        </p>
        <div className="source-list">
          {sources.map((source) => (
            <a key={source.url} href={source.url} target="_blank" rel="noreferrer">
              <span>{source.label}</span>
              <ExternalLink size={16} />
            </a>
          ))}
        </div>
        <p className="source-note">
          <Info size={15} /> Coordinates are approximate and intended for educational orientation on
          the interactive globe.
        </p>
      </section>
    </div>
  );
}

function Navigation({
  view,
  world,
  sound,
  onHome,
  onSwitch,
  onSound,
  onSources,
}: {
  view: View;
  world: WorldId;
  sound: boolean;
  onHome: () => void;
  onSwitch: () => void;
  onSound: () => void;
  onSources: () => void;
}) {
  const [open, setOpen] = useState(false);
  return (
    <header className="top-nav">
      <button className="brand" onClick={onHome} aria-label="Return home">
        <span className="brand-mark">
          <span />
        </span>
        <span>
          ABANDONED
          <br />
          <b>NOT FORGOTTEN</b>
        </span>
      </button>
      <button className="mobile-menu" onClick={() => setOpen(!open)} aria-label="Open navigation">
        {open ? <X /> : <Menu />}
      </button>
      <nav className={open ? "open" : ""}>
        <button
          onClick={() => {
            onHome();
            setOpen(false);
          }}
        >
          <Home size={15} /> Home
        </button>
        {view === "surface" && (
          <button
            onClick={() => {
              onSwitch();
              setOpen(false);
            }}
          >
            Switch to {world === "moon" ? "Mars" : "Moon"}
          </button>
        )}
        <button onClick={onSound}>
          {sound ? <Volume2 size={15} /> : <VolumeX size={15} />} Sound {sound ? "on" : "off"}
        </button>
        <button
          onClick={() => {
            onSources();
            setOpen(false);
          }}
        >
          Sources
        </button>
      </nav>
    </header>
  );
}

export default function App() {
  const [view, setView] = useState<View>("home");
  const [worldId, setWorldId] = useState<WorldId>("moon");
  const [sound, setSound] = useState(false);
  const [sourcesOpen, setSourcesOpen] = useState(false);
  const [selected, setSelected] = useState<Equipment | null>(null);

const chooseWorld = async (id: WorldId) => {
  if (sound) await playLaunchSound();

  setWorldId(id);
  setSelected(null);
  setView("launch");
};

  const goHome = () => {
    window.speechSynthesis?.cancel();
    setSelected(null);
    setView("home");
  };

  return (
    <div className="app-shell">
      <Navigation
        view={view}
        world={worldId}
        sound={sound}
        onHome={goHome}
        onSwitch={() => chooseWorld(worldId === "moon" ? "mars" : "moon")}
        onSound={() => setSound(!sound)}
        onSources={() => setSourcesOpen(true)}
      />
      {view === "home" && <DestinationPage onChoose={chooseWorld} />}
      {view === "launch" && (
        <LaunchSequence world={worlds[worldId]} onComplete={() => setView("surface")} />
      )}
      {view === "surface" && (
        <SurfacePage
          world={worlds[worldId]}
          soundEnabled={sound}
          onSoundChange={setSound}
          selected={selected}
          onSelected={setSelected}
        />
      )}
      {sourcesOpen && <SourcesModal onClose={() => setSourcesOpen(false)} />}
    </div>
  );
}
