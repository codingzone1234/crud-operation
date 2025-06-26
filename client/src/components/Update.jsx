import React, {useState} from 'react'
import axios from "axios";
import { useLocation }  from  'react-router-dom';

const update = () => {
  const location = useLocation();
  const user = location?.state?.user;

  console.log("user from location state:",user);

  const [Name, setName]= useState(user?.name||"");
  const [Email, setEmail]= useState(user?.name||"");
  const [Phone, setPhone]= useState(user?.name||"");

  console.log(Name, Email, Phone);

  const formData ={
    name:Name,
    email:Email,
    phone:Phone,
  };

  const handleFormSubmit = async (event) => {
    event.PreventDefault();
    await axios
      .put("http://localhost:3000/put", { id: user?._id, ...formData })
      .then((response) => {
        console.log("User updated successfully:", response.data);
      })
      .catch((error) => {
        console.error("Error updating user:", error);
      });
  };
  
  
  return (
    <div>
 <form onSubmit={handleFormSubmit}>
        <label>Name</label>
        <input
          type="text"
          value={Name}
          onChange={(e) => setName(e.target.value)}
        />

        <label>Email</label>
        <input
          type="text"
          value={Email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label>Phone</label>
        <input
          type="number"
          value={Phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <button type="submit">Update</button>
      </form>
    </div>
  )
}

export default update;