import Body from "./Body";
import NavBar from "./NavBar";
import Login from "./Login";
import Profile from "./Profile";
import { Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Body />}>
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </>
  );
};
export default App;
