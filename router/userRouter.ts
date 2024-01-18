import {Router} from "express";
import { readAllUser, readOneUser, readUserCookies, registerUser, signinUser, verifyUser } from "../controller/userController";

const router: Router = Router();

router.route('/create-user').post(registerUser);
router.route('/verify-user/:userID').patch(verifyUser);
router.route('/read-all-user').get(readAllUser);
router.route('/read-cookies').get(readUserCookies);
router.route('/read-one-user/:userID').get(readOneUser);
router.route('/signin-user').post(signinUser);

export default router;