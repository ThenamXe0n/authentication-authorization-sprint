const router = require("express").Router();
const UserRouters = require("./user.router");
router.use("/user", UserRouters);


module.exports = router;
