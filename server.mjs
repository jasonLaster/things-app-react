import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get('/todos', async (req, res) => {
  const todos = await prisma.todo.findMany();
  res.json(todos);
});

app.post('/todos', async (req, res) => {
  const newTodo = await prisma.todo.create({
    data: { title: req.body.title, completed: false },
  });
  res.json(newTodo);
});

app.delete('/todos/:id', async (req, res) => {
  const todo = await prisma.todo.delete({
    where: { id: parseInt(req.params.id) },
  });
  res.json(todo);
});

app.put('/todos/:id', async (req, res) => {
  const { id } = req.params;
  const { completed } = req.body;
  const todo = await prisma.todo.update({
      where: { id: Number(id) },
      data: { completed },
    });  
  res.json(todo);
});

app.listen(3001, () => console.log('Server running on http://localhost:3001'));
