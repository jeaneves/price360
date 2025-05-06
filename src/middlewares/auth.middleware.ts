/*import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt";

export function authenticateToken(req: Request, res: Response, next: NextFunction): void {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    res.status(401).json({ message: "Token não fornecido" });
    return;
  }

  try {
    const user = verifyToken(token);
    (req as any).user = user;
    next();
  } catch (err) {
    res.status(403).json({ message: "Token inválido" });
    return;
  }
}
*/
import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt";

export function authenticateToken(req: Request, res: Response, next: NextFunction): void {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    res.status(401).json({ message: "Token não fornecido" });
    return; // Retorna para evitar continuar o fluxo
  }

  try {
    const user = verifyToken(token);
    (req as any).user = user;
    next(); // Chama next() quando o token é válido
  } catch (err) {
    res.status(403).json({ message: "Token inválido" });
    return; // Retorna para evitar continuar o fluxo
  }
}
