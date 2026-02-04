import React, { useState } from "react";
import Input from "./Input";
import { LoaderCircle } from "lucide-react";

const AddGoalForm = ({ onAddGoal }) => {
  const [goal, setGoal] = useState({
    name: "",
    targetAmount: "",
    deadline: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (key, value) => {
    setGoal({ ...goal, [key]: value });
  };

  const handleSubmit = async () => {
    if (!goal.name.trim()) return alert("Enter goal name");
    if (!goal.targetAmount || goal.targetAmount <= 0)
      return alert("Enter valid target amount");

    setLoading(true);
    await onAddGoal(goal);
    setLoading(false);
  };

  return (
    <div className="space-y-4">
      <Input
        label="Goal Name"
        value={goal.name}
        onChange={(t) => handleChange("name", t.value)}
        placeholder="e.g. Buy Laptop"
      />

      <Input
        label="Target Amount"
        type="number"
        value={goal.targetAmount}
        onChange={(t) => handleChange("targetAmount", t.value)}
        placeholder="e.g. 80000"
      />

      <Input
        label="Deadline"
        type="date"
        value={goal.deadline}
        onChange={(t) => handleChange("deadline", t.value)}
      />

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="w-full flex justify-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-2 rounded-lg"
      >
        {loading ? <LoaderCircle className="animate-spin w-4 h-4" /> : "Add Goal"}
      </button>
    </div>
  );
};

export default AddGoalForm;
