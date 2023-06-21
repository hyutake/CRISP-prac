import React, { Fragment, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import TaskList from "./components/Tasks/TaskList";
import TaskForm from "./components/Tasks/TaskForm";
import MainHeader from "./components/Layout/MainHeader";
import { useEffect } from "react";
import "./App.css"; // Import your CSS file
import { useInitTasks } from "./store/task-actions";

function App() {
  const showTaskForm = useSelector((state) => state.ui.showTaskFormModal);
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  //const initTasks = useInitTasks();
  try {
    useInitTasks();
  } catch {
    console.error();
  }

  useEffect(() => {
    setIsLoaded(true);
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
