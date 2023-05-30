# CRISP-prac (need to run npm install btw)
Task: Simple Task Manager Application

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
  </ul>
  <li>Local edit task via 'edit' button on middle-right of each task item</li>
  <li>Filter option that matches user input to the task title(s)</li>
  <li>React redux (context) is used to store the task data locally</li>
  <li>Bunch of styles "borrowed" from the udemy projects, should look familiar :></li>
  

  <li>Add task functionality for backend</li>
  <li>Edit task functionality for backend</li>
  <li>Delete task functionality for backend</li>
  <li>Fetch all tasks functionality for backend</li>
  <li>Added minor data validation for backend</li>

  <li>Set up mongodb driver for backend</li>
  <li>Set up mongodb server</li>

  <li>Updated frontend code to work w/ backend code</li>
</ol>

# To-do (non-exhaustive):
<ul>
  <li>Frontend</li>
  <ol>
    <li>Add form validation - honestly already covered simply by using the 'required' keyword for the input tag though</li>
    <li>Maybe change the logic to utilise react-router-dom instead so that urls can be used to direct to specific 'pages', although technically theres no real need for such a simple app</li>
  </ol>
  <li>Backend</li>
  <ol>
    <li>Done...?</li>
  </ol>
  <li>Database</li>
  <ol>
    <li>Done...?</li>
  </ol>
</ul>
