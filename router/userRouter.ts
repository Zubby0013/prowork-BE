import {Router} from "express";
import { readAllUser, readOneUser, registerUser, signinUser, verifyUser } from "../controller/userController";

const router: Router = Router();

router.route('/create-user').post(registerUser);
router.route('/verify-user/:userID').patch(verifyUser);
router.route('/readAll-user').get(readAllUser);
router.route('/readOne-user/:userID').get(readOneUser);
router.route('/signin-user').post(signinUser);

export default router;