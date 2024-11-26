import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { UserProvider, useUser } from "../contexts/UserContext";
import "./Home.css";
function Home() {
  const navigate = useNavigate();
  const { userType } = useUser();
  return (
    <div className="home-container">
     
      <Navbar />

    
      <div className="home-main">
        <h1>Welcome to Train Like A Champion</h1>
        <p>Tuscaloosa's #1 Fitness Destination</p>
      </div>

     
      <div className="home-bottom">
       
        <div className="image-container">
          <img           
            src="https://th.bing.com/th/id/OIP.5tkwNz0eax-XBmNPe_1H9gAAAA?w=305&h=182&c=7&r=0&o=5&dpr=1.3&pid=1.7" 
            alt="Gym Facility"
            className="gym-image"
          />
        </div>
       

       
        <div className="text-container">
          <h2>The Facility</h2>
          <p>
          TLAC offers top-notch cardio equipment, weights, and strength machines for all fitness levels. With personalized training programs and expert guidance, we cater to your specific goals. Whether you're building strength or improving endurance, our trainers are here to support you every step of the way.
          </p>
        </div>
      </div>
    </div>
  );
}


export default Home;
