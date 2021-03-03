import "../styles/Column.css";

import React, { useState } from "react";

import ViewTask from "./viewTask";

const TaskColumn = ({
  onTaskCreate,
  onTaskDelete,
  onTaskUpdate,
  status,
  statusLabel,
  tasks
}) => {
  const [showTask, setShowTask] = useState(false);
  const [task, setTask] = useState({});

  const emptyTask = {
    name: "New task",
    estimate: 1,
    description: "",
    status
  };

  const onViewTask = viewTask => {
    setShowTask(true);
    setTask(viewTask);
  };

  const onCloseTask = () => {
    setShowTask(false);
    setTask({});
  };

  const handleAddTask = () => {
    setShowTask(true);
    setTask(Object.assign({}, emptyTask));
  };

  const handleChangeTaskVal = changedProps => {
    setTask({...task, ...changedProps});
  };

  const updateTask = changedProps => {
    handleChangeTaskVal(changedProps);
    onTaskUpdate(task);
  };

  const estimateSum = () => {
    return tasks.reduce((total, task) => {
      return total + parseInt(task.estimate);
    }, 0);
  };

  return (
    <div>
      <div className="Column">
        <div className="ColumnTitle">
          {statusLabel}: {estimateSum()}hs
        </div>
        <div>
          {tasks.map(task => {
            return (
              <div
                className="ColumnTask"
                key={task.id}
                onClick={e => onViewTask(task)}
              >
                {task.name}
              </div>
            );
          })}
          <div className="NewTask" onClick={handleAddTask}>
            + New Task
          </div>
        </div>
      </div>
      {showTask && (
        <ViewTask
          onChangeTaskVal={handleChangeTaskVal}
          onCloseTask={onCloseTask}
          onCreate={onTaskCreate}
          onDelete={onTaskDelete}
          onUpdate={updateTask}
          task={task}
        />
      )}
    </div>
  );
}

export default TaskColumn;
