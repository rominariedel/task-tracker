import "./styles/App.css";

import React, { useEffect, useState } from "react";
import {
  createTask,
  deleteTask,
  getTasks,
  updateTask
} from "./services/tasksService";

import TaskColumn from "./components/taskColumn";
import taskStatuses from "./taskStatuses";

const App = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    getTasks().then(tasks => {
      setTasks(tasks)
    })
  }, [])

  // TODO: add styled-components and prop-types
  const onTaskUpdate = changedTask => {
    let unchangedTasks = tasks.filter(
      task => task.id !== changedTask.id
    );
    updateTask({ id: changedTask.id, task: changedTask }).then(() => {
      setTasks(unchangedTasks.concat(changedTask));
    });
  };

  const onTaskCreate = newTask => {
    createTask(newTask).then(() => {
      // Generating a random id for task creation mock
      newTask.id = Math.ceil(Math.random() * 100);
      setTasks(tasks.concat(newTask));
    });
    // TODO: add catch and message error for each request
  };

  const onTaskDelete = deletedTask => {
    deleteTask(deletedTask.id).then(() => {
      setTasks(tasks.filter((task) => task.id !== deletedTask.id));
    });
  };

  const tasksWithStatus = taskStatus => {
    return tasks.filter(task => {
      return task.status === taskStatus;
    });
  };

    return (
      <div className="App">
        <h1 className="AppHeader">Task tracker</h1>
        <div className="AppBody">
          {taskStatuses.map(taskStatus => {
            return (
              <TaskColumn
                key={taskStatus.order}
                onTaskCreate={onTaskCreate}
                onTaskDelete={onTaskDelete}
                onTaskUpdate={onTaskUpdate}
                status={taskStatus.order}
                statusLabel={taskStatus.label}
                tasks={tasksWithStatus(taskStatus.order)}
              />
            );
          })}
        </div>
      </div>
    );
}

export default App;