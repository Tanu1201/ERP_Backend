const models = require("../models");
const db = require("../models/index");
const sendMail = require("../mailer/mail");

module.exports = {
  create: async (req, res) => {
    if (
      // !req.params.id ||
      !req.body.type ||
      !req.body.date ||
      !req.body.description
      // ||
      // !req.body.status ||
      // !req.body.id
    ) {
      return res.status(409).send({ message: "All fields required" });
    }
    const leave = models.Leave.create({
      userId: req.user.id,
      type: req.body.type,
      date: req.body.date,
      description: req.body.description,
      adminId: req.body.id || 1,
    });
    console.log(req.body)

    sendMail({
      sendTo: req.user.email,
      subject: "Request for Leave",
      body: "Requested for leave due to " + req.body.description,
      cc: "jkugsiya11@gmail.com",
    });

    return res.status(201).json({ message: "Leave created", leave: leave });
  },

  getAllLeaveApplications: async (req, res) => {
    // const allLeavesApplications=await db.sequelize.query("SELECT * from Leaves")
    const allLeavesApplications = await models.Leave.findAll({
      where: { status: "PENDING" },
    });

    return res.status(200).json(allLeavesApplications);
  },
  getLeaveById: async (req, res) => {
    console.log(req.user.id);
    const oneUser = await models.Leave.findAll({
      where: { userId: req.user.id },
    });
    return res.status(200).json(oneUser);
  },

  updateLeave: async (req, res) => {
    const updateLeave = await models.Leave.update(
      {
        type: req.body.type,
        date: req.body.date,
        description: req.body.description,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    return res.status(200).json({ message: "Leave Updated" });
  },

  leaveApprove: async (req, res) => {
    console.log(req.body.action);
    await models.Leave.update(
      { status: req.body.action },
      {
        where: {
          id: req.body.leaveId,
        },
      }
    );
    sendMail({
      sendTo: req.user.email,
      subject: "Request for Leave",
      body: "Leave status updated"  + req.body.status,
      cc: "tanu@gkmit.co",
    });
    return res
      .status(200)
      .json({ message: "YOUR LEAVE IS " + req.body.action });
  },
};
