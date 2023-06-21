import axios from "axios";
import { taskActions } from "./task-slice";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

// export const fetchTasks = () => {
//   return async (dispatch) => {
//     try {
//       const response = await axios.get("http://localhost:3001/tasks");
//       if (response.status === 200) {
//         const tasks = response.data;
//         console.log("fetching" + tasks);
//         dispatch(taskActions.setTask(tasks));
//         return tasks;
//       } else {
//         throw new Error("Failed to fetch tasks from the API.");
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };
// };

export const fetchTasks = () => {
  return async (tasks) => {
    try {
      const response = await axios.get("http://localhost:3001/tasks");
      if (response.status === 200) {
        const tasks = response.data;
        console.log("fetching");
        return tasks;
      } else {
        throw new Error("Failed to fetch tasks from the API.");
      }
    } catch (error) {
      console.log(error);
    }
  };
};

// export const useInitTasks = () => {
//   const dispatch = useDispatch();
//   dispatch(fetchTasks())
//     .then((tasks) => {
//       // Handle the fetched tasks
//       dispatch(taskActions.setTask(tasks));
//       console.log(tasks);
//     })
//     .catch((error) => {
//       // Handle error if any
//       console.log(error);
//     });
// };

export const useInitTasks = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchTasksAndInitialize = async () => {
      try {
        const response = await axios.get("http://localhost:3001/tasks");
        if (response.status === 200) {
          const tasks = response.data;
          dispatch(fetchTasks())
            .then((tasks) => {
              // Handle the fetched tasks
              dispatch(taskActions.setTask(tasks));
              console.log(tasks);
            })
            .catch((error) => {
              // Handle error if any
              console.log(error);
            });
        } else {
          throw new Error("Failed to fetch tasks from the API.");
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchTasksAndInitialize();
  }, [dispatch]);
};
