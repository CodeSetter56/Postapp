import { Route, Routes, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import GlobalLoader from "./components/GlobalLoader";
import Auth from "./pages/Auth/Auth";
import Home from "./pages/Home";
import { usePost } from "./context/PostContext";

function App() {
  const { user, loading } = useAuth();
  const { globalLoading } = usePost();

  return (
    <div className="flex flex-col min-h-screen">
      {/* set a global loader that disables every other action unless loading or globalLoading is set to false */}
      {(loading || globalLoading) && <GlobalLoader />}
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
