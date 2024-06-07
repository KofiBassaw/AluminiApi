const asyncHandler = require("./async");
const userModel = require("../DBFunctions/UserDB");
const { RESPONSE_CODES } = require("../helper/vars");
const UtilityHelper = require("../helper/utilfunc");


exports.CheckAgent = asyncHandler(async (req, res, next) => {

    console.log("Received Headers:", req.headers);
    let userAgentObj = req.headers;
    console.log("********************");
    console.log(userAgentObj);
    let {tokenid} = userAgentObj;

  
    let sessionResp = await userModel.activeSession(tokenid);

  


    if(sessionResp == null || typeof sessionResp == 'undefined') 
    {
        //invalid session 
         //user with phone number exist
         let resp = {
            status : RESPONSE_CODES.SESSION_EXPIRED,
            message : "Session has expired"
        };

        return UtilityHelper.sendResponse(res, 200, resp.message, resp)
    }

    req.session = sessionResp

    let userResp = await userModel.userDetails(sessionResp.user_id);

    if(userResp == null || typeof userResp == 'undefined')
    {
        //invalid session 
         //user with phone number exist
         let resp = {
            status : RESPONSE_CODES.SESSION_EXPIRED,
            message : "Invalid user"
        };

        return UtilityHelper.sendResponse(res, 200, resp.message, resp)
    }


    req.user = userResp

    return next()
})