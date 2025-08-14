import express from 'express';
import cors from 'cors';

const app = express();
const port = 5000;

// In-memory storage for tasks
let tasks = [
  {
    id: 1,
    taskName: "Sample Task 1",
    detail: "This is a sample task",
    dueDate: "2024-12-31",
    progress: "Not Started",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 2,
    taskName: "Sample Task 2",
    detail: "Another sample task",
    dueDate: "2024-12-25",
    progress: "In Progress",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

let nextId = 3;

app.use(cors());
app.use(express.json());

// Get all tasks
app.get('/tasks', (req, res) => {
  try {
    console.log('GET /tasks - returning', tasks.length, 'tasks');
    res.json(tasks);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
});

// Add a new task
app.post('/tasks', (req, res) => {
  try {
    const { taskName, detail, dueDate, progress } = req.body;
    
    console.log('POST /tasks - received:', req.body);
    
    if (!taskName || !dueDate || !progress) {
      console.log('Missing required fields:', { taskName, dueDate, progress });
      return res.status(400).json({ error: 'Task Name, Due Date, and Progress are required fields' });
    }

    const newTask = {
      id: nextId++,
      taskName,
      detail: detail || '',
      dueDate,
      progress,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    tasks.unshift(newTask);
    console.log('Created new task:', newTask);
    res.status(201).json(newTask);
  } catch (error) {
    console.error('Error creating task:', error);
    res.status(500).json({ error: 'Failed to create task' });
  }
});

// Update task progress
app.put('/tasks/:id', (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { progress } = req.body;
    
    console.log('PUT /tasks/', id, '- received:', req.body);
    
    if (!progress) {
      return res.status(400).json({ error: 'Missing progress field' });
    }

    const taskIndex = tasks.findIndex(task => task.id === id);
    if (taskIndex === -1) {
      return res.status(404).json({ error: 'Task not found' });
    }

    tasks[taskIndex] = {
      ...tasks[taskIndex],
      progress,
      updatedAt: new Date().toISOString()
    };
    
    console.log('Updated task:', tasks[taskIndex]);
    res.json(tasks[taskIndex]);
  } catch (error) {
    console.error('Error updating task:', error);
    res.status(500).json({ error: 'Failed to update task' });
  }
});

// Delete a task
app.delete('/tasks/:id', (req, res) => {
  try {
    const id = parseInt(req.params.id);
    
    console.log('DELETE /tasks/', id);
    
    const taskIndex = tasks.findIndex(task => task.id === id);
    if (taskIndex === -1) {
      return res.status(404).json({ error: 'Task not found' });
    }

    const deletedTask = tasks.splice(taskIndex, 1)[0];
    console.log('Deleted task:', deletedTask);
    
    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error('Error deleting task:', error);
    res.status(500).json({ error: 'Failed to delete task' });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Start server
app.listen(port, () => {
  console.log(`Backend API server running at http://localhost:${port}`);
  console.log('Available endpoints:');
  console.log('GET    /tasks       - Get all tasks');
  console.log('POST   /tasks       - Create new task');
  console.log('PUT    /tasks/:id   - Update task progress');
  console.log('DELETE /tasks/:id   - Delete task');
  console.log('GET    /health      - Health check');
  console.log('Using in-memory storage (no database required)');
});
