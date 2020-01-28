import React from "react";
import "../styles/Task.css";
import taskStatuses from "../taskStatuses";
import Select from "react-select";

export const ViewTask = ({
  onChangeState,
  onChangeTaskVal,
  onCloseTask,
  onCreate,
  onDelete,
  onUpdate,
  task
}) => {
  let currentState = taskStatuses.find(
    taskStatus => taskStatus.order === task.status
  );

  const onSave = (saveFunc, task) => {
    saveFunc(task);
    onCloseTask();
  };

  return (
    <div className="TaskWrapper">
      <div className="Task">
        <div className="TaskHeader">
          <input
            onChange={e => onChangeTaskVal({ name: e.target.value })}
            value={task.name || ""}
          />
          <div className="closeButton" onClick={onCloseTask}>
            x
          </div>
        </div>
        <div className="TaskBody">
          <div className="Description">
            Description
            <textarea
              className="DescriptionContent"
              onChange={e => onChangeTaskVal({ description: e.target.value })}
              value={task.description}
            />
          </div>
          <div className="State">
            <Select
              getOptionValue={option => option.order}
              onChange={val => onChangeTaskVal({ status: val.order })}
              options={taskStatuses}
              value={currentState}
            />
          </div>
          {task.id && (
            <div>
              <div onClick={() => onSave(onDelete, task)}>Delete Task</div>
              <div onClick={() => onSave(onUpdate, task)}>Save Task</div>
            </div>
          )}
          {!task.id && (
            <div onClick={() => onSave(onCreate, task)}>Create Task</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewTask;
