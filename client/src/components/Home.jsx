import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    /*     fetch("http://localhost:3000/get")
      .then((response) => response.json())
      .then((data) => {
        setData(data.users);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      }); */

    axios
      .get("http://localhost:3000/get")
      .then((response) => {
        setData(response.data.users);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, []);

  console.log(data);

  // const handleEdit = (id) => {
  //   console.log(id);
  //   // Redirect to the update page with the user ID
  //   // navigate(`/update?id=${id}`);
  // };

  const handleEdit = (user) => {
    // console.log(user);
    // Redirect to the update page with the user Info
    navigate(`/update`, { state: { user } });
  };

  const handleDelete = (id) => {
    console.log(id);
    axios
      .delete(`http://localhost:3000/delete/${id}`)
      .then((response) => {
        console.log("User deleted successfully:", response.data);
        // Remove the deleted user from the state
        setData(data.filter((user) => user._id !== id));
      })
      .catch((error) => {
        console.error("Error deleting user:", error);
      });
  };

  return (
    <div>
      <table>
        <caption>Crud Operation</caption>
        <thead>
          <tr>
            <td>Name</td>
            <td>Email</td>
            <td>Phone</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          {data.map((user, index) => (
            <tr key={index}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              {/* <td>
                <button onClick={() => handleEdit(user._id)}>Edit</button>
                <button onClick={() => handleDelete(user._id)}>Delete</button>
              </td> */}
              <td>
                <button onClick={() => handleEdit(user)}>Edit</button>
                <button onClick={() => handleDelete(user._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
