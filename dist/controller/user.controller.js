"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = register;
exports.login = login;
exports.getAll = getAll;
exports.getOne = getOne;
exports.remove = remove;
const userService = __importStar(require("../services/user.service"));
async function register(req, res) {
    try {
        const user = await userService.register(req.body.username, req.body.password);
        res.status(201).json(user);
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
}
async function login(req, res) {
    try {
        const result = await userService.login(req.body.username, req.body.password);
        res.json(result);
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
}
async function getAll(req, res) {
    const users = await userService.listUsers();
    res.json(users);
}
async function getOne(req, res) {
    const user = await userService.getUser(Number(req.params.id));
    if (!user)
        return res.status(404).json({ message: "Usuário não encontrado" });
    res.json(user);
}
async function remove(req, res) {
    await userService.deleteUser(Number(req.params.id));
    res.status(204).send();
}
