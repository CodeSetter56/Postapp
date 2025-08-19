import { Route, Routes, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import GlobalLoader from "./components/GlobalLoader";
import Auth from "./pages/Auth/Auth";
import Home from "./pages/Home";
import { usePost } from "./context/PostContext";
import Profile from "./pages/Profile";

function App() {
  // Renamed loading to authLoading to be more specific
  const { user, loading: authLoading } = useAuth();
  const { globalLoading } = usePost();

  return (
    <div className="flex flex-col min-h-screen">
      {(authLoading || globalLoading) && <GlobalLoader />}
      <Navbar />
      <main className="flex-grow flex flex-col">
        {/*wait for the initial authentication check to finish before rendering any routes */}
        {!authLoading && (
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
            <Route
              path="/profile"
              element={
                !user ? (
                  <Navigate to="/auth" />
                ) : (
                  <div className="flex-grow flex justify-center items-center">
                    <Profile />
                  </div>
                )
              }
            />
          </Routes>
        )}
      </main>
    </div>
  );
}

export default App;
