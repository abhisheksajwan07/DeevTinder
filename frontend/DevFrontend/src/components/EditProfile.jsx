import { useState } from "react";
import { useDispatch } from "react-redux";
import UserCard from "./UserCard";
import { BASE_URL } from "../utils/constants";
import { addUser } from "../utils/userSlice";
import axios from "axios";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl || "");
  const [age, setAge] = useState(user.age || "");
  const [gender, setGender] = useState(user.gender || "");
  const [about, setAbout] = useState(user.about || "");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const dispatch = useDispatch();

  const saveProfile = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        { firstName, lastName, photoUrl, age, gender, about },
        { withCredentials: true }
      );
      dispatch(addUser(res?.data?.data));
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    } catch (err) {
      setError(err?.response?.data || "Failed to save profile.");
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full bg-[#1a1a1a] border border-[#333] rounded-lg px-4 py-2.5 text-white placeholder-gray-600 focus:outline-none focus:border-white transition-colors text-sm";
  const labelClass = "block text-sm text-gray-400 mb-1";

  return (
    <div className="max-w-5xl mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold text-white mb-8">Edit Profile</h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Form */}
        <div className="flex-1 bg-[#111] border border-[#222] rounded-2xl p-8">
          <div className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>First Name</label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="John"
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Last Name</label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Doe"
                  className={inputClass}
                />
              </div>
            </div>

            <div>
              <label className={labelClass}>Photo URL</label>
              <input
                type="text"
                value={photoUrl}
                onChange={(e) => setPhotoUrl(e.target.value)}
                placeholder="https://example.com/photo.jpg"
                className={inputClass}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Age</label>
                <input
                  type="number"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  placeholder="25"
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Gender</label>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className={inputClass}
                >
                  <option value="">Select</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="others">Other</option>
                </select>
              </div>
            </div>

            <div>
              <label className={labelClass}>About</label>
              <textarea
                value={about}
                onChange={(e) => setAbout(e.target.value)}
                placeholder="Tell other developers about yourself..."
                rows={3}
                className={`${inputClass} resize-none`}
              />
            </div>

            {error && <p className="text-red-400 text-sm">{error}</p>}

            <button
              onClick={saveProfile}
              disabled={loading}
              className="w-full bg-white text-black font-semibold py-2.5 rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Saving..." : "Save Profile"}
            </button>
          </div>
        </div>

        {/* Preview */}
        <div className="flex flex-col items-center">
          <p className="text-gray-500 text-xs uppercase tracking-widest mb-4 font-medium">Preview</p>
          <UserCard user={{ firstName, lastName, photoUrl, age, gender, about }} />
        </div>
      </div>

      {/* Toast */}
      {showToast && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 bg-white text-black text-sm font-medium px-6 py-3 rounded-full shadow-lg z-50">
          ✓ Profile saved successfully
        </div>
      )}
    </div>
  );
};

export default EditProfile;
