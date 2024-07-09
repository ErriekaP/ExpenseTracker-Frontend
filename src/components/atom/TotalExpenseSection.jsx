import React from "react";

const TotalExpenseSection = ({ totalExpenses }) => {
  return (
    <section className="flex flex-col ">
      <p className="font-normal text-gray-400 pt-4">Total Expenses</p>
      <p className="text-3xl font-medium">${totalExpenses}</p>
    </section>
  );
};

export default TotalExpenseSection;
