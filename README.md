# Awasar-vecel
Job Tracking App
A web application for tracking and managing jobs using Node.js and Express.

# Features
Add, update, and delete jobs
Assign jobs to users and track job progress
View a dashboard of all current jobs and their statuses
Filter and search for jobs by various criteria

# Prerequisites
Node.js and npm (comes with Node)
MongoDB 

# Installation
Clone this repository: git clone https://github.com/alpha951/Awasar-vecel.git
Navigate to the project directory: cd Awasar-vecel
Install the dependencies: npm install
Create a .env file in the root of the project and set the following variables:
<ul>
  <li> CLIENT_ID: google auth client id </li>
  <li> CLIENT_SECRET: google auth secret </li>
  <li> SECRET: the password for your database </li>
  <li> MONGODB_URI: mongodb cloud uri </li>
</ul>
Run the database migration script to set up the necessary tables: npm run migrate
Start the server: npm start

# Usage
Navigate to http://localhost:3000 in your web browser
Begin adding, updating, and tracking jobs!

# Contribute
We welcome contributions to this project. If you want to contribute, please follow these steps:
Fork this repository
Create a new branch for your feature: git checkout -b my-new-feature
Commit your changes: git commit -am "Add some feature"
Push to the branch: git push origin my-new-feature
Submit a pull request
