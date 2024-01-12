import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";
import { setCredentials } from "../../redux/features/auth/authSlice";
import { Link } from "react-router-dom";
import { useProfileMutation } from "../../redux/api/userApiSlice";
import { useEffect, useState } from "react";

const Profile = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { userInfo } = useSelector((state) => state.auth);

  const [updateProfile, { isLoading: loadingUpdate }] = useProfileMutation();

  useEffect(() => {
    setUsername(userInfo.username);
    setEmail(userInfo.email);
  }, [userInfo.username, userInfo.email]);

  const dispatch = useDispatch();

  const submitHandler = async(e) => {
    e.preventDefault()
    if(password !== confirmPassword){
      toast.error("Password Not Match")
    } else {
      try {
        const res = await updateProfile({_id: userInfo._id, username, email, password}).unwrap()
        dispatch(setCredentials({...res}))
        toast.success("Profile Updated Successfully")
      } catch (error) {
        console.log(error)
        toast.error(error?.data?.message || error.message)
      }
    }
  }

  return (
    <div className="container mx-auto p-4 mt-[4rem]">
      <div className="flex justify-center items-center md:flex md:space-x-4">
        <div className="md:w-1/3">
          <h2 className="text-2xl font-semibold mb-4">Update Profile</h2>
          <form onSubmit={submitHandler}>
            <div className="mb-4">
              <label htmlFor="username" className="block text-black mb-2">
                Name
              </label>
              <input
                type="text"
                id="username"
                name="username"
                placeholder="Enter Username"
                className="form-input p-2 rounded-sm w-full border"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-black mb-2">
                Email
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                name="email"
                id="email"
                className="form-input p-2 rounded-sm w-full border"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-black mb-2">
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Enter Your Password"
                className="form-input p-2 rounded-sm w-full border"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="confirmpassword"
                className="block text-black mb-2"
              >
                Confirm Password
              </label>
              <input
                type="password"
                placeholder="Confirm Your Password"
                className="form-input p-2 rounded-sm w-full border"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <div className="flex justify-between">
              <button
                disabled={loadingUpdate}
                type="submit"
                className="bg-pink-500 text-black px-4 py-2 rounded cursor-pointer my-[1rem]"
              >
                {loadingUpdate ? "Updating ..." : "Update"}
              </button>
              <Link
                to="/user-orders"
                className="bg-pink-600 text-black px-4 py-2 rounded cursor-pointer my-[1rem]"
              >
                My Orders
              </Link>
            </div>
          </form>
        </div>
        {loadingUpdate && <Loader />}
      </div>
    </div>
  );
};

export default Profile;
