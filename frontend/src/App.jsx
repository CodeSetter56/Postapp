import { Route, Routes, Navigate } from "react-router-dom";

import { useAuth } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Auth from "./pages/Auth/Auth";
import Home from "./pages/Home";

function App() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex-grow flex justify-center items-center min-h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow flex flex-col">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/auth"
            element={
              //conditional redirect logic
              user ? (
                <Navigate to="/" />
              ) : (
                <div className="flex-grow flex justify-center items-center">
                  <Auth />
                </div>
              )
            }
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;
