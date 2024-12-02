import { useEffect, useState } from "react";

const apiUrl = process.env.REACT_APP_API_URL;
function TrainerProfileGlance({ trainer }) {
  const [avg, setAvg] = useState();

  const fetchAvg = async () => {
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    setAvg(
      await fetch(
        `${apiUrl}trainers/${trainer.trainerID}/average-rating`,
        requestOptions
      )
        .then((response) => response.json())
        .catch((error) => console.error(error))
    );
  };
  useEffect(() => {
    fetchAvg();
  }, []);
  return (
    <div>
      <img
        src={trainer.profilePic}
        alt="Profile"
        style={{
          width: "150px",
          height: "150px",
          borderRadius: "50%",
        }}
      />
      <p>Bio: {trainer.bio}</p>
      <p>Average Rating: {avg}</p>
    </div>
  );
}

export default TrainerProfileGlance;
