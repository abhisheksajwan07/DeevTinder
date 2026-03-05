import { useDispatch } from "react-redux";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { removeUserFromFeed } from "../utils/feedSlice";

const FALLBACK_AVATAR =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%23222'/%3E%3Ccircle cx='50' cy='38' r='18' fill='%23555'/%3E%3Cellipse cx='50' cy='85' rx='30' ry='20' fill='%23555'/%3E%3C/svg%3E";

const UserCard = ({ user }) => {
  const { _id, firstName, lastName, photoUrl, age, gender, about } = user;
  const dispatch = useDispatch();

  const handleSendRequest = async (status, userId) => {
    try {
      await axios.post(
        BASE_URL + "/request/send/" + status + "/" + userId,
        {},
        { withCredentials: true }
      );
      dispatch(removeUserFromFeed(userId));
    } catch (err) {
      console.error(err?.response?.data || err.message);
    }
  };

  return (
    <div className="bg-[#111] border border-[#222] rounded-2xl overflow-hidden w-80 shadow-lg">
      {/* Photo */}
      <div className="relative">
        <img
          className="w-full h-72 object-cover"
          src={photoUrl || FALLBACK_AVATAR}
          alt={`${firstName} ${lastName}`}
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      </div>

      {/* Info */}
      <div className="p-5">
        <h2 className="text-lg font-semibold text-white">
          {firstName} {lastName}
        </h2>

        {age && gender && (
          <p className="text-gray-400 text-sm mt-0.5">
            {age} · {gender.charAt(0).toUpperCase() + gender.slice(1)}
          </p>
        )}

        {about && (
          <p className="text-gray-300 text-sm mt-3 leading-relaxed line-clamp-3">
            {about}
          </p>
        )}

        {/* Actions */}
        <div className="flex gap-3 mt-5">
          <button
            onClick={() => handleSendRequest("ignored", _id)}
            className="flex-1 py-2.5 rounded-lg border border-[#333] text-gray-300 text-sm font-medium hover:border-white hover:text-white transition-colors"
          >
            Pass
          </button>
          <button
            onClick={() => handleSendRequest("interested", _id)}
            className="flex-1 py-2.5 rounded-lg bg-white text-black text-sm font-medium hover:bg-gray-100 transition-colors"
          >
            Connect
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
