import { Route, Routes } from "react-router-dom";

import Navbar from "./components/Navbar";
import Auth from "./pages/Auth/Auth";
import Home from "./pages/Home";

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow flex flex-col">
        <Routes>
          <Route path="/" element={<Home />} />

          <Route
            path="/auth"
            element={
              <div className="flex-grow flex justify-center items-center">
                <Auth />
              </div>
            }
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;
