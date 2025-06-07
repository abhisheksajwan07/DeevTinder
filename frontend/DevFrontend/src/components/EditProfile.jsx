import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import UserCard from "./UserCard";
import { BASE_URL } from "../utils/constants";
import { addUser } from "../utils/userSlice";
import axios from "axios";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl || "");
  const [age, setAge] = useState(user.age  || "");
  const [gender, setGender] = useState(user.gender || "");
  const [about, setAbout] = useState(user.about || "");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const [showToast, setShowToast] = useState(false);

  const saveProfile = async () => {
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        { firstName, lastName, photoUrl, age, gender, about },
        { withCredentials: true }
      );
      console.log(res);
      dispatch(addUser(res?.data?.data));
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    } catch (err) {
      setError(err.response.data);
    }
  };
  return (
    <>
      <div className="flex justify-center my-10 pb-20 ">
        <div className="flex justify-center  overflow-y-auto ">
          <div className="flex justify-center mx-10">
            <div className="card bg-base-300 w-96 shadow-xl">
              <div className="card-body">
                <h2 className="card-title justify-center">Edit Profile</h2>

                <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text  pb-1">First Name:</span>
                  </div>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => {
                      setFirstName(e.target.value);
                    }}
                    className="input input-bordered w-full border-none max-w-xs"
                  />
                </label>

                <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text  pb-1">Last Name:</span>
                  </div>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => {
                      setLastName(e.target.value);
                    }}
                    className="input input-bordered w-full border-none max-w-xs"
                  />
                </label>

                <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text pb-1">Photo URL:</span>
                  </div>
                  <input
                    value={photoUrl}
                    onChange={(e) => {
                      setPhotoUrl(e.target.value);
                    }}
                    type="text"
                    className="input input-bordered border-none w-full max-w-xs"
                  />
                </label>

                <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text pb-1">Age:</span>
                  </div>
                  <input
                    type="text"
                    value={age}
                    onChange={(e) => {
                      setAge(e.target.value);
                    }}
                    className="input input-bordered border-none w-full max-w-xs"
                  />
                </label>

                <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text pb-1">Gender:</span>
                  </div>
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className="input input-bordered w-full max-w-xs"
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="others">Other</option>
                  </select>
                </label>

                <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text pb-1">About:</span>
                  </div>
                  <input
                    type="text"
                    value={about}
                    onChange={(e) => {
                      setAbout(e.target.value);
                    }}
                    className="input input-bordered  border-none w-full max-w-xs"
                  />
                </label>
                <p className="text-red-500">{error}</p>
                <div className="card-actions justify-center m-2">
                  <button className="btn btn-primary" onClick={saveProfile}>
                    Save Profile
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <UserCard
          user={{ firstName, lastName, photoUrl, age, gender, about }}
        />
      </div>
      {showToast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>Profile Saved successfully.</span>
          </div>
        </div>
      )}
    </>
  );
};

export default EditProfile;
