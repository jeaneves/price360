import jwt from "jsonwebtoken";

const secret = process.env.JWT_SECRET || "supersecret";

export function generateToken(payload: object) {
  return jwt.sign(payload, secret, { expiresIn: "1h" });
}

export function verifyToken(token: string) {
  return jwt.verify(token, secret);
}
