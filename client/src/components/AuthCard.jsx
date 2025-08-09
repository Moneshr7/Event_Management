import { useState } from "react";
import LoginForm from "@/components/LoginForm";
import SignupForm from "@/components/SignupForm";
import "@/styles/authcard.css"; // flip animation styles

export default function AuthCard() {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped((prev) => !prev);
  };

  return (
    <div className="auth-card-container">
      <div className={`auth-card-inner ${isFlipped ? "flipped" : ""}`}>
        <div className="auth-card-front">
          <LoginForm switchToSignup={handleFlip} />
        </div>
        <div className="auth-card-back">
          <SignupForm switchToLogin={handleFlip} />
        </div>
      </div>
    </div>
  );
}
