import React from "react";
import ViewTask from "./viewTask";
import "../styles/Column.css";

class TaskColumn extends React.Component {
  state = { showTask: false, task: {} };

  viewTask = task => {
    this.setState({ showTask: true, task: task });
  };

  render() {
    const props = { ...this.props };

    return (
      <div>
        <div className="Column">
          <div className="ColumnTitle">{props.state}</div>
          <div className="Elements">
            {props.tasks.map(task => {
              return (
                <div
                  className="ColumnTask"
                  key={task.id}
                  onClick={e => this.viewTask(task)}
                >
                  {task.name}
                </div>
              );
            })}
          </div>
        </div>
        <ViewTask show={this.state.showTask} task={this.state.task} />
      </div>
    );
  }
}

export default TaskColumn;
