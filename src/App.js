import React from "react";
import TaskColumn from "./components/taskColumn";
import {
  createTask,
  deleteTask,
  getTasks,
  updateTask
} from "./services/tasksService";
import taskStatuses from "./taskStatuses";
import "./styles/App.css";
import "./styles/Board.css";

export default class App extends React.Component {
  state = {
    tasks: []
  };

  componentDidMount() {
    getTasks().then(tasks => {
      this.setState({ tasks });
    });
  }
  // TODO: add styled-components and prop-types
  onTaskUpdate = changedTask => {
    let unchangedTasks = this.state.tasks.filter(
      task => task.id !== changedTask.id
    );
    updateTask({ id: changedTask.id, task: changedTask }).then(() => {
      this.setState({ tasks: [...unchangedTasks, changedTask] });
    });
  };

  onTaskCreate = newTask => {
    createTask(newTask).then(() => {
      // Generating a random id for task creation mock
      newTask.id = Math.ceil(Math.random() * 100);
      this.setState({ tasks: [...this.state.tasks, newTask] });
    });
    // TODO: add catch and message error for each request
  };

  onTaskDelete = deletedTask => {
    deleteTask(deletedTask.id).then(() => {
      this.setState({
        tasks: this.state.tasks.filter(task => task.id !== deletedTask.id)
      });
    });
  };

  tasksWithStatus = taskStatus => {
    return this.state.tasks.filter(task => {
      return task.status === taskStatus;
    });
  };

  estimateSum = taskStatus => {
    let tasks = this.tasksWithStatus(taskStatus);
    return tasks.reduce((total, task) => {
      return total + parseInt(task.estimate);
    }, 0);
  };

  render() {
    return (
      <div className="App">
        <h1>Task tracker</h1>
        <div className="Board">
          {taskStatuses.map(taskStatus => {
            return (
              <TaskColumn
                estimateSum={this.estimateSum(taskStatus.order)}
                key={taskStatus.order}
                onTaskCreate={this.onTaskCreate}
                onTaskDelete={this.onTaskDelete}
                onTaskUpdate={this.onTaskUpdate}
                status={taskStatus.order}
                statusLabel={taskStatus.label}
                tasks={this.tasksWithStatus(taskStatus.order)}
              />
            );
          })}
        </div>
      </div>
    );
  }
}
