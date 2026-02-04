import React, { useEffect, useState } from "react";
import Dashboard from "../components/Dashboard";
import UseUser from "../hooks/UseUser";
import axiosConfig from "../util/axiosConfig";
import API_ENDPOINTS from "../util/apiEndpoints";
import toast from "react-hot-toast";
import Model from "../components/Model";
import DeleteAlert from "../components/DeleteAlert";
import AddGoalForm from "../components/AddGoalForm";
import AddGoalAmountForm from "../components/AddGoalAmountForm";
import { Trash2 } from "lucide-react";
import { Target } from "lucide-react";


const Goals = () => {
  UseUser();

  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(false);

  const [openAddGoalModal, setOpenAddGoalModal] = useState(false);
  const [openAddAmountModal, setOpenAddAmountModal] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState(null);

  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null,
  });

  // 🔹 Fetch goals
  const fetchGoals = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const response = await axiosConfig.get(API_ENDPOINTS.GOALS);
      if (response.status === 200) {
        setGoals(response.data);
      }
    } catch (error) {
      console.error("Failed to fetch goals:", error);
      toast.error("Failed to fetch goals");
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Add goal
  const handleAddGoal = async (goal) => {
    try {
      const response = await axiosConfig.post(API_ENDPOINTS.ADD_GOAL, {
        name: goal.name,
        targetAmount: Number(goal.targetAmount),
        deadline: goal.deadline,
      });

      if (response.status === 201) {
        toast.success("Goal added successfully");
        setOpenAddGoalModal(false);
        fetchGoals();
      }
    } catch (error) {
      console.error("Failed to add goal:", error);
      toast.error("Failed to add goal");
    }
  };

  // 🔹 Add amount to goal
  const handleAddAmount = async (goalId, amount) => {
    try {
      await axiosConfig.put(
        API_ENDPOINTS.ADD_GOAL_AMOUNT(goalId),
        null,
        { params: { amount } }
      );

      toast.success("Goal updated successfully");
      setOpenAddAmountModal(false);
      setSelectedGoal(null);
      fetchGoals();
    } catch (error) {
      console.error("Failed to update goal:", error);
      toast.error("Failed to update goal");
    }
  };

  // 🔹 Delete goal
  const deleteGoal = async (goalId) => {
    try {
      await axiosConfig.delete(API_ENDPOINTS.DELETE_GOAL(goalId));
      toast.success("Goal deleted successfully");
      setOpenDeleteAlert({ show: false, data: null });
      fetchGoals();
    } catch (error) {
      console.error("Failed to delete goal:", error);
      toast.error("Failed to delete goal");
    }
  };

  useEffect(() => {
    fetchGoals();
  }, []);

  return (
    <div>
      <Dashboard activeMenu="Goals">
        <div className="my-5 mx-auto">
          <div className="grid grid-cols-1 gap-6">

            {/* Header */}
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">My Goals</h2>

              <button
                className="add-btn bg-gradient-to-r from-indigo-600 to-purple-600 
                           text-white hover:scale-110 h-10 px-4 py-2 rounded-lg"
                onClick={() => setOpenAddGoalModal(true)}
              >
                Add Goal
              </button>
            </div>

            {/* Empty state */}
            {goals.length === 0 && (
              <p className="text-gray-500">No goals added yet</p>
            )}

            {/* Goals List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {goals.map((goal) => {
                const isCompleted =
                  goal.currentAmount >= goal.targetAmount;

                return (
                  <div
                      key={goal.id}
                      className="relative bg-blue-50 border border-blue-100 p-5 rounded-xl shadow-sm hover:shadow-md transition"
>

                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 flex items-center justify-center 
                        bg-blue-100 text-blue-600 rounded-full">
                          <Target size={20} />
                      </div>
                              <h3 className="font-semibold text-lg">{goal.name}</h3>
                      </div>

                    <p className="text-sm text-gray-600">
                      Status: {isCompleted ? "COMPLETED" : "IN PROGRESS"}
                    </p>

                    <p className="mt-1">
                      ₹{goal.currentAmount} / ₹{goal.targetAmount}
                    </p>

                    {/* Progress bar */}
                    <div className="mt-3">
                      <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-700
                            ${
                              isCompleted
                                ? "bg-green-500"
                                : "bg-gradient-to-r from-indigo-500 to-purple-600"
                            }`}
                          style={{
                            width: `${Math.min(
                              (goal.currentAmount / goal.targetAmount) * 100,
                              100
                            )}%`,
                          }}
                        />
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3 mt-4">
                      {!isCompleted && (
                        <button
                          onClick={() => {
                            setSelectedGoal(goal);
                            setOpenAddAmountModal(true);
                          }}
                          className="flex-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600
                                     text-white text-sm py-2 rounded-lg
                                     shadow-md hover:shadow-lg hover:scale-[1.02]
                                     transition-all duration-300"
                        >
                          Add Amount
                        </button>
                      )}

                      <button
                          onClick={() =>
                          setOpenDeleteAlert({ show: true, data: goal.id })
                          }
                          className="absolute top-3 right-3 text-red-500 hover:text-red-700 
                            bg-white rounded-full p-1 shadow hover:scale-110 transition"
                          title="Delete Goal"
                      >
                        <Trash2 size={16} />
                      </button>

                     

                    </div>
                  </div>
                );
              })}
            </div>

            {/* Add Goal Modal */}
            <Model
              isOpen={openAddGoalModal}
              onClose={() => setOpenAddGoalModal(false)}
              title="Add Goal"
            >
              <AddGoalForm onAddGoal={handleAddGoal} />
            </Model>

            {/* Add Amount Modal */}
            <Model
              isOpen={openAddAmountModal}
              onClose={() => setOpenAddAmountModal(false)}
              title="Add Amount to Goal"
            >
              {selectedGoal && (
                <AddGoalAmountForm
                  goal={selectedGoal}
                  onAddAmount={handleAddAmount}
                />
              )}
            </Model>

            {/* Delete Goal Modal */}
            <Model
              isOpen={openDeleteAlert.show}
              onClose={() =>
                setOpenDeleteAlert({ show: false, data: null })
              }
              title="Delete Goal"
            >
              <DeleteAlert
                content="Are you sure you want to delete this goal? This action cannot be undone."
                onDelete={() => deleteGoal(openDeleteAlert.data)}
              />
            </Model>

          </div>
        </div>
      </Dashboard>
    </div>
  );
};

export default Goals;
