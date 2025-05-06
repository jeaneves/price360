import { Router } from 'express';
import * as controller from "../controllers/user.controller";
import { authenticateToken } from '../middlewares/auth.middleware';

const router = Router();

router.post("/register", controller.register);
router.post("/login", controller.login);
router.get("/", authenticateToken, controller.getAll);
//router.get("/:id", authenticateToken, controller.getOne);
router.delete("/:id", authenticateToken, controller.remove);

export default router;
