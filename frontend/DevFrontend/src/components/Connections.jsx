import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { addConnections } from "../utils/connectionSlice";

const Connections = () => {
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();
  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connection", {
        withCredentials: true,
      });
      console.log(res.data.data);
      dispatch(addConnections(res?.data?.data));
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    fetchConnections();
  }, []);
  if (!connections) return;
  if (connections.length === 0) return <h1>No connection found</h1>;
  return (
    <div className=" max-h-[500px] overflow-y-auto  my-10">
      <h1 className="text-2xl text-bold text-white text-center">Connections</h1>
      {connections.map((connection) => {
        const { firstName, lastName, photoUrl, age, gender, about } =
          connection;
        return (
          <div className="flex max-w-[40vw] justify-between m-4 p-4 rounded-lg bg-base-300  mx-auto ">
            <div>
              <img
                alt="photo"
                className="w-20 ml-10 h-20 rounded-full"
                src={photoUrl}
              />
            </div>
            <div className="text-left mr-10">
              <h2 className="font-bold text-xl">{firstName + "" + lastName}</h2>
              <p>{age + "," + gender}</p>
              <p>{about}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Connections;
