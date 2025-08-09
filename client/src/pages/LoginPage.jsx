import { useState } from "react";
import AuthCard from "@/components/AuthCard";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const LoginPage = () => {
  const [showSignup, setShowSignup] = useState(false);
  const toggleAuth = () => setShowSignup(!showSignup);

  return (
    <div className="pt-10 min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-950 to-fuchsia-700">
      <div className="flex w-full max-w-6xl px-4 md:px-0">
        <div className="w-full md:w-1/2 flex items-center justify-center">
          <div className="w-full max-w-sm">
            <AuthCard />
            <p className="text-sm text-center text-white mt-4">
              {showSignup ? "Already have an account?" : "Don't have an account?"}
              <button
                onClick={toggleAuth}
                className="ml-2 text-purple-300 hover:text-white underline"
              >
                {showSignup ? "Login" : "Sign up"}
              </button>
            </p>
          </div>
        </div>


        <div className="hidden md:flex w-1/2 items-center justify-center pb-30">
          <div className="w-[350px] h-[350px] animate-float">
            <DotLottieReact
              src="/animations/login-animation.lottie"
              loop
              autoplay
              style={{ width: "100%", height: "100%" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
