const asynHandler = require("../middleware/async");
const userModel = require("../DBFunctions/UserDB");
exports.TestController = asynHandler(async (req, res, next) => {



    let users = await  userModel.allUsers();
    res.send(users);

    })