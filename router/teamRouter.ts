import { Router } from "express";
import { createStaff } from "../controller/teamController";


const router:Router =  Router();

router.route("/creating-project/:userID").post(createStaff);


export default router;