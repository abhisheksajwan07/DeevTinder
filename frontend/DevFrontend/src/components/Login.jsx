import { useState } from "react";
import axios from "axios";
const Login = () => {
  const [emailId, setEmailId] = useState("abhisheksajwan20@gmail.com");
  const [password, setPassword] = useState("123456Aa@");
  const handleLogin = async () => {
    try {
      const res = await axios.post(
        "http://localhost:3000/login",
        {
          emailId,
          password,
        },
        {
          withCredentials: true,
        }
      );
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex justify-center my-20">
      <div className="card bg-base-300 w-96 shadow-sm">
        <div className="card-body">
          <h2 className="card-title justify-center text-2xl">Login</h2>
          <fieldset className="fieldset">
            <legend className="fieldset-legend my-2">EmailId:</legend>
            <input
              type="text"
              className="input my-2 max-w-xs border-none"
              placeholder="Type emailId here"
              value={emailId}
              onChange={(e) => setEmailId(e.target.value)}
            />

            <legend className="fieldset-legend my-2">Password:</legend>
            <input
              type="text"
              className="input my-2 max-w-xs border-none"
              placeholder="*******"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </fieldset>
          <div className="card-actions justify-center">
            <button
              className="btn btn-primary text-center"
              onClick={handleLogin}
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
