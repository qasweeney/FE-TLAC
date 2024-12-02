import { useState } from "react";
import DateRangeForm from "../components/DateRangeForm";
import Navbar from "../components/Navbar";

function AdminDashboard() {
  const [compare, setCompare] = useState(false);
  const toggleCompare = () => {
    setCompare(!compare);
  };
  return (
    <div>
      <Navbar />
      <button onClick={toggleCompare}>Compare</button>
      <div>
        <DateRangeForm />
        {compare && <DateRangeForm />}
      </div>
    </div>
  );
}

export default AdminDashboard;
