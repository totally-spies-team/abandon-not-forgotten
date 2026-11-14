# Abandoned, Not Forgotten

The 3D Figma Make prototype "Explore Forgotten Space Equipment", as a real project for VS Code.
Built with React, Three.js (3D globes) and NASA's model-viewer (3D equipment models).

## How to run it (first time)

1. **Install Node.js** (one time only): go to https://nodejs.org, download the **LTS** version, install it, then restart VS Code.
2. **Open the folder** in VS Code: File → Open Folder… → choose `abandoned-not-forgotten`.
3. **Open the terminal** in VS Code: menu **Terminal → New Terminal**.
4. **Install the project's parts** (one time only, takes a minute):
   ```
   npm install
   ```
5. **Start it:**
   ```
   npm run dev
   ```
   Your browser opens the site automatically (if not, open the `http://localhost:5173` link shown in the terminal).

To stop it: click in the terminal and press **Ctrl + C**.
Next time, you only need steps 2, 3 and 5.

> Double-clicking `index.html` does **not** work for this project — it must be started with `npm run dev`.

## Where things are

| Path | What it is |
|------|-----------|
| `src/data.ts` | **All content**: worlds, equipment, stories, coordinates, which 3D model each one uses, sources |
| `src/App.tsx` | All screens: home, launch countdown, 3D globe, story card, sources, navigation |
| `src/index.css` | All styling and animations (colours at the top in `:root`) |
| `index.html` | Page shell — loads the NASA model-viewer files |
| `public/nasa-model-viewer/` | Your NASA files: `model-viewer.js` + polyfills (`webcomponents-bundle.js`, `fullscreen.polyfill.js`, `intersection-observer.js`, `ResizeObserver.js`) |
| `public/models/equipment/` | NASA 3D models (Apollo Lunar Module, Viking Lander, Ingenuity, Opportunity/Spirit rover) |
| `public/textures/` | Moon and Mars surface maps wrapped around the globes |
| `public/draco/` | Decoder for the compressed NASA models (so they work offline) |

## Changing things

- **Text, facts, coordinates** → `src/data.ts`
- **Give another object a NASA 3D model** → put a `.glb` file in `public/models/equipment/`
  and add `model: "/models/equipment/your-file.glb"` to that object in `src/data.ts`.
  More free NASA models: https://github.com/nasa/NASA-3D-Resources (look for `.glb` files).
- **Use the NASA planet models from Figma** instead of the surface maps → in Figma Make, download the
  code, copy `moon-nasa.glb` and `mars-nasa.glb` into `public/models/`, then remove the `//` in front of
  `modelUrl` in `src/data.ts`. They are resized automatically.
- **Which side of the globe faces you first** → `focusLon` in `src/data.ts`.

## Differences from the Figma version

- Globes use NASA/three.js surface maps by default (Figma's planet `.glb` files can't be exported through
  the connection — see above to add them back).
- Story cards show **real NASA 3D models** (with model-viewer) for Eagle, Viking 1, Ingenuity, Spirit and
  Opportunity; the others keep the simple built-in shapes.
- Fixed: the first marker on each globe never appeared (Sojourner, Eagle), and labels of objects on the far
  side of the planet showed through it.
- The globe now starts facing the landing sites.

## Credits

NASA 3D Resources (equipment models, Mars map), three.js example textures (Moon map),
Google model-viewer (Apache 2.0) and Polymer web components polyfills (BSD).
