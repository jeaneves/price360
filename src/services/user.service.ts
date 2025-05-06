import { db } from '../utils/db';
import { hashPassword, comparePasswords } from '../utils/hash';
import { generateToken } from '../utils/jwt';

export async function register(email: string, password: string) {
  const exists = await db.query("SELECT * FROM users WHERE email = $1", [email]);

  if (exists.rowCount! > 0) {
    throw new Error("Usuário já existe");
  }

  const hashed = await hashPassword(password);
  const result = await db.query(
    "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id, email",
    [email, hashed]
  );
  return result.rows[0];
}

export async function login(email: string, password: string) {
  const result = await db.query("SELECT * FROM users WHERE email = $1", [email]);
  const user = result.rows[0];
  if (!user || !(await comparePasswords(password, user.password)))
    throw new Error("Credenciais inválidas");

  const token = generateToken({ id: user.id, email: user.email });
  return { user: { id: user.id, email: user.email }, token };
}

export async function listUsers() {
  const result = await db.query("SELECT id, email FROM users");
  return result.rows;
}

export async function getUser(id: number) {
  const result = await db.query("SELECT id, email FROM users WHERE id = $1", [id]);
  return result.rows[0];
}

export async function deleteUser(id: number) {
  await db.query("DELETE FROM users WHERE id = $1", [id]);
}
