import React, { useState, useEffect, useMemo, useCallback } from "react";
import axios from "axios";
import ExpenseCard from "../atom/ExpenseCard";
import Button from "../atom/Button";
import TotalExpenseSection from "../atom/TotalExpenseSection";
import dayjs from "dayjs";
import weekOfYear from "dayjs/plugin/weekOfYear";
import YearlyExpenses from "./YearlyExpenses";

// Extend dayjs with the weekOfYear plugin to handle week calculations
dayjs.extend(weekOfYear);

const Expenses = ({ expenses, setExpenses }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedWeek, setSelectedWeek] = useState("");
  const [searchedYear, setSearchedYear] = useState("");
  const [showYearly, setShowYearly] = useState(false);

  // Fetch expenses from API
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

  // Handle search input change
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Filtered expenses based on searchTerm, selectedWeek, and searchedYear
  const filteredExpenses = useMemo(() => {
    let filtered = expenses;

    if (searchTerm.trim() !== "") {
      filtered = filtered.filter((expense) =>
        expense.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedWeek !== "" && searchedYear !== "") {
      filtered = filtered.filter((expense) => {
        const expenseWeek = dayjs(expense.date).week();
        const expenseYear = dayjs(expense.date).year();
        return (
          expenseWeek === parseInt(selectedWeek) &&
          expenseYear === parseInt(searchedYear)
        );
      });
    }

    return filtered;
  }, [expenses, searchTerm, selectedWeek, searchedYear]);

  // Memoized total expenses based on filtered expenses
  const totalExpensesAmount = useMemo(() => {
    return filteredExpenses.reduce(
      (total, expense) => total + expense.amount,
      0
    );
  }, [filteredExpenses]);

  // Function to handle clicking the Weekly button
  const handleWeeklyButtonClick = () => {
    setShowYearly(true); // Show YearlyExpenses
  };

  // Function to handle clicking the Weekly button
  const handleAllButtonClick = () => {
    setShowYearly(false);
    setSelectedWeek("");
  };

  return (
    <div className="flex flex-col flex-grow gap-4 pt-5 border-2 border-transparent">
      {/* Search Bar and Buttons Container */}
      <div className="flex flex-col md:flex-row flex-grow gap-4">
        <div className="flex w-full md:w-auto">
          <label className="input input-bordered rounded-sm flex items-center gap-2 w-full">
            <input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={handleSearchChange}
              className="grow"
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

        {/* Buttons Container */}
        <div className="flex flex-col md:flex-row flex-grow md:justify-end flex-wrap gap-2 md:gap-1">
          <Button onClick={handleWeeklyButtonClick}>Weekly</Button>
          <Button onClick={handleAllButtonClick}>All</Button>
        </div>
      </div>
      {/* Total Expense Section */}
      <TotalExpenseSection totalExpenses={totalExpensesAmount} />
      {/* Render YearlyExpenses if showYearly is true */}
      {showYearly && (
        <YearlyExpenses
          setSelectedWeek={setSelectedWeek}
          setSearchedYear={setSearchedYear}
        />
      )}
      {/* Filtered Expense Cards */}
      <div className="flex flex-col mt-2">
        <ExpenseCard expenses={filteredExpenses} />
      </div>
    </div>
  );
};

export default Expenses;
