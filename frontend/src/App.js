import React, { Fragment, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import TaskList from "./components/Tasks/TaskList";
import TaskForm from "./components/Tasks/TaskForm";
import MainHeader from "./components/Layout/MainHeader";
import { useEffect } from "react";
import { taskActions } from "./store/task-slice";
import "./App.css"; // Import your CSS file

function App() {
  const showTaskForm = useSelector((state) => state.ui.showTaskFormModal);
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Fetch tasks from the API when the component mounts
    const fetchTasks = async () => {
      try {
        const response = await fetch('http://localhost:3001/tasks'); // Replace with the appropriate API endpoint
        if (!response.ok) {
          throw new Error('Failed to fetch tasks from the API.');
        }
        const data = await response.json();
        dispatch(taskActions.setTask(data)); // Dispatch an action to store the fetched tasks in the Redux store
        setIsLoaded(true); // Set isLoaded to true once the tasks are fetched
      } catch (error) {
        console.log(error);
      }
    };

    fetchTasks();
  }, [dispatch]);

  return (
    <Fragment>
      <MainHeader />
      {showTaskForm && <TaskForm />}
      <main>
        {!isLoaded ? (
          <div className="loading-container">
            <p className="loading-text">Loading</p>
            <div className="loading-dots">
              <div className="dot"></div>
              <div className="dot"></div>
              <div className="dot"></div>
            </div>
          </div>
        ) : (
          <TaskList />
        )}
      </main>
    </Fragment>
  );
}

export default App;
