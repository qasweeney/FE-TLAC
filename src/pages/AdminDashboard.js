import { useState } from "react";
import DateRangeForm from "../components/DateRangeForm";
import Navbar from "../components/Navbar";
import "./adminDashboard.css";

function AdminDashboard() {
  const [compare, setCompare] = useState(false);
  const toggleCompare = () => {
    setCompare(!compare);
  };
  return (
    <div>
      <Navbar />
      <div className="dashboard">
        <h1>KPI Dashboard</h1>
        <button onClick={toggleCompare}>Compare</button>
        <div className="form-container">
          <DateRangeForm />
          {compare && <DateRangeForm />}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
