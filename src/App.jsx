import { DashboardScreen, WIPScreen } from "./ui/screens";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Sidebar } from "./ui/components";
import "./App.css";

function App() {
  return (
    <div className="bg-gray-800">
      <Router>
        <Sidebar />
        <Routes>
          <Route path="/wip" element={<WIPScreen />} />
          <Route path="/" element={<DashboardScreen />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
