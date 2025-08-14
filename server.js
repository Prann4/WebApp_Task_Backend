import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

// Get all tasks
app.get('/tasks', async (req, res) => {
  try {
    const tasks = await prisma.task.findMany({
      orderBy: { createdAt: 'desc' }
    });
    res.json(tasks);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
});

// Add a new task
app.post('/tasks', async (req, res) => {
  try {
    const { taskName, detail, dueDate, progress } = req.body;
    
    if (!taskName || !dueDate || !progress) {
      return res.status(400).json({ error: 'Task Name, Due Date, and Progress are required fields' });
    }

    const newTask = await prisma.task.create({
      data: {
        taskName,
        detail,
        dueDate: new Date(dueDate),
        progress
      }
    });
    
    res.status(201).json(newTask);
  } catch (error) {
    console.error('Error creating task:', error);
    res.status(500).json({ error: 'Failed to create task' });
  }
});

// Update task progress
app.put('/tasks/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { progress } = req.body;
    
    if (!progress) {
      return res.status(400).json({ error: 'Missing progress field' });
    }

    const updatedTask = await prisma.task.update({
      where: { id },
      data: { progress }
    });
    
    res.json(updatedTask);
  } catch (error) {
    console.error('Error updating task:', error);
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.status(500).json({ error: 'Failed to update task' });
  }
});

// Delete a task
app.delete('/tasks/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    
    await prisma.task.delete({
      where: { id }
    });
    
    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error('Error deleting task:', error);
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Task not found' });
    }
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
});
