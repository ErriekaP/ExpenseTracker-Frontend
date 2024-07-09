import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import dayjs from "dayjs";
import weekOfYear from "dayjs/plugin/weekOfYear";

dayjs.extend(weekOfYear);

const YearlyExpenses = ({ setSelectedWeek, setSearchedYear }) => {
  const [expenses, setExpenses] = useState([]);
  const [searchYear, setSearchYear] = useState("");
  const [availableWeeks, setAvailableWeeks] = useState([]);
  const [weekTotal, setWeekTotal] = useState([]);
  const [selectedWeek, setSelectedWeekLocal] = useState(null);

  // Fetch expenses from API on component mount
  useEffect(() => {
    axios
      .get("http://localhost:3000/expenses")
      .then((response) => {
        setExpenses(response.data);
      })
      .catch((error) => {
        console.error("Error fetching expenses:", error);
      });
  }, []);

  // Calculate available weeks and totals for each week when expenses or searchYear changes
  useEffect(() => {
    if (searchYear.trim() !== "") {
      const weeks = [];
      const total = {}; // Use an object to store totals for each week
      expenses.forEach((expense) => {
        const year = dayjs(expense.date).year();
        const week = dayjs(expense.date).week();
        const amount = expense.amount;
        if (year.toString() === searchYear) {
          if (!weeks.includes(week)) {
            weeks.push(week);
          }
          if (total[week]) {
            total[week] += amount;
          } else {
            total[week] = amount;
          }
        }
      });
      weeks.sort((a, b) => a - b);
      setAvailableWeeks(weeks);
      setWeekTotal(total);
    } else {
      setAvailableWeeks([]);
      setWeekTotal({});
    }
  }, [expenses, searchYear]);

  // Handle search input change and notify parent component of changes
  const handleSearchChange = useCallback(
    (event) => {
      const year = event.target.value.trim();
      setSearchYear(year);
      setSearchedYear(year); // Notify parent component of searched year
      setSelectedWeekLocal(null); // Reset selectedWeek when search year changes
      setSelectedWeek(null); // Notify parent component of reset
    },
    [setSearchedYear]
  );

  // Handle week select and notify parent component of changes
  const handleSelectChange = useCallback(
    (week) => {
      setSelectedWeekLocal(week);
      setSelectedWeek(week); // Notify parent component of selected week
    },

    [setSelectedWeek]
  );
  return (
    <div className="flex flex-row flex-grow border-2 rounded-sm p-3 gap-8 items-center">
      {/* Search Bar Container */}
      <div className="flex-grow">
        <label className="input input-bordered rounded-sm flex items-center gap-2">
          <input
            type="number"
            className="grow"
            placeholder="Enter year to filter"
            value={searchYear}
            onChange={handleSearchChange}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
              clipRule="evenodd"
            />
          </svg>
        </label>
      </div>

      {/* Display available weeks as select */}
      {
        <div className="flex gap-2">
          <select
            className="select select-bordered w-full max-w-xs rounded-sm"
            onChange={(e) => handleSelectChange(e.target.value)}
            disabled={searchYear.trim() === "" || availableWeeks.length === 0}
          >
            <option>Choose a week</option>
            {availableWeeks.map((week) => (
              <option key={week} value={week}>
                Week {week} (${weekTotal[week]})
              </option>
            ))}
          </select>
        </div>
      }
    </div>
  );
};

export default YearlyExpenses;
