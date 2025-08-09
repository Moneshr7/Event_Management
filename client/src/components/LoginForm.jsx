import { useState } from "react";
import { login, signInWithGoogle, resetPassword } from "@/lib/firebase/authFunctions";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FcGoogle } from "react-icons/fc";

export default function LoginForm({ switchToSignup }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [resetEmail, setResetEmail] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [showReset, setShowReset] = useState(false);
  const navigate = useNavigate();

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate("/dashboard");
    } catch (error) {
      setErrorMsg("your email or Password is incorrect");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithGoogle();
      navigate("/dashboard");
    } catch (error) {
      if (error.code !== "auth/popup-closed-by-user") {
      setErrorMsg("");
    }
  }
  };

  const handleResetPassword = async () => {
    try {
      await resetPassword(resetEmail);
      alert("Password reset email sent!");
      setShowReset(false);
    } catch (error) {
      setErrorMsg(error.message);
    }
  };

  return (
    <div>
      <p className="text-2xl font-semibold mb-2  text-fuchsia-100 ">Hi,Welcome to EvePoint!</p>

    <div className="max-w-md p-6 rounded-xl shadow-md border bg-white">
      <h2 className="text-2xl font-semibold text-center mb-4">Login</h2>

      {errorMsg && <div className="text-red-600 mb-3">{errorMsg}</div>}

      <form onSubmit={handleEmailLogin} className="space-y-4">
        <Input
          type="email"
          placeholder="Email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button className="w-full" type="submit">Login</Button>
      </form>

      <div className="text-center my-4">OR</div>

      <Button
        className="w-full flex items-center justify-center gap-2"
        variant="outline"
        onClick={handleGoogleLogin}
      >
        <FcGoogle size={20} />
        Sign in with Google
      </Button>

      <div className="mt-4 text-sm text-center space-y-2">
        <button
          onClick={() => setShowReset(!showReset)}
          className="text-blue-600 hover:underline"
        >
          Forgot password?
        </button>
        <br />
        <span>
          Don't have an account?{" "}
          <button className="text-blue-600 hover:underline " onClick={switchToSignup}>
            Sign up
          </button>
        </span>
      </div>

      {showReset && (
        <div className="mt-4 space-y-2">
          <Input
            type="email"
            placeholder="Enter your email"
            value={resetEmail}
            onChange={(e) => setResetEmail(e.target.value)}
          />
          <Button className="w-full" onClick={handleResetPassword}>
            Send Reset Email
          </Button>
        </div>
      )}
    </div>
    </div>
  );
}
