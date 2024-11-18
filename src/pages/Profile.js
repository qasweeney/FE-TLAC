import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useUser } from "../contexts/UserContext";
const apiUrl = process.env.REACT_APP_API_URL;

function Profile() {
  const { userType, userId } = useUser();
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProfileData = async () => {
    let endpoint = "";

    if (userType === "Admin") {
      endpoint = `${apiUrl}admins/${userId}`;
    } else if (userType === "Trainer") {
      endpoint = `${apiUrl}trainers/${userId}`;
    } else if (userType === "Member") {
      endpoint = `${apiUrl}members/${userId}`;
    } else {
      setError("Unknown user type.");
      return;
    }

    try {
      const response = await fetch(endpoint, {
        method: "GET",
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        setProfileData(data);
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Failed to fetch profile data.");
      }
    } catch (err) {
      setError("An error occurred while fetching profile data.");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchProfileData();
  }, [userType]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const data = profileData;
  console.log(userType);

  return (
    <div>
      <Navbar />

      <h1>Profile</h1>
      <p>
        <strong>Email:</strong> {profileData.email}
      </p>
      <p>
        <strong>Full Name:</strong> {`${data.firstName} ${data.lastName}`}
      </p>
      {userType === "Member" && (
        <p>
          <strong>Phone Number:</strong> {profileData.phone}
        </p>
      )}
      {userType === "Admin" && (
        <p>Display other necessary admin data here (TBD)</p>
      )}
      {userType === "Trainer" && (
        <div>
          <p>
            <strong>Registration Date:</strong> {data.registrationDate}
          </p>
          <p>
            <strong>Session Price:</strong> ${data.sessionPrice}
          </p>
          <p>
            <strong>Phone Number:</strong> {data.phone}
          </p>
        </div>
      )}
    </div>
  );
}

export default Profile;
