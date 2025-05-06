import { db } from '../utils/db';
import { hashPassword, comparePasswords } from '../utils/hash';
import { generateToken } from '../utils/jwt';

export async function register(username: string, password: string) {
  const exists = await db.query("SELECT * FROM users WHERE username = $1", [username]);
  if (exists.rowCount! > 0) {
    throw new Error("Usuário já existe");
  }

  const hashed = await hashPassword(password);
  const result = await db.query(
    "INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id, username",
    [username, hashed]
  );
  return result.rows[0];
}

export async function login(username: string, password: string) {
  const result = await db.query("SELECT * FROM users WHERE username = $1", [username]);
  const user = result.rows[0];
  if (!user || !(await comparePasswords(password, user.password)))
    throw new Error("Credenciais inválidas");

  const token = generateToken({ id: user.id, username: user.username });
  return { user: { id: user.id, username: user.username }, token };
}

export async function listUsers() {
  const result = await db.query("SELECT id, username FROM users");
  return result.rows;
}

export async function getUser(id: number) {
  const result = await db.query("SELECT id, username FROM users WHERE id = $1", [id]);
  return result.rows[0];
}

export async function deleteUser(id: number) {
  await db.query("DELETE FROM users WHERE id = $1", [id]);
}
