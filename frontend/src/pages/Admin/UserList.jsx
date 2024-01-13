import { useSelector } from "react-redux";
import { FaTrash, FaEdit, FaCheck, FaTimes } from "react-icons/fa";
import Loader from "../../components/Loader";
import { toast } from "react-toastify";
import {
  useGetUserQuery,
  useDeleteUserMutation,
  useUpdateUserMutation,
} from "../../redux/api/userApiSlice";
import { useEffect, useState } from "react";
import Message from "../../components/Message";
import AdminMenu from "./AdminMenu";

const UserList = () => {
  const { data: users, refetch, isLoading, error } = useGetUserQuery();
  const [deleteUser] = useDeleteUserMutation();
  const [updateUser] = useUpdateUserMutation();

  const [editTableUserId, setEditTableUserId] = useState(null);
  const [editTableUserUsername, setEditTableUserUsername] = useState("");
  const [editTableUserEmail, setEditTableUserEmail] = useState("");

  useEffect(() => {
    refetch();
  }, [refetch]);

  const deleteHandler = async (id) => {
    if (window.confirm("are you Sure ?")) {
      try {
        await deleteUser(id);
        refetch()
      } catch (error) {
        toast.error(error.data.message || error.error);
      }
    }
  };

  const toggleEdit = (id, username, email) => {
    setEditTableUserId(id);
    setEditTableUserUsername(username);
    setEditTableUserEmail(email);
  };

  const updateHandler = async (id) => {
    try {
      await updateUser({
        userId: id,
        username: editTableUserUsername,
        email: editTableUserEmail,
      });
      setEditTableUserId(null);
      refetch();
      toast.success("Update Successfully")
    } catch (error) {
      toast.error(error.data.message || error.error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4 ml-24">Users</h1>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="error">
          {error?.data?.message || error.message}
        </Message>
      ) : (
        <div className="flex flex-wrap md:flex-col">
          {/* admin menu */}
          <AdminMenu />
          <table className="w-full md:w-4/5 mx-auto">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left">ID</th>
                <th className="px-4 py-2 text-left">Name</th>
                <th className="px-4 py-2 text-left">Email</th>
                <th className="px-4 py-2 text-left">Admin</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => {
                return (
                  <tr key={user._id}>
                    <td className="px-4 py-2">{user._id}</td>
                    <td className="px-4 py-2">
                      {editTableUserId === user._id ? (
                        <div className="flex items-center">
                          <input
                            type="text"
                            value={editTableUserUsername}
                            onChange={(e) =>
                              setEditTableUserUsername(e.target.value)
                            }
                            className="w-full p-2 border rounded-lg"
                          />
                          <button
                            onClick={() => updateHandler(user._id)}
                            className="ml-2 bg-blue-500 text-black py-2 px-4 rounded-lg"
                          >
                            <FaCheck />
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center">
                          {user.username}{" "}
                          <button
                            onClick={() =>
                              toggleEdit(user._id, user.username, user.email)
                            }
                          >
                            <FaEdit className="ml-[1rem]" />
                          </button>
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-2">
                      {editTableUserId === user._id ? (
                        <div className="flex items-center">
                          <input
                            type="text"
                            value={editTableUserEmail}
                            onChange={(e) =>
                              setEditTableUserEmail(e.target.value)
                            }
                            className="w-full p-2 border rounded-lg"
                          />
                          <button
                            onChange={() => updateHandler(user._id)}
                            className="ml-2 bg-blue-500 text-black py-2 px-4 rounded-lg"
                          >
                            <FaCheck />
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center">
                          {user.email}{" "}
                          <button
                            onClick={() =>
                              toggleEdit(user._id, user.username, user.email)
                            }
                          >
                            <FaEdit className="ml-[1rem]" />
                          </button>
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-2">
                      {user.isAdmin ? (
                        <FaCheck style={{ color: "green" }} />
                      ) : (
                        <FaCheck style={{ color: "red" }} />
                      )}
                    </td>
                    <td className="px-4 py-2">
                      {!user.isAdmin && (
                        <div className="flex">
                          <button
                            onClick={() => deleteHandler(user._id)}
                            className="bg-red-500 hover:bg-red-700 text-black font-bold py-2 px-4 rounded"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UserList;
