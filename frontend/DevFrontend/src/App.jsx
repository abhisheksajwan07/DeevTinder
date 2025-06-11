import Body from "./components/Body";
import Connections from "./components/Connections";
import Requests from "./components/Requests"
import Feed from "./components/Feed";
import Login from "./components/Login";

import Profile from "./components/Profile";
import { Route, Routes } from "react-router-dom";
import Premium from "./components/Premium";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Body />}>
          <Route path="/" element={<Feed />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/connections" element={<Connections/>} />
          <Route path="/requests" element={<Requests/>} />
          <Route path="/premium" element={<Premium/>} />
        </Route>
      </Routes>
    </>
  );
};
export default App;
