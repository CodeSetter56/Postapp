import React, { useState } from "react";
import Login from "./Login";
import Signup from "./Signup";

function Auth() {
  // switches login and signup components
  const [signup, setSignup] = useState(true);

  return (
    <div>
      {signup ? (
        <>
          <Login />
          <div className="cursor-pointer" onClick={() => setSignup(!signup)}>
            Dont have an account? Register here
          </div>
        </>
      ) : (
        <>
          <Signup />
          <div className="cursor-pointer" onClick={() => setSignup(!signup)}>
            Have an account? Login here
          </div>
        </>
      )}
    </div>
  );
}

export default Auth;
