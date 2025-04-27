const Task = require('../models/task');

exports.getTasks = async (req, res) => {
  const tasks = await Task.find({ user: req.user.id });
  res.json(tasks);
};

exports.createTask = async (req, res) => {
  const task = new Task({ ...req.body, user: req.user.id });
  const savedTask = await task.save();
  res.json(savedTask);
};

exports.updateTask = async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task) return res.status(404).json({ message: 'Task not found' });
  if (task.user.toString() !== req.user.id) return res.status(401).json({ message: 'Not authorized' });

  task.title = req.body.title || task.title;
  task.completed = req.body.completed !== undefined ? req.body.completed : task.completed;

  const updatedTask = await task.save();
  res.json(updatedTask);
};

exports.deleteTask = async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task) return res.status(404).json({ message: 'Task not found' });
  if (task.user.toString() !== req.user.id) return res.status(401).json({ message: 'Not authorized' });

  await task.deleteOne();
  res.json({ message: 'Task removed' });
};
