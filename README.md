# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).


# #kanban board

High-Level Requirements
Kanban Board with JSON-Driven Data

Display data from a JSON structure where the top level represents work orders.
Each work order has a status and a list of nextIds.
Drawer for Work Orders

A UI drawer that lists all work orders (Level 1 of the JSON tree).
When a work order is selected, it populates the Kanban with the associated statuses (Level 2).
Kanban Columns

Each column represents a system status.
Each status has tasks grouped within the respective column.
Connecting Lines

Draw lines between status tasks based on their nextIds.
Use a pre-provided dynamic connection file or implement SVG paths to draw the lines.
Dynamic Data Relationships

When iterating over nextIds, find their matching descriptions by traversing the JSON tree.

Main Structure:
Top-Level Keys:

id: Unique identifier for the workflow (integer).
description: Description of the workflow (string).
systemModel: The model name associated with the workflow (string).
workTypes: Array for specifying types of work, currently empty.
active: Indicates if the workflow is active (boolean).
defaultWorkflow: Specifies if this is the default workflow (boolean).
status: Array of objects, each defining a specific workflow status.
Status Array: Each status object contains:

id: Unique identifier for the status.
code: Code representing the status.
description: Detailed explanation of the status.
nextIds: Array of possible next status IDs.
editGroups: Groups authorized to edit at this status.
viewGroups: Groups authorized to view at this status.
statusRules: Rules applied at this status, each with a label and value.
systemStatus: An object describing the system-level status.
Group Arrays (editGroups, viewGroups):

Each group has:
label: The name of the group.
value: Group ID.
attributes: Placeholder for additional properties.
fieldHandler: Null by default, potentially for handling dynamic fields.
Status Rules:

A set of rules defining actions or restrictions at a particular status, such as copying status to linked items or enforcing certain updates.
systemStatus:

Specifies the system-wide status mapping with a label and value.