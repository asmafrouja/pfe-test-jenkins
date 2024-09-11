import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUserDetails } from "../store/userSlice";
import { toast } from "react-toastify";
import SummaryApi from "../common";
import imageTobase64 from "../helpers/imageTobase64";
import ProfileAdress from "./ProfileAdress";

export default function ProfileDetails() {
  const user = useSelector((state) => state.user.user);
  const [newData, setNewData] = useState(false);
  const dispatch = useDispatch();

  const [data, setData] = useState({
    name: "",
    email: "",
    profilePic: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    if (user) {
      setData({
        name: user.name || "",
        email: user.email || "",
        profilePic: user.profilePic || "",
      });
    }
  }, [user]);

  const checkForChanges = (updatedData) => {
    const isFormSameAsInitial = Object.keys(data).every(
      (key) => updatedData[key] === (user ? user[key] : "")
    );
    setNewData(!isFormSameAsInitial);
  };

  const handleUploadPic = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const imagePic = await imageTobase64(file);
        const updatedData = {
          ...data,
          profilePic: imagePic,
        };
        setData(updatedData);
        checkForChanges(updatedData);
      } catch (error) {
        toast.error("Failed to upload image.");
      }
    }
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    const updatedData = {
      ...data,
      [name]: value,
    };
    setData(updatedData);
    checkForChanges(updatedData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (data.newPassword !== data.confirmPassword) {
      toast.error("New password and confirm password do not match.");
      return;
    }

    try {
      const response = await fetch(SummaryApi.updateProfile.url, {
        method: SummaryApi.updateProfile.method,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user?._id,
          name: data.name,
          profilePic: data.profilePic,
          currentPassword: data.currentPassword,
          newPassword: data.newPassword,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Network response was not ok");
      }

      const result = await response.json();

      if (result.success) {
        toast.success(result.message);
        dispatch(setUserDetails(result.data));
        setNewData(false);
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile. Please try again.");
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="grid lg:grid-cols-12 grid-cols-1 lg:gap-4 gap-y-4">
      <section id="user-profile" className="col-span-4">
        <div className="p-6 bg-white rounded-lg shadow-md">
          <h1 className="lg:text-2xl mb-6 text-lg font-semibold text-left">
            Mes coordonnées
          </h1>
          <div className="w-24 h-24 mx-auto relative overflow-hidden rounded-full">
            <img
              src={data.profilePic || "defaultProfilePic.png"}
              alt="Profile Pic"
            />
            <form>
              <label>
                <div className="text-xs bg-opacity-80 bg-slate-200 pb-4 pt-2 cursor-pointer text-center absolute bottom-0 w-full">
                  Upload Photo
                </div>
                <input
                  type="file"
                  className="hidden"
                  onChange={handleUploadPic}
                />
              </label>
            </form>
          </div>

          <form className="pt-8 flex flex-col gap-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Nom:
              </label>
              <input
                placeholder="Enter name"
                name="name"
                value={data.name}
                onChange={handleOnChange}
                required
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-green-600 focus:border-green-600"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email:
              </label>
              <input
                disabled
                type="email"
                placeholder="Enter email"
                name="email"
                value={data.email}
                onChange={handleOnChange}
                required
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-green-600 focus:border-green-600"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Current Password:
              </label>
              <div className="relative">
                <input
                  type={showCurrentPassword ? "text" : "password"}
                  placeholder="Enter current password"
                  name="currentPassword"
                  value={data.currentPassword}
                  onChange={handleOnChange}
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-green-600 focus:border-green-600"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 px-3 py-2 text-sm text-gray-600"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                >
                  {showCurrentPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                New Password:
              </label>
              <div className="relative">
                <input
                  type={showNewPassword ? "text" : "password"}
                  placeholder="Enter new password"
                  name="newPassword"
                  value={data.newPassword}
                  onChange={handleOnChange}
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-green-600 focus:border-green-600"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 px-3 py-2 text-sm text-gray-600"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                >
                  {showNewPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Confirm New Password:
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm new password"
                  name="confirmPassword"
                  value={data.confirmPassword}
                  onChange={handleOnChange}
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-green-600 focus:border-green-600"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 px-3 py-2 text-sm text-gray-600"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={!newData}
              className={`bg-green-600 text-white px-6 py-2 w-full max-w-[150px] rounded-full mx-auto block mt-6 transition-all ${
                newData
                  ? "hover:bg-green-700 hover:scale-110"
                  : "opacity-50 cursor-not-allowed"
              }`}
            >
              Modifier
            </button>
          </form>
        </div>
      </section>
      <ProfileAdress user={user} className="lg:col-span-8 col-span-1" />
    </div>
  );
}
