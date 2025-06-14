import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import axios from "axios";

import UserCard from "./UserCard";
const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const user = useSelector((store)=> store.user)

  const dispatch = useDispatch();
  const getFeed = async () => {
    if (feed) return;
    try {
      const res = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });

      // console.log("API DATA:", res.data.data);
      dispatch(addFeed(res?.data?.data));
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    getFeed();
  }, [user]);
  if(!feed) return;
  if(feed.length <= 0){
    return <h1 className="flex justify-center my-10">No User Found!!</h1>
  }
  return (
    feed && (
      <div className="flex justify-center my-10">
        <UserCard user={feed[0]} />
      </div>
    )
  );
};

export default Feed;
