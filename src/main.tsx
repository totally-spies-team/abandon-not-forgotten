import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

// Note: <React.StrictMode> is left out on purpose. In development it mounts
// everything twice, which makes the 3D globe labels (drei <Html>) lose the
// first marker and can crash when switching worlds.
ReactDOM.createRoot(document.getElementById("root")!).render(<App />);
