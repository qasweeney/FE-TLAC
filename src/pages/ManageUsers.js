import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
const apiUrl = process.env.REACT_APP_API_URL;

function ManageUsers() {
  const [trainers, setTrainers] = useState([]);
  const [members, setMembers] = useState([]);
  const fetchUsers = async () => {
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    setTrainers(
      await fetch(`${apiUrl}trainers`, requestOptions)
        .then((response) => response.json())
        .catch((error) => console.error(error))
    );
    setMembers(
      await fetch(`${apiUrl}members`, requestOptions)
        .then((response) => response.json())
        .catch((error) => console.error(error))
    );
  };
  useEffect(() => {
    fetchUsers();
  }, []);
  return (
    <div>
      <Navbar />
      <h1>Manage Users</h1>
      <h2>Members:</h2>
      {members.map((member) => (
        <div key={member.memberID}>
          <p>
            {member.firstName} {member.lastName}
          </p>
        </div>
      ))}
      <h2>Trainers:</h2>
      {trainers.map((trainer) => (
        <div key={trainer.trainerID}>
          <p>
            {trainer.firstName} {trainer.lastName}
          </p>
        </div>
      ))}
    </div>
  );
}

export default ManageUsers;
