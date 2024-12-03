import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import "./manageUsers.css";
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

  const approveTrainer = async (id) => {
    const requestOptions = {
      method: "PUT",
      redirect: "follow",
      credentials: "include",
    };

    await fetch(`${apiUrl}admins/applications/approve/${id}`, requestOptions)
      .then((response) => response.json())
      .catch((error) => console.error(error));

    fetchUsers();
  };

  const banTrainer = async (id) => {
    const requestOptions = {
      method: "PUT",
      redirect: "follow",
      credentials: "include",
    };

    await fetch(`${apiUrl}admins/applications/deny/${id}`, requestOptions)
      .then((response) => response.json())
      .catch((error) => console.error(error));

    fetchUsers();
  };

  const toggleBan = async (type, id) => {
    const myHeaders = new Headers();

    const requestOptions = {
      method: "PUT",
      headers: myHeaders,
      redirect: "follow",
      credentials: "include",
    };

    var success = await fetch(
      `${apiUrl}admins/ban${type}/${id}`,
      requestOptions
    )
      .then((response) => response.json())
      .catch((error) => console.error(error));

    if (success) {
      alert("Success");
      fetchUsers();
    } else {
      alert("An error occurred");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="manage-users">
        <h1>Manage Users</h1>
        <h2>Members:</h2>
        <div className="user-list">
          {members.map((member) => {
            if (!member.banned) {
              return (
                <div className="user-card" key={member.memberID}>
                  <p>
                    {member.firstName} {member.lastName}
                  </p>
                  <button
                    className="bad"
                    onClick={() => toggleBan("member", member.memberID)}
                  >
                    Ban
                  </button>
                </div>
              );
            }
          })}
        </div>
        <h2>Trainers:</h2>
        <div className="user-list">
          {trainers.map((trainer) => {
            if (trainer.isActive && !trainer.banned) {
              return (
                <div className="user-card" key={trainer.trainerID}>
                  <p>
                    {trainer.firstName} {trainer.lastName}
                  </p>
                  <button
                    className="bad"
                    onClick={() => toggleBan("trainer", trainer.trainerID)}
                  >
                    Ban
                  </button>
                </div>
              );
            }
          })}
        </div>
        <h2>Pending Trainers</h2>
        <div className="user-list">
          {trainers.map((trainer) => {
            if (!trainer.isActive && !trainer.banned) {
              return (
                <div className="user-card" key={trainer.trainerID}>
                  <p>
                    {trainer.firstName} {trainer.lastName}
                  </p>
                  <p>{trainer.email}</p>
                  <p>{trainer.phone}</p>
                  <button
                    className="approve"
                    onClick={() => approveTrainer(trainer.trainerID)}
                  >
                    Approve
                  </button>
                  <button
                    className="bad"
                    onClick={() => toggleBan("trainer", trainer.trainerID)}
                  >
                    Deny
                  </button>
                </div>
              );
            }
          })}
        </div>
        <h2>Banned Members:</h2>
        <div className="user-list">
          {members.map((member) => {
            if (member.banned) {
              return (
                <div className="user-card" key={member.memberID}>
                  <p>
                    {member.firstName} {member.lastName}
                  </p>
                  <button
                    className="bad"
                    onClick={() => toggleBan("member", member.memberID)}
                  >
                    Unban
                  </button>
                </div>
              );
            }
          })}
        </div>
        <h2>Banned Trainers</h2>
        <div className="user-list">
          {trainers.map((trainer) => {
            if (trainer.banned) {
              return (
                <div className="user-card" key={trainer.trainerID}>
                  <p>
                    {trainer.firstName} {trainer.lastName}
                  </p>
                  <p>{trainer.email}</p>
                  <p>{trainer.phone}</p>
                  <button
                    className="bad"
                    onClick={() => toggleBan("trainer", trainer.trainerID)}
                  >
                    Unban
                  </button>
                </div>
              );
            }
          })}
        </div>
      </div>
    </div>
  );
}

export default ManageUsers;
