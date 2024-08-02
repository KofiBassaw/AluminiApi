const asynHandler = require("../middleware/async");
const userModel = require("../DBFunctions/UserDB");
const UtilityHelper = require("../helper/utilfunc");
const { myVars, RESPONSE_CODES,REGISTRATION_STATUS } = require("../helper/vars");




exports.AllUsers = asynHandler(async (req, res, next) => {

    let session = req.session;
   // console.log(session);

    let users = await userModel.allUsers();


   var resp = {
       status : RESPONSE_CODES.SUCCESS,
       message : "Success",
       data : users
   };

   return UtilityHelper.sendResponse(res, 200, resp.message, resp,session);

})




exports.UserDetailsController = asynHandler(async (req, res, next) => {

    let {session,params} = req;
    let {id} = params;
   // console.log(session);

    let userDetails = await userModel.userDetailsFull(id);


    if(!userDetails)
        {
            var resp = {
                status : RESPONSE_CODES.FAILED,
                message : "Failed to retrieve user"
            };
        }


   var resp = {
       status : RESPONSE_CODES.SUCCESS,
       message : "Success",
       data : userDetails
   };

   return UtilityHelper.sendResponse(res, 200, resp.message, resp,session);

})