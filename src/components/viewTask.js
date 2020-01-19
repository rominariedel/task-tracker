import React from "react";
import "../styles/Task.css";

class ViewTask extends React.Component {
  render() {
    const { show, task } = { ...this.props };
    const showHideClassName = show
      ? "TaskWrapper display-block"
      : "TaskWrapper display-none";
    return (
      <div className={showHideClassName}>
        <div className="Task">{task.name}</div>
      </div>
    );
  }
}
export default ViewTask;
