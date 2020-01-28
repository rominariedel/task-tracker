# Task tracker

## Build and Run app

`npm install && npm start`

## Code comments

**Used components**

- App: Contains general React State with all the tasks and the columns with different states.
- TaskColumn: Reused for each task status (Planned, In Progress and Completed). Shows all the tasks in the given column state and allows to create a new task. Also contains the ViewTask component, that is shown when a task is selected.
- ViewTask: Shows all the task attributes and allows to edit any of them or delete the task.

**API Mock**
Using [apiary](https://tasktrackerapi.docs.apiary.io/#) to mock an API.

**TODOs**

- Add tests.
- Add styled-components and prop-types.
- Handle requests errors.
