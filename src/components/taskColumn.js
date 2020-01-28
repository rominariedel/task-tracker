import React from "react";
import ViewTask from "./viewTask";
import "../styles/Column.css";

class TaskColumn extends React.Component {
  state = { showTask: false, task: {} };

  emptyTask = {
    name: "New task",
    estimate: 1,
    description: "",
    status: this.props.status
  };

  onViewTask = task => {
    this.setState({ showTask: true, task: task });
  };

  onCloseTask = () => {
    this.setState({ showTask: false, task: {} });
  };

  onAddTask = () => {
    this.setState({ showTask: true, task: Object.assign({}, this.emptyTask) });
  };

  onChangeTaskVal = changedProps => {
    this.setState({
      ...this.state,
      task: { ...this.state.task, ...changedProps }
    });
  };

  onTaskUpdate = changedProps => {
    this.onChangeTaskVal(changedProps);
    this.props.onTaskUpdate(this.state.task);
  };

  render() {
    const { onTaskCreate, onTaskDelete, status, statusLabel, tasks } = {
      ...this.props
    };

    return (
      <div>
        <div className="Column">
          <div className="ColumnTitle">{statusLabel}</div>
          <div className="Elements">
            {tasks.map(task => {
              return (
                <div
                  className="ColumnTask"
                  key={task.id}
                  onClick={e => this.onViewTask(task)}
                >
                  {task.name}
                </div>
              );
            })}
            <div onClick={this.onAddTask}>Add Task</div>
          </div>
        </div>
        {this.state.showTask && (
          <ViewTask
            onChangeTaskVal={this.onChangeTaskVal}
            onCloseTask={this.onCloseTask}
            onCreate={onTaskCreate}
            onDelete={onTaskDelete}
            onUpdate={this.onTaskUpdate}
            task={this.state.task}
          />
        )}
      </div>
    );
  }
}

export default TaskColumn;
