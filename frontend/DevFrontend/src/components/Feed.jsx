import { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import axios from "axios";
import UserCard from "./UserCard";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();

  const getFeed = async () => {
    if (feed) return;
    try {
      const res = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(res?.data?.data));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getFeed();
  }, [user]);

  if (!feed) return null;

  if (feed.length <= 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
        <div className="text-5xl mb-4">👋</div>
        <h2 className="text-xl font-semibold text-white mb-2">You're all caught up!</h2>
        <p className="text-gray-400 text-sm max-w-xs">
          No more developers to discover right now. Check back later.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center py-12 px-4">
      <p className="text-gray-500 text-xs uppercase tracking-widest mb-6 font-medium">
        Discover Developers
      </p>
      <UserCard user={feed[0]} />
      <p className="text-gray-600 text-xs mt-4">
        {feed.length} developer{feed.length !== 1 ? "s" : ""} remaining
      </p>
    </div>
  );
};

export default Feed;
