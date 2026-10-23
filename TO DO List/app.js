const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;
const MAX_TASK_LENGTH = 120;
const tasks = [];
let nextId = 1;

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));

function redirectWithMessage(res, message, type = 'success') {
  const query = new URLSearchParams({ message, type });
  res.redirect(`/?${query.toString()}`);
}

function findTask(id) {
  return tasks.find((task) => task.id === Number(id));
}

app.get('/', (req, res) => {
  const completedCount = tasks.filter((task) => task.completed).length;

  res.render('index', {
    tasks,
    completedCount,
    message: typeof req.query.message === 'string' ? req.query.message : '',
    messageType: req.query.type === 'error' ? 'error' : 'success',
  });
});

app.post('/add', (req, res) => {
  const taskName = typeof req.body.taskName === 'string' ? req.body.taskName.trim() : '';

  if (!taskName) {
    return redirectWithMessage(res, 'Enter a task name before adding it.', 'error');
  }

  if (taskName.length > MAX_TASK_LENGTH) {
    return redirectWithMessage(res, `Task names must be ${MAX_TASK_LENGTH} characters or fewer.`, 'error');
  }

  tasks.push({ id: nextId, name: taskName, completed: false });
  nextId += 1;

  return redirectWithMessage(res, 'Task added.');
});

app.get('/edit/:id', (req, res) => {
  const task = findTask(req.params.id);

  if (!task) {
    return redirectWithMessage(res, 'That task could not be found.', 'error');
  }

  return res.render('edit', { task });
});

app.post('/edit/:id', (req, res) => {
  const task = findTask(req.params.id);

  if (!task) {
    return redirectWithMessage(res, 'That task could not be found.', 'error');
  }

  const taskName = typeof req.body.taskName === 'string' ? req.body.taskName.trim() : '';

  if (!taskName) {
    return res.status(400).render('edit', {
      task,
      error: 'Enter a task name before saving.',
    });
  }

  if (taskName.length > MAX_TASK_LENGTH) {
    return res.status(400).render('edit', {
      task,
      error: `Task names must be ${MAX_TASK_LENGTH} characters or fewer.`,
    });
  }

  task.name = taskName;
  return redirectWithMessage(res, 'Task updated.');
});

app.post('/delete/:id', (req, res) => {
  const taskIndex = tasks.findIndex((task) => task.id === Number(req.params.id));

  if (taskIndex === -1) {
    return redirectWithMessage(res, 'That task could not be found.', 'error');
  }

  tasks.splice(taskIndex, 1);
  return redirectWithMessage(res, 'Task deleted.');
});

app.post('/toggle/:id', (req, res) => {
  const task = findTask(req.params.id);

  if (!task) {
    return redirectWithMessage(res, 'That task could not be found.', 'error');
  }

  task.completed = !task.completed;
  return redirectWithMessage(res, task.completed ? 'Task completed.' : 'Task reopened.');
});

app.listen(PORT, () => {
  console.log(`To-do list is running at http://localhost:${PORT}`);
});