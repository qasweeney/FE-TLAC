import { useState } from "react";
import "./addRecurringForm.css";

function AddRecurringForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    dayOfWeek: "",
    startTime: "",
    price: "",
  });

  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.dayOfWeek || !formData.startTime || !formData.price) {
      alert("All fields are required!");
      return;
    }

    if (onSubmit) {
      onSubmit(formData);
    }

    // Clear the form after submission
    setFormData({ dayOfWeek: "", startTime: "", price: "" });
  };

  return (
    <div className="add-recurring-form">
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="dayOfWeek">Day of the Week:</label>
          <select
            id="dayOfWeek"
            name="dayOfWeek"
            value={formData.dayOfWeek}
            onChange={handleInputChange}
          >
            <option value="" disabled>
              Select a day
            </option>
            {daysOfWeek.map((day) => (
              <option key={day} value={day}>
                {day}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="startTime">Start Time:</label>
          <input
            id="startTime"
            name="startTime"
            type="time"
            value={formData.startTime}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <label htmlFor="price">Price:</label>
          <input
            id="price"
            name="price"
            type="number"
            step="0.01"
            value={formData.price}
            onChange={handleInputChange}
          />
        </div>

        <button type="submit">Add Recurring</button>
      </form>
    </div>
  );
}

export default AddRecurringForm;
