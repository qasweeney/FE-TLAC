import React, { useState } from "react";
const apiUrl = process.env.REACT_APP_API_URL;

const DateRangeForm = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [data, setData] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      const raw = JSON.stringify({
        StartDate: startDate,
        EndDate: endDate,
      });

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      const response = await fetch(`${apiUrl}admins/kpi`, requestOptions)
        .then((response) => response.json())
        .catch((error) => console.error(error));

      setData(response);
    } catch (error) {
      setData(null);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="startDate">Start Date:</label>
          <input
            type="date"
            id="startDate"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="endDate">End Date:</label>
          <input
            type="date"
            id="endDate"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
      {data && (
        <div>
          <p>Total Revenue: ${data.totalRevenue}</p>
          <p>
            Total Profit (10% of revenue): $
            {Math.ceil(data.totalRevenue * 0.1 * 100) / 100}
          </p>
          <p>Total Sessions: {data.totalSessions}</p>
          <p>Active Members: {data.activeMembers}</p>
          <p>Active Trainers: {data.activeTrainers}</p>
        </div>
      )}
    </div>
  );
};

export default DateRangeForm;
