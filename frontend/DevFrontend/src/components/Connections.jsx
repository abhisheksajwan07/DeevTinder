import { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { addConnections } from "../utils/connectionSlice";
import { Link } from "react-router-dom";

const FALLBACK_AVATAR =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%23222'/%3E%3Ccircle cx='50' cy='38' r='18' fill='%23555'/%3E%3Cellipse cx='50' cy='85' rx='30' ry='20' fill='%23555'/%3E%3C/svg%3E";

const Connections = () => {
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();

  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connection", {
        withCredentials: true,
      });
      dispatch(addConnections(res?.data?.data));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) return null;

  if (connections.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
        <div className="text-5xl mb-4">🤝</div>
        <h2 className="text-xl font-semibold text-white mb-2">No connections yet</h2>
        <p className="text-gray-400 text-sm max-w-xs">
          Start connecting with developers from the feed.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto py-10 px-4">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Connections</h1>
        <p className="text-gray-400 text-sm mt-1">{connections.length} connection{connections.length !== 1 ? "s" : ""}</p>
      </div>

      <div className="space-y-3">
        {connections.map((connection) => {
          const { _id, firstName, lastName, photoUrl, age, gender, about } = connection;
          return (
            <div
              key={_id}
              className="flex items-center justify-between bg-[#111] border border-[#222] rounded-xl p-4 hover:border-[#333] transition-colors"
            >
              <div className="flex items-center gap-4">
                <img
                  alt={`${firstName} ${lastName}`}
                  className="w-12 h-12 rounded-full object-cover border border-[#333]"
                  src={photoUrl || FALLBACK_AVATAR}
                />
                <div>
                  <h2 className="font-semibold text-white text-sm">{firstName} {lastName}</h2>
                  {age && gender && (
                    <p className="text-gray-500 text-xs mt-0.5">{age} · {gender}</p>
                  )}
                  {about && (
                    <p className="text-gray-400 text-xs mt-0.5 line-clamp-1 max-w-xs">{about}</p>
                  )}
                </div>
              </div>

              <Link to={`/chat/${_id}`}>
                <button className="text-xs font-medium bg-white text-black px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors">
                  Chat
                </button>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Connections;
