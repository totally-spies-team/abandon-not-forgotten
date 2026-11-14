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
  tabs?: { label: string; text: string }[];
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
            text: `Meet Eagle! 🚀

Before humans could walk on the Moon, NASA needed a special spacecraft to get them there and bring them back.

Eagle was the Lunar Module of Apollo 11. It carried two astronauts, Neil Armstrong and Buzz Aldrin, to the Moon. It had two parts: a lower section with landing legs and an upper section where the astronauts lived and worked.`,
          },
          {
            label: "🔧 Function",
            text: `🛬 Landed astronauts safely on the Moon
🚀 Carried astronauts back into lunar orbit
🏠 Provided a small space for astronauts to live and work
🔬 Stored scientific tools and equipment for Moon experiments
📡 Communicated with Earth and the Command/Service Module`,
          },
          {
            label: "🚀 Launch",
            text: `Eagle blasted off from Cape Canaveral on 16 July 1969 aboard a powerful Saturn V rocket.

It reached the Moon as part of Apollo 11 and landed on 20 July 1969 in a place called the Sea of Tranquility.

🌕 It was the first crewed spacecraft to land on the Moon!`,
          },
          {
            label: "🛰️ Mission",
            text: `1. Travel to the Moon with the Apollo 11 spacecraft 🚀
2. Separate from the Command/Service Module
3. Fire its engine to slow down and land on the Moon
4. Let Armstrong and Aldrin explore the lunar surface
5. Collect Moon rocks, take photos and set up scientific experiments
6. Fire the upper stage's engine to lift off from the Moon
7. Reunite with the Command/Service Module, where Michael Collins was waiting

🌟 The astronauts collected 21.55 kg of Moon rocks and soil during their mission!`,
          },
          {
            label: "🕰️ Abandoned",
            text: `Eagle's mission on the Moon ended on 21 July 1969, after the astronauts spent 21 hours and 36 minutes on the lunar surface.

🚀 The upper section lifted off to take Armstrong and Aldrin back to the Command/Service Module.

🛬 The lower section, with its four landing legs, was left behind on the Moon. It had finished its job and was never meant to return to Earth.

The upper section was later released into lunar orbit. Its exact fate is unknown, but scientists believe it crashed onto the Moon within 1–4 months.`,
          },
          {
            label: "❄️ Why?",
            text: `Eagle was designed in two parts because landing on the Moon and taking off again needed different equipment.

🛬 The lower section carried the landing engine, fuel and four landing legs. It also acted as a platform for the upper section to take off.
🚀 The upper section carried the astronauts and had its own engine to return them to lunar orbit.
🎯 Leaving the heavy landing section behind meant the astronauts didn't have to carry unnecessary equipment back into space.

✅ Mission accomplished! Eagle helped make the first human Moon landing possible.`,
          },
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
            text: `Meet the Apollo 15 Lunar Roving Vehicle, also called the LRV! 🚙🌕 It was the first vehicle ever driven by astronauts on the Moon.

It travelled with astronauts David Scott and James Irwin during the Apollo 15 mission. Its job was to help them explore places that would have been too far away to reach easily on foot.`,
          },
          {
            label: "🔧 Function",
            text: `The lunar rover was like a small electric car made for the Moon!

🛞 Carried astronauts across the lunar surface
🪨 Helped them reach different places to collect Moon rocks and soil
📸 Helped astronauts explore and photograph the landscape
🧪 Supported the science work during their moonwalks

It helped the astronauts explore areas within about 5 km of their landing site.`,
          },
          {
            label: "🚀 Launch",
            text: `Apollo 15 launched from Cape Canaveral, Florida, on 26 July 1971 aboard a Saturn V rocket.

The rover travelled to the Moon inside the lunar module Falcon. Falcon landed on 30 July 1971, and the astronauts unloaded and drove the rover during their first moonwalk on 31 July.`,
          },
          {
            label: "🛰️ Mission",
            text: `The rover had a busy adventure on the Moon!

1. 🌕 Apollo 15 landed near the Apennine Mountains on 30 July 1971.
2. 🛞 David Scott and James Irwin unloaded the rover during their first moonwalk on 31 July.
3. 🗺️ They drove it on three exploration trips around the landing area.
4. 🪨 The astronauts collected 77.31 kg of Moon rocks and soil during the mission.
5. 🏁 Across the three trips, the rover travelled about 27.9 km.

The three moonwalks together lasted 18 hours and 35 minutes.`,
          },
          {
            label: "🕰️ Abandoned",
            text: `The rover was left on the Moon on 2 August 1971, after the astronauts finished their third and final moonwalk.

After spending 66 hours and 55 minutes on the lunar surface, the astronauts lifted off in Falcon's upper stage to meet their spacecraft orbiting the Moon. The rover stayed behind at the Apollo 15 landing site.`,
          },
          {
            label: "❓ Why?",
            text: `The rover was made to explore the Moon, not to travel back to Earth.

🚀 The astronauts returned to orbit using the upper part of the lunar module, Falcon.
🛞 The rover was surface equipment, so it stayed where the astronauts had finished exploring.
🌕 Leaving it behind allowed the mission to bring the astronauts home without carrying the rover.

Mission accomplished! The rover helped Apollo 15 explore much more of the Moon than astronauts could have covered on foot.`,
          },
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
            text: `Before astronauts could walk on the Moon, NASA had a big worry: what if the ground was too soft? Some scientists thought spacecraft might sink into deep dust, like quicksand.

So NASA sent robot scouts called Surveyors to find out first. Each one was about 3 metres tall, stood on three legs and had a camera for eyes.`,
          },
          {
            label: "🔧 Function",
            text: `📸 Took thousands of close-up photos of the Moon
🦶 Tested whether the ground could hold a spacecraft
🥄 Dug trenches with a little robot scoop
🗺️ Helped NASA pick safe landing spots for Apollo`,
          },
          {
            label: "🚀 Launch",
            text: `Surveyor 3 blasted off on 17 April 1967 and landed on 20 April 1967.

It was one of seven Surveyors launched between 1966 and 1968. Five landed safely, and two crashed.`,
          },
          {
            label: "🛰️ Mission",
            text: `1. Blast off from Florida on an Atlas-Centaur rocket 🔥
2. Fly to the Moon in about 3 days
3. Fire a rocket backwards to slow down
4. Touch down on three padded legs
5. Take photos, dig and beam the results to Earth

😅 Fun fail: shiny rocks confused its radar and its engine didn't switch off in time, so it bounced twice before landing!`,
          },
          {
            label: "🕰️ Abandoned",
            text: `Surveyor 3 sent its last message on 4 May 1967, just two weeks after landing.

But it wasn't forgotten! In November 1969, the Apollo 12 astronauts landed only 180 m away and walked over to visit. They took its camera and scoop home to Earth. It's the only robot on another world that people have ever visited.`,
          },
          {
            label: "❄️ Why?",
            text: `🌑 A night on the Moon lasts about two weeks and gets colder than −150 °C. Surveyor ran on solar power, so in the dark its electronics froze.

🎫 It was a one-way trip. Surveyors were never built to come home.

✅ Mission accomplished! It proved the ground was firm enough for astronauts to land on.`,
          },
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
      },
        tabs: [
          {
            label: "📖 About",
            text: `Sojourner was the first rover to explore the surface of another planet.

It was 30 cm tall, weighed 10.6 kg, and was named after civil-rights activist Sojourner Truth.`,
          },
          {
            label: "🔧 Function",
            text: `🚗 Drove around the Mars Pathfinder landing site
🪨 Analyzed the composition of rocks and soil
📸 Took close-up pictures of the Martian surface
📡 Sent data to the Pathfinder lander, which relayed it to Earth`,
          },
          {
            label: "🚀 Launch",
            text: `Sojourner launched inside the Mars Pathfinder spacecraft on 4 December 1996.

Pathfinder landed in Ares Vallis on 4 July 1997.`,
          },
          {
            label: "🛰️ Mission",
            text: `1. Travel to Mars inside Pathfinder
2. Land inside giant airbags that bounced across the surface
3. Roll down the lander's ramp
4. Explore nearby rocks and soil
5. Send images and science data back through the lander`,
          },
          {
            label: "🕰️ Abandoned",
            text: `The Pathfinder mission's final data arrived on 27 September 1997.

Sojourner remains on Mars, likely near the Pathfinder lander in Ares Vallis.`,
          },
          {
            label: "❓ Why?",
            text: `🧭 Sojourner tested how a small rover could explore another planet.

🔬 Its measurements helped scientists study Martian rocks and soil up close.

✅ Pathfinder returned its final data on 27 September 1997, ending the mission.`,
          },
        ],
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
      text: `Meet Spirit! 🔴

What if Mars was once covered with water? NASA wanted to find out, so it sent two robot explorers to investigate the Red Planet.

Spirit was one of these twin rovers. It landed inside Gusev Crater, a giant crater that scientists thought might once have held a lake.

Spirit became a robot geologist, exploring rocks and soil to uncover clues about Mars's watery past.`,
    },
    {
      label: "🔧 Function",
      text: `📸 Took panoramic pictures of the Martian landscape
🪨 Studied rocks and soil to discover what they were made of
🔬 Used scientific instruments to investigate minerals
🦾 Used a robotic arm to examine interesting rocks up close
🗺️ Explored the surface and searched for signs of ancient water`,
    },
    {
      label: "🚀 Launch",
      text: `Spirit arrived on Mars on 3 January 2004.

It landed inside Gusev Crater, a huge impact crater that scientists believed might once have been a lake.

Spirit was one of two identical Mars Exploration Rovers sent to different parts of the planet. Its twin, Opportunity, landed a few weeks later on the other side of Mars.`,
    },
    {
      label: "🛰️ Mission",
      text: `Spirit's mission was to investigate Mars and search for evidence that liquid water had once existed there.

1. Travel through space to Mars 🚀
2. Land safely inside Gusev Crater
3. Take pictures of the surrounding landscape 📸
4. Drive across the surface to explore rocks and soil
5. Use scientific tools to study the rocks
6. Send pictures and discoveries back to Earth 📡

🌟 Spirit travelled about 7.7 km across Mars and helped scientists discover evidence that water had existed there long ago!`,
    },
    {
      label: "🕰️ Abandoned",
      text: `Spirit's mission officially ended in 2010.

It was originally designed for a mission lasting only 90 Martian days. But it kept exploring for more than six years!

After years of travelling and investigating the Red Planet, Spirit finally stopped operating.

Even though it could no longer send messages, its discoveries continued helping scientists understand Mars.`,
    },
    {
      label: "❄️ Why?",
      text: `Why did NASA send Spirit all the way to Mars?

Scientists wanted to know whether Mars was once warm and wet enough to support life.

🌊 Gusev Crater looked like it might have been an ancient lake, making it a perfect place to investigate.

🔬 By studying rocks and soil, Spirit found evidence that water had played a role in Mars's history.

🎯 Spirit wasn't designed to return to Earth. Its job was to explore, investigate and send its discoveries home.

✅ Mission accomplished! It helped show that Mars had a much wetter past than the dry, dusty planet we see today.`,
    },
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
      text: `Meet Opportunity! 🔴

Imagine being sent to Mars for just 90 days but continuing your adventure for almost 15 years!

Opportunity was one of NASA's twin Mars Exploration Rovers. Its job was to investigate rocks and soil for clues that water once existed on the Red Planet.

It landed at Meridiani Planum, a place with minerals that suggested Mars had a wet history.`,
    },
    {
      label: "🔧 Function",
      text: `📸 Captured thousands of pictures of the Martian landscape
🪨 Examined rocks and soil for clues about ancient water
🔬 Studied minerals to understand Mars's history
🦾 Used a robotic arm to investigate rocks up close
🗺️ Travelled across Mars to explore different locations`,
    },
    {
      label: "🚀 Launch",
      text: `Opportunity landed on Mars on 24 January 2004 (Pacific time).

Its landing site was Meridiani Planum, a flat region with deposits of a mineral called hematite.

Why was that exciting? 🤔 Hematite can form in environments where water is present, making this a great place to search for clues about Mars's past.

Opportunity was Spirit's twin rover, but each robot explored a different part of Mars.`,
    },
    {
      label: "🛰️ Mission",
      text: `Opportunity's mission was to search for signs that liquid water had once existed on Mars.

1. Travel through space to the Red Planet 🚀
2. Land safely at Meridiani Planum
3. Take pictures of rocks and the surrounding landscape 📸
4. Drive across Mars to investigate interesting locations
5. Examine rocks and minerals using scientific instruments
6. Send its discoveries back to Earth 📡

🌟 Opportunity travelled an incredible 45.16 km across Mars!

It found evidence that water had been present on the planet long ago.`,
    },
    {
      label: "🕰️ Abandoned",
      text: `Opportunity sent its last message to Earth on 10 June 2018.

What happened? A huge dust storm spread across Mars and covered the area where Opportunity was exploring.

The rover depended on solar panels for power. With so much dust blocking sunlight, it could no longer generate enough electricity to keep communicating.

NASA tried to contact Opportunity again, but no more messages arrived.

After almost 15 years of exploration, its mission came to an end.`,
    },
    {
      label: "❄️ Why?",
      text: `Why did Opportunity stop working?

🌪️ A massive dust storm covered the Martian sky and blocked sunlight from reaching its solar panels.

🔋 Without enough sunlight, Opportunity could not generate the power it needed to operate and communicate with Earth.

But why was it exploring Mars in the first place?

Scientists wanted to discover whether water had once existed on the planet. Opportunity found evidence that ancient Mars had a wetter environment.

🎯 It was originally designed to work for just 90 days, but it explored for almost 15 years!

✅ Mission accomplished! Opportunity travelled much farther than expected and helped change what we know about Mars.`,
    },
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
      text: `Meet Viking 1! 🔴

Imagine being the first NASA spacecraft to successfully land on Mars!

Viking 1 was part of NASA's Viking mission, which used two main parts: an orbiter that studied Mars from space and a lander that explored its surface.

I made history on July 20, 1976, when I safely touched down on Mars and began sending the first photographs from the planet's surface.

🌟 In 2026, we celebrate 50 years since this historic landing!`,
    },
    {
      label: "🔧 Function",
      text: `I was like a robot scientist with my own mini laboratory! 🔬

📸 Took photographs of the Martian landscape in colour.

🦾 Used a robotic arm to scoop up Martian soil.

🧪 Tested soil samples in a special biological laboratory to search for possible signs of life.

🌡️ Measured the weather, including temperature, air pressure and wind speed.

📡 Sent photographs and scientific information back to Earth.

My orbiter partner also photographed Mars from space and helped scientists study its surface!`,
    },
    {
      label: "🚀 Launch",
      text: `I blasted off toward Mars on 20 August 1975! 🚀

🚀 Rocket: Titan IIIE-Centaur

📍 Launch location: Cape Canaveral, Florida, USA

🪐 Arrived in Mars orbit: 19 June 1976

🛬 Landing date: 20 July 1976

I travelled through space for almost 11 months before reaching the Red Planet!

Before landing, scientists studied photographs from orbit and chose a safer landing area at Chryse Planitia.`,
    },
    {
      label: "🛰️ Mission",
      text: `My mission was to explore Mars and investigate whether the planet could have supported life.

1. 🚀 Launched from Earth on 20 August 1975.
2. 🪐 Entered orbit around Mars on 19 June 1976.
3. 📸 The orbiter photographed Mars to help scientists choose a safe landing area.
4. 🛬 Separated from the orbiter and landed safely on 20 July 1976.
5. 📷 Took the first photographs from the Martian surface.
6. 🦾 Collected soil samples using my robotic arm.
7. 🧪 Tested the soil in my onboard laboratory.
8. 🌡️ Continued sending weather reports and scientific data to Earth.

🌟 My discoveries helped scientists understand Mars and investigate whether life could ever have existed there!`,
    },
    {
      label: "🕰️ Abandoned",
      text: `My mission did not end immediately after landing!

I continued working for years and sent photographs, scientific information and weather reports back to Earth.

📅 7 August 1980: My orbiter partner was shut down after running out of attitude-control propellant.

📅 11 November 1982: My lander stopped communicating after receiving a faulty command from Earth.

NASA tried to contact me again, but the messages never reached me.

Today, I remain on Mars at the place where I made history.`,
    },
    {
      label: "❄️ Why?",
      text: `Why did NASA send Viking 1 to Mars?

🔬 Scientists wanted to investigate the planet's surface and search for possible signs of life.

🌊 They wanted to understand whether Mars had once been warmer and wetter.

📸 The orbiter helped map the planet, while the lander studied the soil, weather and surroundings.

🧪 My experiments produced interesting results, but they did not provide confirmed evidence of life.

✅ Mission accomplished! I helped begin a new chapter of Mars exploration, and missions today continue building on what the Vikings started.`,
    },
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
            text: `Ingenuity was a tiny robot helicopter, the first aircraft ever to fly on another world.

It weighed just 1.8 kg on Earth, about as much as a big bottle of water.`,
          },
          {
            label: "🔧 Function",
            text: `🚁 Proved that a helicopter could fly in Mars' super-thin air
🗺️ Scouted ahead to help the Perseverance rover plan its route
📸 Took photos from the sky
✈️ Carried a tiny piece of fabric from the Wright brothers' first airplane`,
          },
          {
            label: "🚀 Launch",
            text: `Ingenuity launched on 30 July 2020, tucked under the belly of the Perseverance rover. They landed together in Jezero Crater on 18 February 2021.`,
          },
          {
            label: "🛰️ Mission",
            text: `1. Ride to Mars attached to Perseverance
2. Drop to the ground and charge up with its solar panel
3. Make the first flight on 19 April 2021
4. Keep flying, much more than planned!

🏆 It was planned for 5 test flights, but it made 72!
📏 Total distance: 17 km. Highest flight: 24 m up.`,
          },
          {
            label: "🕰️ Abandoned",
            text: `Ingenuity made its final flight on 18 January 2024, and NASA ended the mission on 25 January 2024.

Its team named its final resting spot "Valinor Hills".`,
          },
          {
            label: "❓ Why?",
            text: `💥 On its last landing, Ingenuity damaged its rotor blades, so it could never fly again.

✅ It had already done far more than anyone expected: 72 flights instead of 5!`,
          },
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
