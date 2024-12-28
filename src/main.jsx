import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css"; // Optional, for global styles
import { ApiProvider } from "./context/ApiContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <ApiProvider>
    <App />
  </ApiProvider>
);
