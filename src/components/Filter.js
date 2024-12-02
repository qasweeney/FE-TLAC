import { useState } from "react";
import "./filter.css";

const Filter = ({ sessions, setFilteredSessions, view, subView }) => {
  const [filters, setFilters] = useState({
    date: "",
    trainer: "",
    member: "",
    price: "",
    time: "",
    rating: "both",
  });
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const applyFilters = () => {
    let filtered = [...sessions];

    if (filters.date) {
      filtered = filtered.filter((session) => {
        if (session.date === null) {
          return false;
        }
        return (
          session.date.slice(0, session.date.indexOf("T")) === filters.date
        );
      });
    }

    if (filters.trainer) {
      filtered = filtered.filter((session) => {
        return `${session.trainer.firstName} ${session.trainer.lastName}`
          .toLowerCase()
          .includes(filters.trainer.toLowerCase());
      });
    }

    if (filters.member) {
      filtered = filtered.filter((session) => {
        return `${session.member.firstName} ${session.member.lastName}`
          .toLowerCase()
          .includes(filters.member.toLowerCase());
      });
    }

    if (filters.price) {
      filtered = filtered.filter((session) =>
        session.price.toString().startsWith(filters.price)
      );
    }

    if (filters.time) {
      filtered = filtered.filter((session) => {
        return session.startTime === `${filters.time}:00`;
      });
    }

    if (filters.rating) {
      filtered = filtered.filter((session) => {
        if (filters.rating === "both") {
          return session;
        } else if (filters.rating === "unrated") {
          return session.rating === null;
        } else {
          return session.rating !== null;
        }
      });
    }

    setFilteredSessions(filtered);
  };

  return (
    <div className="filter-component">
      <div>
        <label>
          Date:
          <input
            type="date"
            name="date"
            value={filters.date}
            onChange={handleFilterChange}
          />
        </label>
      </div>
      <div>
        <label>
          Trainer Name:
          <input
            type="text"
            name="trainer"
            value={filters.trainer}
            onChange={handleFilterChange}
          />
        </label>
      </div>
      {view !== "member" && (
        <div>
          <label>
            Member Name:
            <input
              type="text"
              name="member"
              value={filters.member}
              onChange={handleFilterChange}
            />
          </label>
        </div>
      )}
      <div>
        <label>
          Price:
          <input
            type="number"
            name="price"
            value={filters.price}
            onChange={handleFilterChange}
          />
        </label>
      </div>
      <div>
        <label>
          Time:
          <input
            type="time"
            name="time"
            value={filters.time}
            onChange={handleFilterChange}
          />
        </label>
      </div>
      {subView === "past" && (
        <div>
          <label>
            Rating:
            <select
              id="cars"
              name="rating"
              onChange={handleFilterChange}
              value={filters.rating}
            >
              <option value="both">Rated & Unrated</option>
              <option value="unrated">Unrated</option>
              <option value="rated">Rated</option>
            </select>
          </label>
        </div>
      )}
      <button onClick={applyFilters}>Apply Filters</button>
    </div>
  );
};

export default Filter;