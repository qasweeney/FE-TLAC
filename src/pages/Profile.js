import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useUser } from "../contexts/UserContext";
import "./profile.css";
const apiUrl = process.env.REACT_APP_API_URL;

function Profile() {
  const { userType, userId } = useUser();
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [isEditingBio, setIsEditingBio] = useState(false);
  const [isEditingProfilePic, setIsEditingProfilePic] = useState(false);

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

  const handleBioChange = (e) => {
    setProfileData((prev) => ({
      ...prev,
      bio: e.target.value,
    }));
  };

  const handleProfilePicChange = (e) => {
    setProfileData((prev) => ({
      ...prev,
      profilePic: e.target.value,
    }));
  };

  const updateProfile = async (field) => {
    let body;
    if (field === "bio") {
      body = JSON.stringify({
        Bio: data.bio,
        ProfilePic: null,
      });
    } else if (field === "profilePic") {
      body = JSON.stringify({
        Bio: null,
        ProfilePic: data.profilePic,
      });
    }
    try {
      await fetch(`${apiUrl}trainers/${userId}/profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: body,
      });
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile.");
    } finally {
      field === "bio" ? setIsEditingBio(false) : setIsEditingProfilePic(false);
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

  return (
    <div className="profile-wrapper">
      <Navbar />
      <div className="profile">
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
            <div className="profile-pic-section">
              <h2>Profile Picture</h2>
              {!isEditingProfilePic ? (
                <div>
                  <img src={data.profilePic} alt="Profile" />
                  <br />
                  <button onClick={() => setIsEditingProfilePic(true)}>
                    Edit
                  </button>
                </div>
              ) : (
                <div>
                  <input
                    type="url"
                    value={data.profilePic}
                    onChange={handleProfilePicChange}
                    placeholder="Enter new profile picture URL"
                  />
                  <button onClick={() => updateProfile("profilePic")}>
                    Save
                  </button>
                  <button onClick={() => setIsEditingProfilePic(false)}>
                    Cancel
                  </button>
                </div>
              )}
            </div>

            <div className="bio-section">
              <h2>Bio</h2>
              {!isEditingBio ? (
                <div>
                  <p>{data.bio || "No bio available."}</p>
                  <button onClick={() => setIsEditingBio(true)}>Edit</button>
                </div>
              ) : (
                <div>
                  <textarea
                    value={data.bio}
                    onChange={handleBioChange}
                    rows="5"
                    placeholder="Enter new bio"
                  ></textarea>
                  <button onClick={() => updateProfile("bio")}>Save</button>
                  <button onClick={() => setIsEditingBio(false)}>Cancel</button>
                </div>
              )}
            </div>
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
    </div>
  );
}

export default Profile;
