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
          <textarea
            className="Title"
            onChange={e => onChangeTaskVal({ name: e.target.value })}
            value={task.name || ""}
          />
          <div className="closeButton" onClick={onCloseTask}>
            x
          </div>
        </div>
        <div className="TaskBody">
          <div className="TaskLine">
            <div className="PropertyWrapper">
              <div className="BodyTitle">Description</div>
              <textarea
                className="DescriptionContent"
                onChange={e => onChangeTaskVal({ description: e.target.value })}
                value={task.description}
              />
            </div>
          </div>
          <div className="TaskLine">
            <div className="PropertyWrapper">
              <div className="BodyTitle">Status</div>
              <Select
                className="PropertyValue"
                getOptionValue={option => option.order}
                onChange={val => onChangeTaskVal({ status: val.order })}
                options={taskStatuses}
                value={currentState}
              />
            </div>
            <div className="PropertyWrapper">
              <div className="BodyTitle">Estimate (hs)</div>
              <input
                className="PropertyValue"
                type="number"
                min="1"
                onChange={e => onChangeTaskVal({ estimate: e.target.value })}
                value={task.estimate}
              />
            </div>
          </div>
          {task.id && (
            <div className="TaskLine">
              <div
                className="Action Delete"
                onClick={() => onSave(onDelete, task)}
              >
                Delete Task
              </div>
              <div
                className="Action Save"
                onClick={() => onSave(onUpdate, task)}
              >
                Save Task
              </div>
            </div>
          )}
          {!task.id && (
            <div className="Action Save" onClick={() => onSave(onCreate, task)}>
              Create Task
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewTask;
