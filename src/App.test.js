import Adapter from "enzyme-adapter-react-16";
import App from "./App";
import Enzyme from "enzyme";
import React from "react";
import TaskColumn from "./components/taskColumn";
import { shallow } from "enzyme";

Enzyme.configure({ adapter: new Adapter() });

const mockedTasks = require("./mocks/tasks.json");

jest.mock("./services/tasksService", () => {
  const getTasks = async () => {
    return mockedTasks;
  };
  return { getTasks };
});

function flushPromises() {
  return new Promise((resolve) => setImmediate(resolve));
}

it("loads and displays tasks", () => {
  const wrapper = shallow(<App />);

  return flushPromises().then().then().then(() => {
    const columnElements = wrapper.find(TaskColumn);

    columnElements.forEach((column, index) => {
      const columnTasks = mockedTasks.filter(
        (task) => task.status === index
      );
      expect(column.props().tasks).toStrictEqual(columnTasks);
    })
  });
});
