# My To-Do List


## Setup

Install the LTS version of [Node.js](https://nodejs.org/), then open a VS Code terminal and check the installation:

```powershell
node -v
npm -v
```

Create the project and install its packages:

```powershell
mkdir todo-list
cd todo-list
npm init -y
npm install express ejs
npm pkg set scripts.start="node app.js"
```

The install creates `package-lock.json`. Create the files like this:

```text
todo-list/
|-- app.js
|-- package.json
|-- package-lock.json
|-- README.md
|-- public/
|   `-- style.css
`-- views/
    |-- index.ejs
    `-- edit.ejs
```

## Run

Start the server:

```powershell
node app.js
```

Open [http://localhost:3000](http://localhost:3000). You can also start it with `npm start`. Press `Ctrl+C` to stop it.

## Features

- Add, edit, and delete tasks.
- Mark tasks completed or pending.
- See task totals and an empty-list message.
- Blank task names are not allowed.

## Files

- `app.js`: Express server and task routes.
- `views/`: EJS pages (`index.ejs` and `edit.ejs`).
- `public/style.css`: Page styles.
- `package.json`: Project settings and packages.
- `package-lock.json`: Installed package versions.

Node.js runs the app, Express handles requests, and EJS displays task data. **CRUD** means Create, Read, Update, and Delete, the four basic ways to manage tasks.


