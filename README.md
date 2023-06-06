# CRISP-prac
Task: Simple Task Manager Application (need to run npm install in both /backend and /frontend btw)

## Description:
You are required to build a simple task manager application using React.js for the frontend, Node.js for the backend, and MongoDB for the database. The application should allow users to create, view, update, and delete tasks.

# Requirements:
## Frontend:
<ol>
  <li>Create a React.js application with a task manager interface.</li>
  <li>Implement a form to add new tasks with fields like title, description, and deadline.</li>
  <li>Display a list of tasks with their title, description, and deadline.</li>
  <li>Provide functionality to edit and delete tasks.</li>
  <li>Add appropriate form validation and error handling.</li>
</ol>

## Backend:
<ol>
  <li>Create a Node.js server using a framework like Express.js.</li>
  <li>Set up RESTful API endpoints to handle CRUD operations for tasks.</li>
  <li>Connect to a MongoDB database using a MongoDB driver or an ORM like Mongoose.</li>
  <li>Implement API endpoints to create, read, update, and delete tasks in the database.</li>
</ol>

## Database:
<ol>
  <li>Set up a MongoDB database to store the tasks.</li>
  <li>Design a schema for the tasks collection with fields like title, description, and deadline.</li>
</ol>
<br>

# Implemented thus far:
<ol>
  <li>Local add task via button on MainHeader</li>
  <li>Local delete task via mouse hover near top-right of each task item</li>
  <ul>
    <li>Fixed bug regarding the delete option appearing when not supposed to :DDDD</li>
    <li>Used {Cancel} from material UI instead of just 'X' to represent the cross</li>
    <li>Added alternative option to "Complete" the task as well</li>
  </ul>
  <li>Local edit task via 'edit' button on middle-right of each task item</li>
  <li>Filter option that matches user input to the task title(s)</li>
  <li>Form validation</li>
  <li>React redux (context) is used to store the task data locally</li>
  <li>ALL styles are taken from the hands-on udemy projects, w/ minor modifications that took always too long to get it right :/</li>
  <li>React router integration - coded <strong>SEPARATELY</strong> from the original non-router code (switch the commented and uncommented root.render() in /frontend/index.js to switch between the 2)</li>
  

  <li>Add task functionality for backend</li>
  <li>Edit task functionality for backend</li>
  <li>Delete task functionality for backend</li>
  <li>Fetch all tasks functionality for backend</li>
  <li>Added minor data validation for backend</li>

  <li>Set up mongodb driver for backend</li>
  <li>Set up mongodb server</li>

  <li>Updated frontend code to work w/ backend code</li>

  <li>Added the 'status' attribute (String) to Task objects - provides a way to indicate whether the task is "In progress" or "Completed"</li>
  <li>Completed tasks are displayed separately from incomplete tasks - click 'Completed Tasks' vs click 'CRISP' (both are in the header)</li>
  <li>Added deadline checking logic to TaskDeadline component</li>
  <li>Added completedDate attribute and supporting logic to Task Objects - Completed Tasks will now also show the date of completion</li>
</ol>

# To-do:
<ul>
  <li>Frontend</li>
  <ol>
    <li>Implement some form of testing...? Difficult to really keep track of features & bugs</li>
  </ol>
  <li>Backend & Database</li>
  <ol>
    <li>Consider using mongoose instead of mongodb driver (or just implement both xd) - mongoose used by both Mukund and Matthew</li>
  </ol>
</ul>
