import React, { useState, useEffect, useMemo, useCallback } from "react";
import Navbar from "../components/organism/Navbar";

const Dashboard = () => {
  const [expenses, setExpenses] = useState([]);

  return (
    <>
      <Navbar page="Dashboard" />
      <div className="flex flex-col items-center justify-between w-full px-4 sm:px-8 md:px-14 py-8">
        <div className="flex w-full items-center mb-8">
          <p className="text-2xl font-bold">ALL EXPENSES</p>
          <div className="flex-grow mx-2 sm:mx-4 md:mx-8 lg:mx-16 xl:mx-32"></div>
        </div>
        <div className="flex flex-col md:flex-row w-full flex-grow">
          {/* <div className="w-full md:w-auto flex-shrink-0">
            <YearlyExpenses />
          </div> */}
          <div className="hidden md:block divider divider-horizontal mx-4"></div>
          <div className="md:hidden divider divider-vertical my-4"></div>
          <div className="flex-grow"></div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
