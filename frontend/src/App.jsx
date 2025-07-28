import { Route, Routes } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Auth from "./pages/Auth";

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      {/* This main content area will grow to fill the remaining space */}
      <main className="flex-grow flex flex-col">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/auth"
            element={
              // This wrapper div will center the Auth component
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
