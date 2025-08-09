import { useState } from "react";
import { signup } from "@/lib/firebase/authFunctions";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function SignupForm({ switchToLogin }) {
  const [name, setName] = useState(""); // New state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await signup(email, password, name); // Pass name
      navigate("/dashboard");
    } catch (error) {
      setErrorMsg(error.message);
    }
  };

  return (
    <div>
      <p className="text-2xl font-semibold mb-2  text-fuchsia-100">
        Hi, Welcome to EvePoint!
      </p>
      <div className="max-w-md p-6 rounded-xl shadow-md border bg-white">
        <h2 className="text-2xl font-semibold  text-center mb-4">Sign Up</h2>

        {errorMsg && <div className="text-red-600 mb-3">{errorMsg}</div>}

        <form onSubmit={handleSignup} className="space-y-4">
          <Input
            type="text"
            placeholder="Name"
            value={name}
            required
            onChange={(e) => setName(e.target.value)}
          />
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
          <Button className="w-full" type="submit">Sign Up</Button>
        </form>

        <div className="text-sm text-center mt-4">
          Already have an account?{" "}
          <button
            className="text-blue-600 hover:underline"
            onClick={switchToLogin}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}
