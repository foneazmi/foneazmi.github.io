import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

const App = React.lazy(() => import("./App"));
import { FaRegPaperPlane } from "react-icons/fa";

const Spinner = (
  <div className="centered">
    <FaRegPaperPlane className="bounce" />
  </div>
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Suspense fallback={Spinner}>
      <App />
    </Suspense>
  </React.StrictMode>
);
