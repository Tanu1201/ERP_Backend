const models = require("../models");
async function checkRole(request, response, next) {
  let id = request.body.id || request.params.id || request.body.adminId;
  // console.log(id)
  if (id) {
    const user = await models.User.findOne({ where: { id: id } });
    if (user.role === "ADMIN") {
      next();
    } else {
      return response
        .status(403)
        .json({
          message:
            "You do not have sufficient permissions to perform this action.",
        });
    }
  } else {
    return response.status(400).json({ message: "Invalid Request Parameter" });
  }
}

module.exports = {
  checkRole,
};
