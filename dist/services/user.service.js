"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = register;
exports.login = login;
exports.listUsers = listUsers;
exports.getUser = getUser;
exports.deleteUser = deleteUser;
const db_1 = require("../utils/db");
const hash_1 = require("../utils/hash");
const jwt_1 = require("../utils/jwt");
async function register(username, password) {
    const exists = await db_1.db.query("SELECT * FROM users WHERE username = $1", [username]);
    if (exists.rowCount > 0)
        throw new Error("Usuário já existe");
    const hashed = await (0, hash_1.hashPassword)(password);
    const result = await db_1.db.query("INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id, username", [username, hashed]);
    return result.rows[0];
}
async function login(username, password) {
    const result = await db_1.db.query("SELECT * FROM users WHERE username = $1", [username]);
    const user = result.rows[0];
    if (!user || !(await (0, hash_1.comparePasswords)(password, user.password)))
        throw new Error("Credenciais inválidas");
    const token = (0, jwt_1.generateToken)({ id: user.id, username: user.username });
    return { user: { id: user.id, username: user.username }, token };
}
async function listUsers() {
    const result = await db_1.db.query("SELECT id, username FROM users");
    return result.rows;
}
async function getUser(id) {
    const result = await db_1.db.query("SELECT id, username FROM users WHERE id = $1", [id]);
    return result.rows[0];
}
async function deleteUser(id) {
    await db_1.db.query("DELETE FROM users WHERE id = $1", [id]);
}
