import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { UserProvider, useUser } from "../contexts/UserContext";

function Home() {
  const navigate = useNavigate();
  const { userType } = useUser();
  return (
    <div>
      <Navbar />
    </div>
  );
}

export default Home;
