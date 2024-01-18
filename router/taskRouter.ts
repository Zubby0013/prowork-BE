import { Router } from "express";
import { createTaskNew, deleteOneTask, getAllTasks, getOneTask } from "../controller/taskController";


const router:Router =  Router();

router.route("/creating-project/:userID").post(createTaskNew);
router.route("/get-all-project/:userID").get(getAllTasks);
router.route("/get-one-project/:userID").get(getOneTask);
router.route("/delete-one-project/:userID").delete(deleteOneTask);

export default router;