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
        did: "Carried astronauts across 27.8 km of the Hadley–Apennine landscape.",
        ended: "Its final drive ended beside the lunar module Falcon after three excursions.",
        now: "Parked near Hadley Rille, its camera pointed toward the departing astronauts.",
        voice:
          "I’m the first lunar rover. In 1971, I carried Apollo 15 farther than astronauts had ever walked.",
      },
      {
        id: "apollo-16",
        name: "Apollo 16 Lunar Roving Vehicle",
        shortName: "LRV 2",
        year: "1972",
        lat: -8.973,
        lon: 15.501,
        type: "rover",
        did: "Helped explore the rugged Descartes Highlands over three days.",
        ended: "After 26.7 km of driving, it was parked for the crew’s departure.",
        now: "It rests near the Orion lunar module descent stage in the Descartes Highlands.",
        voice:
          "I’m Apollo 16’s rover. My small wheels crossed the ancient Descartes Highlands in 1972.",
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
