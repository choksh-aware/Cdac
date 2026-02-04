import React, { useState } from "react";
import Input from "./Input";

const AddGoalAmountForm = ({ goal, onAddAmount }) => {
  const [amount, setAmount] = useState("");

  const handleSubmit = async () => {
    if (!amount || Number(amount) <= 0) {
      alert("Enter a valid amount");
      return;
    }
    await onAddAmount(goal.id, Number(amount));
  };

  return (
    <div className="space-y-4">
      <p className="font-medium">{goal.name}</p>

      <Input
        label="Amount"
        type="number"
        value={amount}
        onChange={(t) => setAmount(t.value)}
        placeholder="e.g. 5000"
      />

      <button
        onClick={handleSubmit}
        className="w-full bg-green-600 text-white py-2 rounded-lg"
      >
        Add Amount
      </button>
    </div>
  );
};

export default AddGoalAmountForm;
