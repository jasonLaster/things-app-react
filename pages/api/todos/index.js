import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === "POST") {
    const newTodo = await prisma.todo.create({
      data: { title: req.body.title, completed: false },
    });
    return res.json(newTodo);
  }

  const todos = await prisma.todo.findMany();
  res.json(todos);
}
