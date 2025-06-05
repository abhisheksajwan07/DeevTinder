import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
const Login = () => {
  const [emailId, setEmailId] = useState("abhisheksajwan20@gmail.com");
  const [password, setPassword] = useState("123456Aa@");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        {
          emailId,
          password,
        },
        {
          withCredentials: true,
        }
      );
      console.log(res.data);
      dispatch(addUser(res.data));
      return navigate("/");
    } catch (err) {
      setError(err?.response?.data|| "Something went wrong");
      console.error(err);
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
              className="input my-1 max-w-xs border-none"
              placeholder="Type emailId here"
              value={emailId}
              onChange={(e) => setEmailId(e.target.value)}
            />

            <legend className="fieldset-legend my-2">Password:</legend>
            <input
              type="text"
              className="input my-1 max-w-xs border-none"
              placeholder="*******"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </fieldset>
          <p className="text-red-500 mb-1">{error} </p>
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
