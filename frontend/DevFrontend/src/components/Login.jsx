import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(true); // ✅ fixed: was "" (falsy)
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        { emailId, password },
        { withCredentials: true }
      );
      dispatch(addUser(res.data));
      navigate("/");
    } catch (err) {
      setError(err?.response?.data || "Invalid credentials. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        { firstName, lastName, emailId, password },
        { withCredentials: true }
      );
      dispatch(addUser(res.data.data));
      navigate("/");
    } catch (err) {
      setError(err?.response?.data || "Sign up failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh] px-4">
      <div className="w-full max-w-sm">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold tracking-tight">DevTinder</h1>
          <p className="text-gray-400 mt-2 text-sm">
            {isLoginForm ? "Welcome back" : "Create your account"}
          </p>
        </div>

        {/* Card */}
        <div className="bg-[#111] border border-[#222] rounded-2xl p-8">
          <h2 className="text-xl font-semibold mb-6">
            {isLoginForm ? "Sign In" : "Sign Up"}
          </h2>

          <div className="space-y-4">
            {!isLoginForm && (
              <>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">First Name</label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="John"
                    className="w-full bg-[#1a1a1a] border border-[#333] rounded-lg px-4 py-2.5 text-white placeholder-gray-600 focus:outline-none focus:border-white transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Last Name</label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Doe"
                    className="w-full bg-[#1a1a1a] border border-[#333] rounded-lg px-4 py-2.5 text-white placeholder-gray-600 focus:outline-none focus:border-white transition-colors"
                  />
                </div>
              </>
            )}

            <div>
              <label className="block text-sm text-gray-400 mb-1">Email</label>
              <input
                type="email"
                value={emailId}
                onChange={(e) => setEmailId(e.target.value)}
                placeholder="john@example.com"
                className="w-full bg-[#1a1a1a] border border-[#333] rounded-lg px-4 py-2.5 text-white placeholder-gray-600 focus:outline-none focus:border-white transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-[#1a1a1a] border border-[#333] rounded-lg px-4 py-2.5 text-white placeholder-gray-600 focus:outline-none focus:border-white transition-colors"
              />
            </div>

            {error && (
              <p className="text-red-400 text-sm">{error}</p>
            )}

            <button
              onClick={isLoginForm ? handleLogin : handleSignUp}
              disabled={loading}
              className="w-full bg-white text-black font-semibold py-2.5 rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-2"
            >
              {loading ? "Please wait..." : isLoginForm ? "Sign In" : "Create Account"}
            </button>
          </div>

          <div className="mt-6 text-center">
            <button
              onClick={() => {
                setIsLoginForm((v) => !v);
                setError("");
              }}
              className="text-gray-400 text-sm hover:text-white transition-colors"
            >
              {isLoginForm
                ? "Don't have an account? Sign up"
                : "Already have an account? Sign in"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
