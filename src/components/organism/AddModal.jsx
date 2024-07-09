import React from "react";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const AddButton = ({ expenses, setExpenses }) => {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");

  const handleAddExpense = () => {
    const isoDate = `${date}T12:00:00Z`;
    const newExpense = {
      description,
      amount: parseFloat(amount),
      date: isoDate,
    };
    axios
      .post("http://localhost:3000/expenses", newExpense)
      .then((response) => {
        setExpenses([...expenses, response.data]);
        setDescription("");
        setAmount("");
        setDate("");
        toast.success("Successfully added expense!");
      })
      .catch((error) => {
        console.error("There was an error adding the expense!", error);
      });
  };

  return (
    <>
      <button
        className=""
        onClick={() => document.getElementById("my_modal_2").showModal()}
      >
        <svg
          width="40"
          height="40"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 6C12.5523 6 13 6.44772 13 7V11H17C17.5523 11 18 11.4477 18 12C18 12.5523 17.5523 13 17 13H13V17C13 17.5523 12.5523 18 12 18C11.4477 18 11 17.5523 11 17V13H7C6.44772 13 6 12.5523 6 12C6 11.4477 6.44772 11 7 11H11V7C11 6.44772 11.4477 6 12 6Z"
            fill="currentColor"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M5 22C3.34315 22 2 20.6569 2 19V5C2 3.34315 3.34315 2 5 2H19C20.6569 2 22 3.34315 22 5V19C22 20.6569 20.6569 22 19 22H5ZM4 19C4 19.5523 4.44772 20 5 20H19C19.5523 20 20 19.5523 20 19V5C20 4.44772 19.5523 4 19 4H5C4.44772 4 4 4.44772 4 5V19Z"
            fill="currentColor"
          />
        </svg>
      </button>
      <dialog id="my_modal_2" className="modal">
        <div className="modal-box">
          <label className="input input-bordered flex items-center gap-2 m-2 my-4">
            Description:
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="grow"
              placeholder="Food"
            />
          </label>
          <label className="input input-bordered flex items-center gap-2 m-2 my-4">
            Amount:
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="grow"
              placeholder="10.00"
            />
          </label>
          <label className="input input-bordered flex items-center gap-2 m-2 my-4">
            Date:
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="grow"
            />
          </label>

          <form method="dialog" className="flex justify-center">
            <button className="btn m-2 px-8" onClick={handleAddExpense}>
              Submit
            </button>
          </form>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
};

export default AddButton;
