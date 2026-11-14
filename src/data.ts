export type WorldId = "moon" | "mars";

export type Equipment = {
  id: string;
  name: string;
  shortName: string;
  year: string;
  lat: number;
  lon: number;
  type: "lander" | "rover" | "helicopter" | "experiment";
  did: string;
  ended: string;
  now: string;
  voice: string;
  /** Optional NASA 3D model (.glb in public/models/equipment). Shown with <model-viewer>. */
  model?: string;
  tabs?: { label: string; text: string; audio?: string }[];
  labelSide?: "left" | "right";
};

export type World = {
  id: WorldId;
  name: string;
  eyebrow: string;
  description: string;
  color: string;
  accent: string;
  /** Flat (equirectangular) surface map wrapped around the globe. */
  texture: string;
  /** Optional: a full 3D planet .glb. If set, it is used instead of the texture. */
  modelUrl?: string;
  /** Longitude that faces you when the globe first appears. */
  focusLon: number;
  equipment: Equipment[];
};

export const worlds: Record<WorldId, World> = {
  moon: {
    id: "moon",
    name: "The Moon",
    eyebrow: "384,400 km away",
    description: "A quiet archive of the first human journeys beyond Earth.",
    color: "#aaa9a2",
    accent: "#d8d3c6",
    texture: "/textures/moon.jpg",
    focusLon: 18, // the Apollo landing sites
    // modelUrl: "/models/moon-nasa.glb",
    equipment: [
      {
        id: "eagle",
        name: "Apollo 11 Lunar Module Descent Stage",
        shortName: "Eagle",
        year: "1969",
        lat: 0.674,
        lon: 23.473,
        type: "lander",
        did: "The spacecraft that carried the first humans to land on the Moon!",
        ended:
          "The descent stage was left behind on the Moon after the astronauts returned to lunar orbit.",
        now: "It remains at Tranquility Base, in the Sea of Tranquility, where humans first walked on the Moon.",
        voice:
          "I'm Eagle! I carried the first humans to the Moon. My lower half stayed behind, but my upper half took the astronauts home!",
        model: "/models/equipment/apollo-lunar-module.glb",
        
        tabs: [
          {
            label: "📖 About",
            text: `Meet Eagle!

Picture this: you are 384,400 kilometres from home. Outside your window is a world covered in grey dust. There are no roads, no buildings and no rescue team waiting nearby. You have one spacecraft to get down safely — and one chance to get back.

That spacecraft was Eagle.

Eagle was the Lunar Module of NASA's Apollo 11 mission. It carried Neil Armstrong and Buzz Aldrin from the Command/Service Module down to the Moon. It had two sections: a lower stage with four landing legs, and an upper stage where the astronauts lived and worked.

Every part had a job. Every kilogram mattered. And soon, Eagle would carry two people into history.`,
            audio : "/audio/eagle/about.mp3",
          },
          {
            label: "🔧 Function",
            text: `Eagle was not simply a taxi to the Moon. It was a tiny spacecraft, a temporary home and a launch vehicle — all in one.

Its jobs were to:
- Carry Armstrong and Aldrin from lunar orbit down to the surface.
- Give the astronauts a place to live, work and prepare for their moonwalk.
- Store tools and equipment for exploring the Moon.
- Help the astronauts communicate with Earth and the Command/Service Module.
- Launch the astronauts from the Moon back into lunar orbit.

Think about that: Eagle had to land on another world and then take off again. It had to do both jobs with no runway, no repair shop and no second try.`,
            audio: "/audio/eagle/functions.mp3",
          },
          {
            label: "🚀 Launch",
            text: `The countdown reached zero on 16 July 1969.

Eagle began its journey tucked inside Apollo 11, which thundered away from Cape Canaveral aboard the enormous Saturn V rocket. After several days travelling through space, the spacecraft reached the Moon.

Then came the moment everyone had been waiting for. On 20 July, Eagle separated from the Command/Service Module. Michael Collins stayed behind in orbit while Armstrong and Aldrin began their descent.

The landing site was the Sea of Tranquility. The descent was tense, but Eagle touched down safely.

For the first time, humans had landed on the Moon. The world was watching — and Eagle had brought them there.`,
             audio: "/audio/eagle/launch.mp3",
          },
          {
            label: "🛰️ Mission",
            text: `Landing was only the beginning! Eagle still had an important mission to complete.

1. Travel to the Moon with Apollo 11.
2. Separate from the main spacecraft, leaving Michael Collins in orbit.
3. Carry Armstrong and Aldrin safely down to the Moon.
4. Land in the Sea of Tranquility.
5. Give the astronauts a place to explore, collect rocks and set up experiments.
6. Blast off from the Moon and reunite with Collins.

The astronauts returned to Earth with 21.55 kg of Moon rocks and soil, giving scientists valuable clues about the Moon's history.

Eagle's mission was complete. It had carried humans to the Moon and brought a piece of it back home!`,
             audio: "/audio/eagle/mission.mp3",
          },
          {
            label: "🕰️ Abandoned",
            text: `A spacecraft can make history and still leave something behind.

After 21 hours and 36 minutes on the lunar surface, Armstrong and Aldrin were ready to go. On 21 July 1969, Eagle's upper stage fired its engine and lifted the astronauts back into lunar orbit.

But the lower stage did not come with them. Its four landing legs and landing equipment stayed at Tranquility Base. That was exactly what it had been designed to do: land, support the astronauts and become a launch platform.

The upper stage later separated from the Command/Service Module. Its final location is uncertain, and scientists believe it eventually crashed onto the Moon.

So Eagle's story has two endings: one part remains where humans first walked on the Moon, while the other disappeared from view.`,
             audio: "/audio/eagle/abandoned.mp3",
          },
          {
            label: "❓ Why?",
            text: `Why build Eagle in two pieces instead of one spacecraft that could do everything?

Because getting to the Moon was not just about having enough power. It was also about carrying as little unnecessary weight as possible.

The lower stage did the heavy work:
- Four landing legs supported Eagle on the lunar surface.
- Its engine and fuel slowed the spacecraft for landing.
- It became the platform from which the upper stage launched.

The upper stage brought the astronauts home:
- It held the crew during their time on the Moon.
- It had its own engine to lift off from the lunar surface.
- It carried what was needed to return to lunar orbit.

Once the upper stage lifted off, there was no reason to carry the heavy landing stage with it. Leaving it behind saved weight and fuel.

It was a clever solution to an extraordinary challenge. Eagle did not need to bring every part home to complete its mission — it only needed to bring the astronauts home.`,
             audio: "/audio/eagle/why.mp3",
          }
        ],
      },
      {
        id: "apollo-15",
        name: "Apollo 15 Lunar Roving Vehicle",
        shortName: "LRV",
        year: "1971",
        lat: 26.132,
        lon: 3.634,
        type: "rover",
        did: "Became the first vehicle driven by astronauts on the Moon and helped them explore 27.9 km of the Hadley–Apennine region.",
        ended: "Its final drive took place during Apollo 15's third moonwalk on 2 August 1971. The astronauts left it on the Moon before returning to orbit.",
        now: "It remains parked near the Apollo 15 landing site in the Hadley–Apennine region.",
        voice:
          "Hi, I’m the Apollo 15 lunar rover! In 1971, I helped astronauts explore the Moon by driving almost 28 km across its rocky surface.",
        model: "/models/equipment/lrv.glb",
        tabs: [
          {
            label: "📖 About",
            text: `Meet the Lunar Roving Vehicle — the Moon's first set of wheels!

Before 1971, astronauts had to explore the Moon on foot. Their spacesuits were bulky, their steps were slow, and every extra metre took effort. What if they could travel farther?

NASA's answer was the Lunar Roving Vehicle, or LRV: a small electric rover that travelled to the Moon with Apollo 15.

Astronauts David Scott and James Irwin became its first drivers. Suddenly, the lunar landscape was no longer limited to the distance they could walk.`,
             audio: "/audio/lrv/about.mp3",
          },
          {
            label: "🔧 Function",
            text: `Think of the LRV as an electric car built for one of the strangest roads imaginable.

It helped the astronauts:
- Travel across the lunar surface instead of walking everywhere.
- Reach rocks and locations farther from the landing site.
- Carry tools and collected samples.
- Photograph and investigate the landscape during their moonwalks.

The rover allowed the crew to explore areas they could not have covered as easily on foot. It turned a moonwalk into a much bigger field expedition.`,
            audio: "/audio/lrv/functions.mp3",
          },
          {
            label: "🚀 Launch",
            text: `The rover's journey began before it ever touched the Moon.

Apollo 15 launched from Cape Canaveral, Florida, on 26 July 1971 aboard a Saturn V rocket. The LRV travelled folded up inside the lunar module, named Falcon.

Falcon landed on 30 July. The astronauts then unfolded and prepared the rover. On 31 July, during their first moonwalk, Scott and Irwin climbed aboard and drove across the lunar surface.

The Moon had its first drivers.`,
            audio: "/audio/lrv/launch.mp3",
          },
          {
            label: "🛰️ Mission",
            text: `The LRV had three big exploration trips ahead of it.

1. Apollo 15 landed near the Apennine Mountains on 30 July 1971.
2. On 31 July, David Scott and James Irwin unloaded the rover during their first moonwalk.
3. They drove it on three trips to explore the landing area and nearby geological features.
4. They collected 77.31 kilograms of Moon rocks and soil.
5. Across the three trips, the rover travelled about 27.9 kilometres.

Together, the three moonwalks lasted 18 hours and 35 minutes.

The rover helped the astronauts bring home more than samples. It helped them reach places that could reveal more about the Moon's history.`,
            audio: "/audio/lrv/mission.mp3",
          },
          {
            label: "🕰️ Abandoned",
            text: `Every journey eventually reaches its final stop.

After the astronauts completed their third and final moonwalk, the LRV was left on the Moon on 2 August 1971. Scott and Irwin returned to Falcon, spent a total of 66 hours and 55 minutes on the lunar surface, and then lifted off to meet their spacecraft in orbit.

The rover stayed near the Apollo 15 landing site in the Hadley–Apennine region.

It was not broken or forgotten. It had simply reached the end of the job it was built to do.`,
            audio: "/audio/lrv/abondoned.mp3",
          },
          {
            label: "❓ Why?",
            text: `Why leave a perfectly useful rover behind?

Because the LRV was designed as a surface explorer, not as a spacecraft that could fly back to Earth.

The astronauts used Falcon's upper stage to return to lunar orbit. The rover had no system for launching itself from the Moon or travelling through space.

Taking it home would also have meant carrying extra weight and using resources that the crew needed for their return.

So the LRV stayed behind — a little electric vehicle parked on another world, after helping astronauts explore much more of it than they could have reached on foot.`,
            audio: "/audio/lrv/why.mp3",
          }
        ],
      },
      {
        id: "alsep",
        name: "Apollo Lunar Surface Experiments Package",
        shortName: "ALSEP",
        year: "1969",
        lat: -8.0098,
        lon: -30.4249,
        type: "experiment",
        did: "Carried scientific instruments that studied moonquakes, the lunar environment, and the Moon's interior after the astronauts departed.",
        ended: "NASA switched off the Apollo lunar surface experiments on September 30, 1977, ending their scientific operations.",
        now: "The scientific instruments remain at their Apollo landing sites as historical equipment on the Moon.",
        voice:
          "I'm ALSEP. The astronauts left me behind so I could continue studying the Moon after they returned to Earth.",
        tabs: [
          {
            label: "📖 About",
            text: `I wasn't a spaceship, and I wasn't meant to come home. I was a small science station that Apollo 12 astronauts left on the Moon.

Once they returned to Earth, I kept working alone. I was the first full ALSEP station deployed on the lunar surface.`,
            audio: "/audio/alsep/about.mp3",
          },
          {
            label: "🔧 Function",
            text: `The Moon looks quiet, but I was there to detect what people could not easily see.

My instruments measured moonquakes, studied the Moon's magnetic field, and examined particles from the Sun. I sent my readings back to Earth by radio.`,
            audio: "/audio/alsep/functions.mp3",
          },
          {
            label: "🚀 Launch",
            text: `I travelled to the Moon with Apollo 12, which launched on 14 November 1969.

After landing, astronauts Pete Conrad and Alan Bean carried my instruments away from their lunar module and set them up about 600 to 700 feet away.`,
            audio: "/audio/alsep/launch.mp3",
          },
          {
            label: "🛰️ Mission",
            text: `The astronauts unpacked my instruments and arranged them around a central station.

Then Mission Control switched me on. I began sending measurements to Earth, where scientists could study the Moon without being there in person.

I even detected vibrations from the astronauts moving around and their lunar module lifting off.`,
            audio: "/audio/alsep/mission.mp3",
          },
          {
            label: "🕰️ Abandoned",
            text: `The astronauts went home, but my work continued. I kept sending information from the Moon for years.

On 30 September 1977, NASA sent the command to switch off the ALSEP stations. My long watch was over.`,
            audio: "/audio/alsep/abandoned.mp3",
          },
          {
            label: "❓ Why?",
            text: `A person could only explore the Moon for a short time. I could stay behind and keep measuring what happened long after the astronauts left.

That gave scientists a much longer record of the Moon than one visit could provide.`,
            audio: "/audio/alsep/why.mp3",
          },
        ],
      },
            {
        id: "surveyor-3",
        name: "Surveyor 3",
        shortName: "Surveyor 3",
        year: "1967",
        lat: -3.0,
        lon: -23.41,
        type: "lander",
        did: "A robot scout sent to check the Moon was safe for astronauts to land on.",
        ended: "It went silent on 4 May 1967, when the freezing lunar night arrived.",
        now: "Still standing in the Ocean of Storms, 180 m from the Apollo 12 landing site.",
        voice:
          "I’m Surveyor 3. I bounced twice when I landed, and two years later, astronauts came to visit me!",
        tabs: [
          {
            label: "📖 About",
            text: `Before people could safely land on the Moon, NASA had a question to answer: what was the ground really like?

Some scientists worried that the lunar surface might be covered in deep, soft dust. Could a spacecraft sink into it? Would its landing legs hold?

NASA sent robotic scouts called Surveyors to investigate before astronauts made the journey.

Surveyor 3 was one of those scouts. About three metres tall, standing on three legs and carrying a camera and a small scoop, it was sent to look closely at the Moon — before humans arrived.`,
            audio: "/audio/surveyor/about.mp3",
          },
          {
            label: "🔧 Function",
            text: `Surveyor 3 was a robot scout with a scientist's job.

It was built to:
- Photograph the lunar surface in close detail.
- Test how the ground behaved when the spacecraft touched down.
- Dig small trenches with its mechanical scoop.
- Send its observations to Earth so NASA could choose safer Apollo landing sites.

Instead of simply looking at the Moon from far away, Surveyor 3 could examine the ground right where it landed. Its work helped turn guesses about the lunar surface into real evidence.`,
            audio: "/audio/surveyor/functions.mp3",
          },
          {
            label: "🚀 Launch",
            text: `On 17 April 1967, Surveyor 3 left Earth on an Atlas-Centaur rocket.

Three days later, on 20 April, it reached the Moon and began its landing attempt. It was one of seven Surveyor spacecraft launched between 1966 and 1968. Five landed successfully; two did not.

Surveyor 3 had made it to the Moon. But its landing was about to become more dramatic than planned.`,
            audio: "/audio/surveyor/launch.mp3",
          },
          {
            label: "🛰️ Mission",
            text: `Surveyor 3's landing did not go exactly as expected.

1. It launched from Florida aboard an Atlas-Centaur rocket.
2. It travelled through space for about three days.
3. Its retrorockets fired to slow it down as it approached the Moon.
4. It touched the surface on three padded landing legs.
5. It began photographing the ground, digging small trenches and sending its findings to Earth.

There was a surprise during touchdown: shiny rocks confused its radar, and its engine did not shut off at the right moment. Surveyor 3 bounced twice before finally settling on the surface.

A rough landing — but a successful one. The little scout was ready to get to work.`,
            audio: "/audio/surveyor/mission.mp3",
          },
          {
            label: "🕰️ Abandoned",
            text: `Surveyor 3 sent its final message on 4 May 1967, just two weeks after landing. The lunar night brought its operations to an end, but its story was not over.

In November 1969, the Apollo 12 astronauts landed only about 180 metres away. They walked over to inspect the spacecraft and brought its camera and scoop back to Earth.

Think about that: a robot sent ahead to prepare for human exploration was later visited by the very explorers it had helped.

Surveyor 3 is still in the Ocean of Storms, making it a silent reminder of the missions that came before Apollo 12.`,
            audio: "/audio/surveyor/abandoned.mp3",
          },
          {
            label: "❓ Why?",
            text: `Why did Surveyor 3 stop working — and why was it left behind?

A lunar night lasts about two weeks. Without sunlight, temperatures can fall below minus 150 degrees Celsius. Surveyor 3 relied on solar power, and the long, freezing darkness was too much for its electronics.

It was also designed as a one-way scout. It had no rocket or spacecraft to carry it back to Earth.

But its mission was a success. Surveyor 3 helped show that the lunar surface could support a spacecraft, giving NASA valuable information before astronauts attempted their own landings.

Sometimes the bravest explorer is the one that goes first.`,
            audio: "/audio/surveyor/why.mp3",
          }
        ],
      },
    ],
  },
  mars: {
    id: "mars",
    name: "Mars",
    eyebrow: "225 million km away",
    description: "A rust-red world where patient machines became explorers.",
    color: "#b45232",
    accent: "#ef8a51",
    texture: "/textures/mars.jpg",
    focusLon: -20, // Viking, Sojourner and Opportunity
    // modelUrl: "/models/mars-nasa.glb",
    equipment: [
            {
        id: "sojourner",
        name: "Sojourner Rover",
        shortName: "Sojourner",
        year: "1997",
        lat: 19.13,
        lon: -33.22,
        type: "rover",
        did: "Became the first wheeled vehicle to operate on another planet.",
        ended: "Contact ended when the Pathfinder lander’s battery failed after 83 sols.",
        now: "It rests in Ares Vallis, likely near the Pathfinder lander.",
        voice:
          "I’m Sojourner. In 1997, I became the first little rover to roll across another planet.",
        model: "/models/equipment/mars-sojourner-rover-model.glb",
        tabs: [
          {
            label: "📖 About",
            text: `Meet Sojourner, the little rover that made a giant first step.

In 1997, NASA sent a small robot to Mars with a big job: drive across the surface of another planet for the very first time.

Sojourner was only 30 centimetres tall and weighed 10.6 kilograms. It may have looked tiny beside the red Martian landscape, but it carried cameras and scientific instruments that could examine rocks and soil up close.

It was named after Sojourner Truth, an American civil-rights activist. Its name suited a machine made to travel into the unknown.`,
            audio: "/audio/sojourner/about.mp3",
          },
          {
            label: "🔧 Function",
            text: `Sojourner was small, but it had plenty to do.

It:
- Drove around the Mars Pathfinder landing site.
- Examined the composition of nearby rocks and soil.
- Took close-up photographs of the Martian surface.
- Sent its pictures and scientific results to the Pathfinder lander.
- Relied on the lander to relay its information across space to Earth.

Sojourner was not just exploring for the sake of exploring. Every rock it examined helped scientists learn more about what Mars was made of.`,
            audio: "/audio/sojourner/functions.mp3",
          },
          {
            label: "🚀 Launch",
            text: `Sojourner began its journey to Mars inside the Pathfinder spacecraft, which launched on 4 December 1996.

After months travelling through space, Pathfinder reached Mars and landed in Ares Vallis on 4 July 1997.

But the rover did not simply drive straight out of the spacecraft. First, Pathfinder had to land safely. Then Sojourner could begin its own adventure on the surface.`,
            audio: "/audio/sojourner/launch.mp3",
          },
          {
            label: "🛰️ Mission",
            text: `Sojourner's first steps on Mars were unlike any drive on Earth.

1. It travelled to Mars inside the Pathfinder spacecraft.
2. Pathfinder entered the atmosphere and landed inside giant airbags that bounced across the surface.
3. Once the lander was stable, Sojourner rolled down a ramp.
4. It explored nearby rocks and soil, taking pictures and making measurements.
5. It sent its findings to Pathfinder, which passed the information on to Earth.

A small rover had become the first wheeled vehicle to operate on another planet. Every movement was a new achievement.`,
            audio: "/audio/sojourner/mission.mp3",
          },
          {
            label: "🕰️ Abandoned",
            text: `Sojourner's mission ended when communication with Pathfinder stopped. The final data from the mission arrived on 27 September 1997.

The rover remains on Mars, likely near the Pathfinder lander in Ares Vallis.

It may have been small and its mission may have been short, but Sojourner proved something important: a robot could drive across another planet, investigate its surface and send discoveries all the way home.`,
            audio: "/audio/sojourner/abandoned.mp3",
          },
          {
            label: "❓ Why?",
            text: `Why send such a tiny rover all the way to Mars?

NASA needed to test whether a small, mobile robot could explore another planet. Sojourner helped engineers learn how to drive a rover remotely and how to study rocks and soil from a distance.

Its measurements gave scientists a closer look at the Martian surface, while its successful journey helped pave the way for much larger rovers.

Sojourner was never designed to return to Earth. Its job was to explore — and to show that future rovers could go even farther.

For a robot only 30 centimetres tall, that was a huge achievement.`,
            audio: "/audio/sojourner/why.mp3",
          }
        ],
      },
      {
        id: "spirit",
        name: "Spirit Rover",
        shortName: "Spirit",
        year: "2004",
        lat: -14.568,
        lon: 175.472,
        type: "rover",
        did: "A robot geologist sent to explore Mars and search for clues that water once existed there.",
        ended: "Spirit's mission came to an end in 2010, after exploring Mars for more than six years.",
        now: "Still on Mars at Gusev Crater, where it landed in January 2004.",
        voice: "I’m Spirit. I was built for 90 days, but I explored Mars for more than six years.",
        // Spirit and Opportunity were identical twins, so they share NASA's MER model
        model: "/models/equipment/opportunity.glb",
      tabs: [
          {
            label: "📖 About",
            text: `Meet Spirit, the rover that refused to give up.

What if Mars was once a world of rivers and lakes instead of the cold, dusty planet we see today? NASA wanted evidence, so it sent two robotic geologists to investigate.

Spirit was one of them. It landed inside Gusev Crater, a huge impact crater that scientists thought might once have held a lake.

Spirit could not dig up the planet's entire history, but it could examine rocks, study soil and search for clues left behind by ancient water.`,
            audio: "/audio/spirit/about.mp3",
          },
          {
            label: "🔧 Function",
            text: `Spirit was a rolling science laboratory.

It:
- Took panoramic photographs of the Martian landscape.
- Examined rocks and soil to learn what they were made of.
- Used scientific instruments to investigate minerals.
- Reached out with a robotic arm to study interesting rocks up close.
- Explored the surface in search of evidence that water had once existed there.

Every rock was a clue. Spirit's job was to help scientists read the story written across the Martian landscape.`,
            audio: "/audio/spirit/functions.mp3",
          },
          {
            label: "🚀 Launch",
            text: `Spirit arrived on Mars on 3 January 2004 and landed inside Gusev Crater.

Scientists had chosen the crater because its shape suggested it might once have contained a lake. If water had been there, the rocks could hold evidence of Mars's past.

Spirit was one of two identical Mars Exploration Rovers sent to different locations. Its twin, Opportunity, landed a few weeks later on the other side of the planet.

Two robots. Two locations. One enormous question: was Mars once wet enough to support life?`,
            audio: "/audio/spirit/launch.mp3",
          },
          {
            label: "🛰️ Mission",
            text: `Spirit's mission was to investigate Mars and search for signs that liquid water had once existed there.

1. Travel through space to the Red Planet.
2. Land safely inside Gusev Crater.
3. Photograph the landscape to help scientists understand the terrain.
4. Drive across the surface to investigate rocks and soil.
5. Use its scientific tools to examine minerals and other clues.
6. Send photographs and discoveries back to Earth.

Spirit travelled about 7.7 kilometres across Mars and helped scientists find evidence that water had played a role in the planet's past.

The rover was not looking for little green aliens. It was looking for something just as important: proof that Mars had once been a very different world.`,
            audio: "/audio/spirit/mission.mp3",
          },
          {
            label: "🕰️ Abandoned",
            text: `Spirit was designed to work for just 90 Martian days. Instead, it kept exploring for more than six years.

Over time, it travelled across the surface, investigated rocks and sent discoveries back to Earth. But in 2010, it became stuck and could no longer move into a position that allowed it to keep operating through the Martian winter.

Its mission came to an end, but its discoveries did not disappear with its final signal. Scientists continued studying the information it had collected.

Spirit had outlasted its original plan by years — and helped rewrite the story of Mars.`,
            audio: "/audio/spirit/abandoned.mp3",
          },
          {
            label: "❓Why?",
            text: `Why did NASA send Spirit to Gusev Crater?

Scientists wanted to find out whether Mars had once been warm and wet enough for liquid water to exist. Gusev Crater looked like it might have been an ancient lake, making it an exciting place to investigate.

By studying rocks and soil, Spirit found evidence that water had affected the Martian surface long ago.

Spirit was never meant to return to Earth. It was built to explore, investigate and send its findings across millions of kilometres of space.

Its greatest achievement was not simply how far it travelled. It was what it helped us discover about Mars's watery past.`,
            audio: "/audio/spirit/why.mp3",
          }
        ],
},
{
  id: "opportunity",
  name: "Opportunity",
  shortName: "Opportunity",
  year: "2004",
  lat: -1.9462,
  lon: 354.4734,
  type: "rover",
  did: "A robot geologist sent to explore Mars and find evidence that water once flowed across its surface.",
  ended: "Opportunity sent its last communication to Earth on 10 June 2018, during a huge planet-wide dust storm.",
  now: "Still on Mars at Meridiani Planum, where it landed in January 2004.",
  voice:
    "I'm Opportunity! I was built to explore for 90 days, but I kept rolling for almost 15 years and travelled over 45 kilometres!",
  model: "/models/equipment/opportunity.glb",
  tabs: [
          {
            label: "📖 About",
            text: `Meet Opportunity, the rover that turned a 90-day job into a nearly 15-year adventure.

NASA built Opportunity to explore Mars for just 90 Martian days. But the little rover kept going — through rocky terrain, dusty skies and years of discoveries.

It was one of two twin Mars Exploration Rovers. Its mission was to examine rocks and soil for clues that liquid water had once existed on the Red Planet.

Opportunity landed at Meridiani Planum, where minerals called hematite offered an exciting hint: this region might have had a watery past.`,
            audio: "/audio/opportunity/about.mp3",
          },
          {
            label: "🔧 Function",
            text: `Opportunity was a robot geologist with a camera for eyes and a laboratory of tools.

It:
- Photographed the Martian landscape.
- Examined rocks and soil for clues about ancient water.
- Studied minerals to understand the planet's history.
- Used a robotic arm to investigate rocks up close.
- Travelled across Mars to explore new locations.

The rover turned distant questions into close-up investigations. Instead of wondering what a rock might contain, scientists could ask Opportunity to examine it.`,
            audio: "/audio/opportunity/functions.mp3",
          },
          {
            label: "🚀 Launch",
            text: `Opportunity landed on Mars on 24 January 2004 (Pacific time).

Its home was Meridiani Planum, a flat region containing deposits of a mineral called hematite. Why did that matter? Hematite can form in environments where water is present, so the mineral made this a promising place to search for evidence of ancient water.

Opportunity was the twin of Spirit, but the two rovers explored different parts of Mars. Each would follow its own trail of clues.`,
            audio: "/audio/opportunity/launch.mp3",
          },
          {
            label: "🛰️ Mission",
            text: `Opportunity's mission was to search for evidence that liquid water had once existed on Mars.

1. Travel through space to the Red Planet.
2. Land at Meridiani Planum.
3. Photograph rocks and the surrounding landscape.
4. Drive across the surface to investigate interesting locations.
5. Examine rocks and minerals using its scientific instruments.
6. Send its discoveries back to Earth.

Opportunity travelled an incredible 45.16 kilometres — far beyond its original plan.

Along the way, it found evidence that water had once been present on Mars. The dry, dusty landscape had a much wetter story hidden in its rocks.`,
            audio: "/audio/opportunity/mission.mp3",
          },
          {
            label: "🕰️ Abandoned",
            text: `For nearly 15 years, Opportunity kept sending messages from Mars.

Then, in 2018, a huge dust storm spread across the planet. Dust filled the sky and blocked sunlight from reaching the rover's solar panels.

Opportunity sent its last communication to Earth on 10 June 2018. NASA tried to make contact again, but no more messages came.

After almost 15 years of exploration, the mission was declared over. Opportunity remained at Meridiani Planum, where its long journey had finally stopped.

It had been designed for 90 days. It gave scientists nearly 15 years of discoveries.`,
            audio: "/audio/opportunity/abandoned.mp3",
          },
          {
            label: "❓ Why?",
            text: `Why did Opportunity stop working?

A massive dust storm darkened the Martian sky and covered the area where the rover was exploring. Because Opportunity relied on solar panels, it needed sunlight to generate electricity. With too little sunlight, it could not keep its systems running or communicate with Earth.

But why was it there in the first place?

Scientists wanted to know whether Mars had once had liquid water. Opportunity found evidence that ancient Mars had a wetter environment than the one we see today.

It was meant to last 90 days. It travelled more than 45 kilometres and explored for almost 15 years.

Sometimes a mission's greatest success is not doing what was planned — it is discovering how much more is possible.`,
            audio: "/audio/opportunity/why.mp3",
          }
        ],
},
      
{
  id: "viking-1",
  name: "Viking 1 Lander",
  shortName: "Viking 1",
  year: "1976",
  lat: 22.483,
  lon: -47.94,
  type: "lander",
  did: "Made the first truly successful NASA landing on Mars and sent back the first images from its surface.",
  ended:
    "Stopped communicating with Earth on November 11, 1982, after a faulty command interrupted contact.",
  now:
    "It remains at Chryse Planitia, at a landing site later named Thomas Mutch Memorial Station.",
  voice:
    "Hi, I'm Viking 1! I landed on Mars in 1976 and sent Earth its first pictures from the Martian surface. I even searched the red soil for signs of life!",
  model: "/models/equipment/viking-lander.glb",
  tabs: [
          {
            label: "📖 About",
            text: `Meet Viking 1, the spacecraft that gave Earth its first close-up view from the surface of Mars.

Before Viking 1 arrived, people had seen Mars through telescopes and spacecraft flying past or orbiting above it. But no NASA lander had yet completed a successful landing and sent back pictures from the ground.

Viking 1 changed that on 20 July 1976.

It was part of a mission with two partners: an orbiter that studied Mars from space, and a lander that became a robot scientist on the surface. Together, they opened a new chapter in exploring the Red Planet.`,
            audio: "/audio/viking/about.mp3",
          },
          {
            label: "🔧 Function",
            text: `Viking 1 was like a tiny laboratory with a view of an entire planet.

It:
- Took colour photographs of the Martian landscape.
- Used a robotic arm to scoop up samples of soil.
- Tested the soil in a biological laboratory for possible signs of life.
- Measured weather conditions, including temperature, air pressure and wind speed.
- Sent photographs and scientific information back to Earth.

Its orbiter partner had a different job: photograph Mars from above and help scientists study the planet and choose a landing area.`,
            audio: "/audio/viking/function.mp3",
          },
          {
            label: "🚀 Launch",
            text: `Viking 1 began its journey on 20 August 1975, launching from Cape Canaveral, Florida, aboard a Titan IIIE-Centaur rocket.

After almost 11 months in space, it reached Mars orbit on 19 June 1976. The orbiter photographed the surface, helping scientists choose a safer place for the lander.

On 20 July 1976, Viking 1 separated and touched down at Chryse Planitia.

A new kind of exploration had begun: a NASA spacecraft was safely on the Martian ground, ready to investigate the planet up close.`,
            audio: "/audio/viking/launch.mp3",
          },
          {
            label: "🛰️ Mission",
            text: `Viking 1 had a carefully planned mission.

1. Launch from Earth on 20 August 1975.
2. Reach Mars and enter orbit on 19 June 1976.
3. Use the orbiter's photographs to help select a landing area.
4. Separate from the orbiter and land safely on 20 July 1976.
5. Take photographs from the Martian surface.
6. Use its robotic arm to collect soil samples.
7. Test the soil in its onboard laboratory.
8. Send weather reports, photographs and scientific data back to Earth.

One of its biggest questions was also one of science's biggest mysteries: could anything be living in the soil of Mars?`,
            audio: "/audio/viking/mission.mp3",
          },
          {
            label: "🕰️ Abandoned",
            text: `Viking 1 did not stop working after its historic landing. It continued sending photographs, scientific results and weather reports to Earth for years.

Its orbiter partner was shut down on 7 August 1980 after running out of attitude-control propellant.

The lander continued much longer, but on 11 November 1982 it stopped communicating after receiving a faulty command from Earth. NASA tried to contact it again, but the messages never reached it.

Viking 1 remains at Chryse Planitia, at a site later named Thomas Mutch Memorial Station. Its work may have ended, but its place in Mars exploration is secure.`,
            audio: "/audio/viking/abandoned.mp3",
          },
          {
            label: "❓ Why?",
            text: `Why was Viking 1 such an important mission?

NASA wanted to study the Martian surface and investigate whether the planet might have supported life. Scientists also wanted to understand whether Mars had once been warmer and wetter.

The orbiter mapped and photographed the planet from above. The lander examined the soil, weather and surroundings from the ground.

Viking 1's experiments produced fascinating results, but they did not provide confirmed evidence of life.

Even without that answer, the mission changed what scientists could learn about Mars. It showed that a spacecraft could land, work as a laboratory and send detailed information home from the surface of another planet.`,
            audio: "/audio/viking/why.mp3",
          }
        ],
},

      {
        id: "ingenuity",
        name: "Ingenuity Mars Helicopter",
        shortName: "Ingenuity",
        year: "2021",
        lat: 18.444,
        lon: 77.451,
        type: "helicopter",
        did: "Made the first powered flight on another world and completed 72 flights.",
        ended:
          "Rotor-blade damage during its final landing ended flight operations in January 2024.",
        now: "It stands in Jezero Crater at its final airfield, named Valinor Hills.",
        voice: "I’m Ingenuity. I proved that a tiny helicopter could fly in the thin air of Mars.",
        model: "/models/equipment/ingenuity.glb",
                tabs: [
          {
            label: "📖 About",
            text: `Meet Ingenuity, the little helicopter that learned to fly on another world.

Imagine trying to fly a helicopter on Mars. The air is so thin that it would be like trying to fly on Earth at an altitude of around 30 kilometres. A normal helicopter could not do it.

NASA decided to try anyway.

Ingenuity weighed just 1.8 kilograms on Earth — about as much as a large bottle of water. It travelled to Mars attached to the Perseverance rover, carrying a bold question: could powered flight work on another planet?`,
            audio: "/audio/ingenuity/about.mp3",
          },
          {
            label: "🔧 Function",
            text: `Ingenuity was not built to carry astronauts or heavy science equipment. Its most important job was to prove that flight was possible in the thin Martian atmosphere.

It was designed to:
- Test whether a helicopter could fly on Mars.
- Take photographs from above the surface.
- Scout areas ahead and help the Perseverance team plan routes.
- Demonstrate technology that could help future aerial explorers.

It even carried a tiny piece of fabric from the Wright brothers' first airplane — a link between the first powered flight on Earth and the first powered flight on another world.`,
            audio: "/audio/ingenuity/functions.mp3",
          },
          {
            label: "🚀 Launch",
            text: `Ingenuity launched from Earth on 30 July 2020, tucked underneath the Perseverance rover.

The two travelled together for months before landing in Jezero Crater on 18 February 2021.

Once Perseverance had found a suitable place, it lowered Ingenuity onto the ground and drove away. The helicopter unfolded, charged its batteries using sunlight and prepared for a flight no aircraft had ever made before.

The test was simple to describe and incredibly difficult to achieve: rise into the Martian sky, stay in control, and land safely.`,
            audio: "/audio/ingenuity/launch.mp3",
          },
          {
            label: "🛰️ Mission",
            text: `Ingenuity's first flight was planned as a technology test, not a long exploration mission.

1. Travel to Mars attached beneath Perseverance.
2. Be placed on the ground and charge using its solar panel.
3. Make the first powered flight on another planet on 19 April 2021.
4. Continue testing its flying ability and taking aerial images.
5. Help scout the terrain for Perseverance as the mission continued.

NASA originally planned just five test flights. Ingenuity completed 72.

Across its flights, it travelled about 17 kilometres and reached a maximum height of 24 metres.

A small helicopter had turned a short technology demonstration into an extraordinary flying career.`,
            audio: "/audio/ingenuity/mission.mp3",
          },
          {
            label: "🕰️ Abandoned",
            text: `Every flight needs a landing — and Ingenuity's final one brought its adventure to a close.

Its last flight took place on 18 January 2024. During the landing, its rotor blades were damaged, making further flights impossible.

NASA announced the end of flight operations on 25 January 2024. The team named the helicopter's final resting place Valinor Hills.

Ingenuity remains in Jezero Crater, where it made history. It can no longer fly, but its achievement will help shape how future missions explore other worlds.`,
            audio: "/audio/ingenuity/abandoned.mp3",
          },
          {
            label: "❓ Why?",
            text: `Why did Ingenuity stop flying?

During its final landing, Ingenuity damaged its rotor blades. Without blades in working condition, it could not fly again.

But the bigger question is: why send a helicopter to Mars at all?

Mars has an extremely thin atmosphere, making flight a major engineering challenge. Ingenuity was sent to test whether a small aircraft could rise, move and land safely there.

It was expected to make five flights. It completed 72.

Ingenuity did more than prove that a helicopter could fly on another planet. It showed that future explorers might use the sky as well as the ground to discover new places.`,
            audio: "/audio/ingenuity/why.mp3",
          }
        ],
      },
    ],
  },
};

export const sources = [
  {
    label: "NASA Solar System Exploration — Moon 3D Model",
    url: "https://solarsystem.nasa.gov/gltf_embed/2366/",
  },
  {
    label: "NASA Solar System Exploration — Mars 3D Model",
    url: "https://solarsystem.nasa.gov/gltf_embed/2372/",
  },
  {
    label: "NASA 3D Resources — equipment models & Mars surface map",
    url: "https://github.com/nasa/NASA-3D-Resources",
  },
  {
    label: "Moon surface map — three.js example textures",
    url: "https://github.com/mrdoob/three.js/tree/dev/examples/textures/planets",
  },
  {
    label: "NASA Solar System Exploration — Earth’s Moon",
    url: "https://science.nasa.gov/moon/",
  },
  {
    label: "NASA Apollo Lunar Surface Journal",
    url: "https://www.nasa.gov/history/alsj/",
  },
  {
    label: "NASA Mars Exploration Program — Missions",
    url: "https://science.nasa.gov/planetary-science/programs/mars-exploration/",
  },
  {
    label: "NASA/JPL Mars Exploration Rovers",
    url: "https://science.nasa.gov/mission/mars-exploration-rovers-spirit-and-opportunity/",
  },
  {
    label: "NASA/JPL Ingenuity Mars Helicopter",
    url: "https://science.nasa.gov/mission/mars-2020-perseverance/ingenuity-mars-helicopter/",
  },
  {
  label: "NASA NSSDC — Apollo 12 ALSEP",
  url: "https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1969-099C",
},
];
/* ---------- Team credits ---------- */
export const team = {
  name: "Totally Spies",
  members: ["Izzati", "Sabrina", "Qibah", "Nana"],
};
