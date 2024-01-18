import { Router } from "express";
import { createProject, deleteOneProject, getAllProjects, getOneProject } from "../controller/projectController";


const router:Router =  Router();

router.route("/creating-project/:userID").post(createProject);
router.route("/get-all-project/:userID").get(getAllProjects);
router.route("/get-one-project/:userID").get(getOneProject);
router.route("/delete-one-project/:userID").delete(deleteOneProject);

export default router;