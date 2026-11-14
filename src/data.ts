export type WorldId = "moon" | "mars";

export type Equipment = {
  id: string;
  name: string;
  shortName: string;
  year: string;
  lat: number;
  lon: number;
  type: "lander" | "rover" | "helicopter";
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
        did: "Carried Neil Armstrong and Buzz Aldrin safely to the Sea of Tranquility.",
        ended:
          "Its upper ascent stage lifted the crew back to orbit, leaving the descent stage behind.",
        now: "It remains at Tranquility Base, surrounded by experiments, tools, and the astronauts’ footprints.",
        voice:
          "Hi, I’m Eagle’s descent stage. I landed here in 1969, and I’m still keeping watch at Tranquility Base.",
        model: "/models/equipment/apollo-lunar-module.glb",
      },
      {
        id: "apollo-15",
        name: "Apollo 15 Lunar Roving Vehicle",
        shortName: "LRV 1",
        year: "1971",
        lat: 26.132,
        lon: 3.634,
        type: "rover",
        did: "Became the first vehicle driven by astronauts on the Moon and helped them explore 27.9 km of the Hadley–Apennine region.",
        ended: "Its final drive took place during Apollo 15's third moonwalk on 2 August 1971. The astronauts left it on the Moon before returning to orbit.",
        now: "It remains parked near the Apollo 15 landing site in the Hadley–Apennine region.",
        voice:
          "Hi, I’m the Apollo 15 lunar rover! In 1971, I helped astronauts explore the Moon by driving almost 28 km across its rocky surface.",
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
        id: "apollo-17",
        name: "Apollo 17 Lunar Roving Vehicle",
        shortName: "LRV 3",
        year: "1972",
        lat: 20.191,
        lon: 30.772,
        type: "rover",
        did: "Carried the last Apollo moonwalkers on three record-setting expeditions.",
        ended: "It stopped after 35.7 km, the longest drive of any Apollo rover.",
        now: "Parked in the Taurus–Littrow valley, close to the Challenger descent stage.",
        voice:
          "I’m the last Apollo rover. I explored Taurus–Littrow, then watched the last humans leave the Moon.",
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
      {
        id: "spirit",
        name: "Spirit Rover",
        shortName: "Spirit",
        year: "2004",
        lat: -14.568,
        lon: 175.472,
        type: "rover",
        did: "Explored Gusev Crater for more than six years and found signs of ancient water.",
        ended: "It became stuck in soft soil; its last communication came on March 22, 2010.",
        now: "Spirit rests at Troy on the western side of Home Plate.",
        voice: "I’m Spirit. I was built for 90 days, but I explored Mars for more than six years.",
        // Spirit and Opportunity were identical twins, so they share NASA's MER model
        model: "/models/equipment/opportunity.glb",
      },
      {
        id: "opportunity",
        name: "Opportunity Rover",
        shortName: "Opportunity",
        year: "2004",
        lat: -2.046,
        lon: -5.526,
        type: "rover",
        did: "Traveled more than 45 km and revealed a long history of water on Mars.",
        ended: "A global dust storm silenced it in June 2018 after nearly 15 years.",
        now: "It rests in Perseverance Valley on the rim of Endeavour Crater.",
        voice:
          "I’m Opportunity. I crossed Mars for almost 15 years, one careful wheel turn at a time.",
        model: "/models/equipment/opportunity.glb",
      },
      
{
  id: "viking-1",
  name: "Viking 1 Lander",
  shortName: "Viking 1",
  year: "1975",
  lat: 22.483,
  lon: -47.94,
  type: "lander",
  did: "Made the first successful NASA landing on Mars and sent back the first images from its surface.",
  ended:
    "Stopped communicating with Earth on November 11, 1982, after receiving a faulty command.",
  now:
    "It remains on Mars at Chryse Planitia, at a landing site named Thomas Mutch Memorial Station.",
  voice:
    "Hi, I'm Viking 1! I landed on Mars in 1976 and sent Earth its first pictures from the Martian surface. I even searched the red soil for signs of life!",
  model: "/models/equipment/viking-lander.glb",
  tabs: [
    {
      label: "📖 About",
      text: `Imagine being the first NASA robot to successfully land on Mars! That's me, Viking 1! 🔴

I was part of NASA's Viking mission, which included an orbiter flying around Mars and a lander exploring its surface.

I made history on July 20, 1976, when I safely landed on Mars and sent back the first images from its surface.

My job was to help scientists understand Mars and discover whether it could have supported life.`
    },
    {
      label: "🔧 Function",
      text: `I was like a robot scientist with a mini laboratory! 🔬

📸 Took photographs of the Martian landscape using my cameras.

🦾 Used a robotic arm to scoop up Martian soil.

🧪 Tested soil samples in a special biological laboratory to look for possible signs of life.

🌡️ Measured the weather, including temperature, air pressure and wind speed.

🌍 Sent pictures and scientific information back to Earth so scientists could study Mars.`
    },
    {
      label: "🚀 Launch",
      text: `I blasted off toward Mars on 20 August 1975! 🚀

🚀 Rocket: Titan IIIE-Centaur

📍 Launch location: Cape Canaveral, Florida, USA

🪐 Arrived in Mars orbit: 19 June 1976

🛬 Landing date: 20 July 1976

I travelled through space for almost 11 months before finally reaching the Red Planet!`
    },
    {
      label: "🛰️ Mission",
      text: `My mission was a huge adventure!

1. 🚀 Launched from Earth on 20 August 1975.
2. 🪐 Entered orbit around Mars on 19 June 1976.
3. 📸 Scientists studied my photographs from orbit and selected a safer landing area.
4. 🛬 Landed safely on Chryse Planitia on 20 July 1976.
5. 📷 Took the first photographs of the Martian surface.
6. 🦾 On 28 July 1976, my robotic arm collected my first soil samples.
7. 🧪 Tested the soil to search for possible signs of life.
8. 🌡️ Continued sending weather reports and scientific information to Earth.

Fun fact! My cameras even captured a 300-degree panorama of the surrounding Martian landscape!`
    },
    {
      label: "🕰️ Abandoned",
      text: `My mission officially began in 1976, but I continued working for much longer!

📅 20 July 1976: I landed safely on Mars.

📅 November 1976: My primary mission ended, but I continued operating during extended missions.

📅 January 1982: My landing site was renamed Thomas Mutch Memorial Station.

📅 11 November 1982: My last communication with Earth took place.

After more than six years on Mars, I finally went silent.`
    },
    {
      label: "❓ Why?",
      text: `So, why did I stop working? 🤔

📡 On 11 November 1982, I received a faulty command sent from Earth. This caused communication with me to stop.

🔧 Scientists tried several times to contact me again, but none of their attempts worked.

🌌 I could no longer send pictures, weather reports or scientific information back to Earth.

Even though I stopped communicating, my work was not wasted!

🏆 I helped scientists learn more about Mars, its soil, weather and environment. My discoveries also helped prepare the way for future Mars missions.

My adventure ended, but the exploration of Mars continued!`
    }
  ]
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
];
