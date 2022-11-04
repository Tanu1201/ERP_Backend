const { Router } = require('express');
const controllers = require('../controllers');
const router = Router();
const {verify} = require("../middleware/auth")
const {checkRole} = require("../middleware/checkRole")

router.post("/login",controllers.User.login)

router.get("/user/:id",verify,checkRole,controllers.User.findAll)
router.delete("/user/:id",verify,checkRole,controllers.User.deleteUser)
router.post("/user/signUp/",verify,checkRole,controllers.User.createUser)
router.post("/user/leave/:id",verify,checkRole,controllers.Leave.create)
router.put("/user/updateLeave/:id",verify,controllers.Leave.updateLeave)

router.put("/user/leaveAction/:id",verify,checkRole,controllers.Leave.leaveApprove)

router.get("/user/userLeaves/:id",verify,checkRole,controllers.Leave.getAllLeaveApplications)

router.get("/user/leaveHistory/:id",verify,controllers.Leave.getLeaveById)
router.post("/user/createLeave/",verify,controllers.Leave.create)


module.exports=router