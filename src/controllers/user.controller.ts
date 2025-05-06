import { Request, Response } from "express";
import * as userService from "../services/user.service";

export async function register(req: Request, res: Response) {
  try {
    const user = await userService.register(req.body.email, req.body.password);
    res.status(201).json(user);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
}

export async function login(req: Request, res: Response) {
  try {
    const result = await userService.login(req.body.email, req.body.password);
    res.json(result);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
}

export async function getAll(req: Request, res: Response) {
  const users = await userService.listUsers();
  res.json(users);
}

export async function getOne(req: Request, res: Response) {
  const user = await userService.getUser(Number(req.params.id));
  if (!user) return res.status(404).json({ message: "Usuário não encontrado" });
  res.json(user);
}

export async function remove(req: Request, res: Response) {
  await userService.deleteUser(Number(req.params.id));
  res.status(204).json({message:"Usuário deletado"});
}
