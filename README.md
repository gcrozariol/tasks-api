## <span style="color:#7758E1">Rocketseat's Ignite Node.js Module // Project #01</span>

### 🚀 Main Challenge

This challenge is about creating an API to manipulate a local JSON file (as if it were a database) through CRUD operations using Node.js' native functionalities.

Run the following command to start the project:

<code>npm run dev</code>

Now, with the server running locally using the port 3333, we are ready to make some requests.

### 🧪 Testing the Main Challenge

You can test this challenge by make requests to this server. You can use Insomina or Postman – or whatever you prefer, really.

Here are the current available routes for this application:

* **<span style="color:#7758E1">Create a task</span>**
  * Method &nbsp; &nbsp;→&nbsp; **<span style="color:#98CC41">POST</span>**
  * Endpoint &nbsp;→&nbsp; http://localhost:3333/tasks
  * Body request must contain both **name** and **description** parameters.
<br>

* **<span style="color:#7758E1">Get list of tasks</span>**
  * Method &nbsp; &nbsp;→&nbsp; **<span style="color:#8C82C7">GET</span>**
  * Endpoint &nbsp;→&nbsp; http://localhost:3333/tasks
  * You can also filter the results by name/description by querying it with the key **search**.
<br>

* **<span style="color:#7758E1">Update a task</span>**
  * Method &nbsp; &nbsp;→&nbsp; **<span style="color:#DF9331">PUT</span>**
  * Endpoint &nbsp;→&nbsp; http://localhost:3333/tasks/:id
  * Body request must contain either the **name** or the **description** parameter – or **both**.
<br>

* **<span style="color:#7758E1">Delete a task</span>**
  * Method &nbsp; &nbsp;→&nbsp; **<span style="color:#CE5337">DELETE</span>**
  * Endpoint &nbsp;→&nbsp; http://localhost:3333/tasks/:id
<br>

* **<span style="color:#7758E1">Mark task as complete</span>**
  * Method &nbsp; &nbsp;→&nbsp; **<span style="color:#D4CA47">PATCH</span>**
  * Endpoint &nbsp;→&nbsp; http://localhost:3333/tasks/:id/complete

### 🚀 Extra Challenge

To run this extra challenge, we need to make sure our server above is up and running. 

We also need to install one dependency. To install it, run:

<code>npm i</code>

### 🧪 Testing the Extra Challenge

Execute the code the following command:

<code>npm run import:csv</code>

By running this command, we should be able to import the records within the CSV file located inside the **src/files** directory.