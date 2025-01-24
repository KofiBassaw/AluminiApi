const asynHandler = require("../middleware/async");
const discussiontModel = require("../DBFunctions/DiscussionDb");
const UtilityHelper = require("../helper/utilfunc");
const { myVars, RESPONSE_CODES,REGISTRATION_STATUS, TASK_STATUS } = require("../helper/vars");
const { format } = require('date-fns');



exports.AddDiscussion = asynHandler(async (req, res, next) => {

    let session = req.session;
   // console.log(session);
   let job  = req.body;

   job.added_by_id = session.user_id;



   let newJob = await discussiontModel.add(job);



       if(!newJob)
        {
            var resp = {
                status : RESPONSE_CODES.FAILED,
                message : "Failed to add discussion",
                data : continents
            };
        }

   var resp = {
       status : RESPONSE_CODES.SUCCESS,
       message : "Success",
       data : newJob
   };

   return UtilityHelper.sendResponse(res, 200, resp.message, resp,session);

})







exports.updateDiscussion = asynHandler(async (req, res, next) => {

    let session = req.session;
   // console.log(session);
   let job  = req.body;


   let newJob = await discussiontModel.update(job.discussion_id,job);



       if(!newJob)
        {
            var resp = {
                status : RESPONSE_CODES.FAILED,
                message : "Failed to update event",
                data : continents
            };
        }

   var resp = {
       status : RESPONSE_CODES.SUCCESS,
       message : "Success",
       data : newJob
   };

   return UtilityHelper.sendResponse(res, 200, resp.message, resp,session);

})




exports.AddMessage = asynHandler(async (req, res, next) => {

    let session = req.session;
   // console.log(session);
   let job  = req.body;
   job.user_id = session.user_id;


   let newJob = await discussiontModel.addDiscussionMessage(job);



       if(!newJob)
        {
            var resp = {
                status : RESPONSE_CODES.FAILED,
                message : "Failed to add a message",
                data : continents
            };
        }

   var resp = {
       status : RESPONSE_CODES.SUCCESS,
       message : "Success",
       data : newJob
   };

   return UtilityHelper.sendResponse(res, 200, resp.message, resp,session);

})






exports.ActiveDiscussions = asynHandler(async (req, res, next) => {

    let session = req.session;
   // console.log(session);



   let newJob = await discussiontModel.activeDiscussion();



       if(!newJob)
        {
            var resp = {
                status : RESPONSE_CODES.FAILED,
                message : "Failed to spool event",
                data : continents
            };
        }

   var resp = {
       status : RESPONSE_CODES.SUCCESS,
       message : "Success",
       data : newJob
   };

   return UtilityHelper.sendResponse(res, 200, resp.message, resp,session);

})




exports.DiscussionDetails = asynHandler(async (req, res, next) => {

    let {session,params} = req;
    let {discussion_id} = params;
   // console.log(session);

    let jobDetails = await discussiontModel.discussionDetailsFull(discussion_id);


    if(!jobDetails)
        {
            var resp = {
                status : RESPONSE_CODES.FAILED,
                message : "Failed to retrieve discussion details"
            };
        }


   var resp = {
       status : RESPONSE_CODES.SUCCESS,
       message : "Success",
       data : jobDetails
   };

   return UtilityHelper.sendResponse(res, 200, resp.message, resp,session);

})



