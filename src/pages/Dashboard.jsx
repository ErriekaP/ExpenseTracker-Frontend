import React, { useState, useEffect, useMemo, useCallback } from "react";
import Navbar from "../components/organism/Navbar";
import Expenses from "../components/organism/Expenses";
import AddModal from "../components/organism/AddModal";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Dashboard = () => {
  const [expenses, setExpenses] = useState([]);

  return (
    <>
      <Navbar page="Dashboard" />
      <div className="flex flex-col items-center justify-between w-full px-4 sm:px-8 md:px-14 py-8">
        <div className="flex w-full items-center mb-8">
          <p className="text-2xl font-bold">ALL EXPENSES</p>
          <div className="flex-grow mx-2 sm:mx-4 md:mx-8 lg:mx-16 xl:mx-32"></div>
          <AddModal expenses={expenses} setExpenses={setExpenses} />
        </div>
        <div className="flex flex-col md:flex-row w-full flex-grow">
          <div className="hidden md:block divider divider-horizontal mx-4"></div>
          <div className="md:hidden divider divider-vertical my-4"></div>
          <div className="flex-grow">
            {" "}
            <Expenses expenses={expenses} setExpenses={setExpenses} />
          </div>
        </div>
      </div>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition:Bounce
      />
    </>
  );
};

export default Dashboard;
