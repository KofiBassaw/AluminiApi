const asynHandler = require("../middleware/async");
const eventModel = require("../DBFunctions/EventDb");
const UtilityHelper = require("../helper/utilfunc");
const { myVars, RESPONSE_CODES,REGISTRATION_STATUS, TASK_STATUS } = require("../helper/vars");
const { format } = require('date-fns');



exports.AddEvent = asynHandler(async (req, res, next) => {

    let session = req.session;
   // console.log(session);
   let job  = req.body;

   job.added_by_id = session.user_id;
   job.eventDate = new Date(job.eventDate)



   let newJob = await eventModel.add(job);



       if(!newJob)
        {
            var resp = {
                status : RESPONSE_CODES.FAILED,
                message : "Failed to add event",
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



exports.updateEvent = asynHandler(async (req, res, next) => {

    let session = req.session;
   // console.log(session);
   let job  = req.body;

   console.log("XXXXXXXXXXXXXXXXXXXXXXXXXXX")
   console.log(job)
   let newJob = await eventModel.updateEvent(job.event_id,job);



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





exports.BookEvent = asynHandler(async (req, res, next) => {

    let session = req.session;
   // console.log(session);
   let job  = req.body;


   let newJob = await eventModel.bookEvent(job);



       if(!newJob)
        {
            var resp = {
                status : RESPONSE_CODES.FAILED,
                message : "Failed to book event",
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








exports.ActiveEvent = asynHandler(async (req, res, next) => {

    let session = req.session;
   // console.log(session);



   let newJob = await eventModel.activeEvents();



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





exports.UserActiveEvent = asynHandler(async (req, res, next) => {

    let session = req.session;
   // console.log(session);



   let newJob = await eventModel.userActiveBookings(session.user_id);



       if(!newJob)
        {
            var resp = {
                status : RESPONSE_CODES.FAILED,
                message : "Failed to spool user active event",
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

