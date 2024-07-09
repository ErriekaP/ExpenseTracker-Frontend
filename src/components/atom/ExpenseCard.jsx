import React from "react";
import dayjs from "dayjs";

const ExpenseCard = ({ expenses }) => {
  return (
    <div className="flex flex-wrap gap-4 justify-start">
      {expenses.map((expense) => (
        <div key={expense.id} className="card bg-base-100 border-2">
          <div className="card-body">
            <ul>
              <li>
                <p className="text-l font-normal">{expense.description}</p>
                <p className="font-bold">${expense.amount}</p>
                <p className="text-l font-light">
                  {dayjs(expense.date).format("MMMM D, YYYY")}
                </p>
              </li>
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ExpenseCard;
