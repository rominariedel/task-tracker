import React from "react";
import TaskColumn from "./components/taskColumn";
import logo from "./logo.svg";
import { getTasks } from "./services/tasksService.js";
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

  render() {
    return (
      <div className="App">
        <h1>Task tracker</h1>
        <div className="Board">
          <TaskColumn state="planned" tasks={this.state.tasks} />
          <TaskColumn state="in progress" tasks={this.state.tasks} />
          <TaskColumn state="completed" tasks={this.state.tasks} />
        </div>
      </div>
    );
  }
}
