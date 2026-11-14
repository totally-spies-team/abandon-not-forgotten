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
          "Hi! I'm Eagle. I helped Neil Armstrong and Buzz Aldrin make history in 1969. My job was to get them safely onto the Moon. Once they were ready to go home, I stayed behind!",
        model: "/models/equipment/apollo-lunar-module.glb",
        
        tabs: [
          {
            label: "📖 About",
            text: `Meet Eagle! 🚀

        Eagle was the Lunar Module that carried Neil Armstrong and Buzz Aldrin to the Moon. It became the first crewed spacecraft to land on the lunar surface on 20 July 1969!

        It had two parts:
        🛬 A bottom section with four landing legs and a powerful rocket engine.
        🚀 A top section where the astronauts lived and controlled the spacecraft.

        Together, these two sections helped make history!`
          },
          {
            label: "🔧 Function",
            text: `Eagle had one very important mission: get astronauts safely to the Moon and bring them back to their spacecraft!

        🛬 Landing: Its lower section used rocket engines and four landing legs to touch down safely.

        🏠 Astronaut home: Its upper section gave the astronauts a place to work, rest and control the spacecraft.

        🔬 Science: It carried scientific equipment to study the Moon, including experiments to detect moonquakes and lunar dust.

        🚀 Take-off: Its upper section launched from the Moon to return the astronauts to lunar orbit.`
          },
          {
            label: "📅 Launch Date",
            text: `16 July 1969 🚀

        Apollo 11 launched from Cape Canaveral, Florida, aboard the enormous Saturn V rocket.

        After travelling through space, Eagle separated from the command spacecraft and prepared for its most dangerous job: landing on the Moon!

        🌕 20 July 1969: Eagle successfully landed in the Sea of Tranquility.`
          },
          {
            label: "🛰️ Mission Profile",
            text: `Follow Eagle's incredible journey!

        1. 🚀 LAUNCH: Apollo 11 blasted off from Earth aboard the Saturn V rocket.

        2. 🌕 SEPARATION: Eagle separated from the command spacecraft while orbiting the Moon.

        3. 🛬 LANDING: Its powerful engine slowed it down until it safely landed in the Sea of Tranquility.

        4. 👨‍🚀 MOONWALK: Neil Armstrong and Buzz Aldrin stepped onto the Moon, collected 21.55 kg of lunar rocks and soil, and took photographs.

        5. 🔬 SCIENCE TIME: The astronauts set up experiments to study moonquakes and lunar dust.

        6. 🚀 RETURN: After 21 hours and 36 minutes on the Moon, Eagle's upper section lifted off and reunited with the command spacecraft.

        Mission accomplished! The astronauts were on their way home.`
          },
          {
            label: "🕰️ Abandoned",
            text: `21 July 1969 🌕

        After spending 21 hours and 36 minutes on the Moon, Eagle's upper section lifted off with Armstrong and Aldrin.

        But its lower section, called the descent stage, stayed behind at the Sea of Tranquility.

        It was left at the same place where humans first walked on the Moon.

        A little piece of history was now resting on the lunar surface!`
          },
          {
            label: "❓ Why Abandoned?",
            text: `Eagle was designed in two sections, and each had a different job.

        🛬 The lower section helped Eagle land and provided a platform for the upper section to launch.

        🚀 The upper section carried the astronauts back into lunar orbit to meet their command spacecraft.

        The lower section was not designed to fly back to Earth, so there was no reason to bring it along.

        What happened to the upper section? After reuniting with the command spacecraft, it was released into lunar orbit. Scientists believe it crashed onto the Moon sometime within the next 1–4 months, but its exact location is unknown.

        Eagle's job was complete! 🏆`
          },
        ],

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
        id: "alsep",
        name: "Apollo Lunar Surface Experiments Package",
        shortName: "ALSEP",
        year: "1969",
        lat: -3.0098,
        lon: -23.4249,
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
        year: "1976",
        lat: 22.697,
        lon: -48.222,
        type: "lander",
        did: "Sent the first successful photographs and long-term weather reports from the Martian surface.",
        ended: "A mistaken command shut down communication in November 1982.",
        now: "It remains in Chryse Planitia at a site named the Thomas Mutch Memorial Station.",
        voice: "I’m Viking 1. In 1976, I showed Earth the surface of Mars in color.",
        model: "/models/equipment/viking-lander.glb",
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
