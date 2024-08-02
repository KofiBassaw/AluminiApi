const asynHandler = require("../middleware/async");
const jobModel = require("../DBFunctions/JobDb");
const jobApplicationModel = require("../DBFunctions/JobApplicationDb");
const UtilityHelper = require("../helper/utilfunc");
const { myVars, RESPONSE_CODES,REGISTRATION_STATUS, TASK_STATUS } = require("../helper/vars");



exports.AddJob = asynHandler(async (req, res, next) => {

    let session = req.session;
   // console.log(session);
   let job  = req.body;

   let newJob = await jobModel.creatJob(job);



       if(!newJob)
        {
            var resp = {
                status : RESPONSE_CODES.FAILED,
                message : "Failed to create job",
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




exports.AllJobs = asynHandler(async (req, res, next) => {

    let session = req.session;
   // console.log(session);

    let jobs = await jobModel.allJobs();


   var resp = {
       status : RESPONSE_CODES.SUCCESS,
       message : "Success",
       data : jobs
   };

   return UtilityHelper.sendResponse(res, 200, resp.message, resp,session);

})





exports.JobDetailsController = asynHandler(async (req, res, next) => {

    let {session,params} = req;
    let {job_id} = params;
   // console.log(session);

    let jobDetails = await jobModel.jobDetailsFullMain(job_id);


    if(!jobDetails)
        {
            var resp = {
                status : RESPONSE_CODES.FAILED,
                message : "Failed to retrieve job details"
            };
        }


   var resp = {
       status : RESPONSE_CODES.SUCCESS,
       message : "Success",
       data : jobDetails
   };

   return UtilityHelper.sendResponse(res, 200, resp.message, resp,session);

})






exports.ApplyController = asynHandler(async (req, res, next) => {

  

   let {session, body, user} = req
    
  let {job_id,cvUrl, coverPageUrl }= body
  
  //check if user has already applied for job before

      let oldApplication = await jobApplicationModel.applicationByUser(job_id, user.id);


   if(oldApplication)
    {
        var resp = {
            status : RESPONSE_CODES.FAILED,
            message : "You have already applied for this job"
        }; 
    }
  
 //get job details
    let jobDetails = await jobModel.jobDetails(job_id);


    if(!jobDetails)
        {
            var resp = {
                status : RESPONSE_CODES.FAILED,
                message : "Invalid Job id"
            };  
        }


        if(jobDetails.status !=  TASK_STATUS.ACTIVE)
            {
                var resp = {
                    status : RESPONSE_CODES.FAILED,
                    message : "Job is currently not active"
                };  
            }



            var application = {
                user_id: user.id,
                job_id: job_id,
                cvUrl: cvUrl,
                coverPageUrl: coverPageUrl

            };



           


   let newApplication = await jobApplicationModel.apply(application);



       if(!newApplication)
        {
            var resp = {
                status : RESPONSE_CODES.FAILED,
                message : "Failed to create application",
                data : continents
            };
        }

   var resp = {
       status : RESPONSE_CODES.SUCCESS,
       message : "Success",
       data : newApplication
   };

   return UtilityHelper.sendResponse(res, 200, resp.message, resp,session);

})






exports.PendingApplicationController = asynHandler(async (req, res, next) => {

    let session = req.session;
   // console.log(session);

    let jobs = await jobApplicationModel.ApplicationsByStatus(TASK_STATUS.PENDING);


   var resp = {
       status : RESPONSE_CODES.SUCCESS,
       message : "Success",
       data : jobs
   };

   return UtilityHelper.sendResponse(res, 200, resp.message, resp,session);

})




exports.CompletedApplicationController = asynHandler(async (req, res, next) => {

    let session = req.session;
   // console.log(session);

    let jobs = await jobApplicationModel.ApplicationsByStatus(TASK_STATUS.ACTIVE);


   var resp = {
       status : RESPONSE_CODES.SUCCESS,
       message : "Success",
       data : jobs
   };

   return UtilityHelper.sendResponse(res, 200, resp.message, resp,session);

})





exports.DeclinedApplicationController = asynHandler(async (req, res, next) => {

    let session = req.session;
   // console.log(session);

    let jobs = await jobApplicationModel.ApplicationsByStatus(TASK_STATUS.DECLINED);


   var resp = {
       status : RESPONSE_CODES.SUCCESS,
       message : "Success",
       data : jobs
   };

   return UtilityHelper.sendResponse(res, 200, resp.message, resp,session);

})



exports.ProcessApplicationController = asynHandler(async (req, res, next) => {

  

    let {session, body, user} = req
     
   let {application_id,processComment, status}= body
   
   //check if user has already applied for job before
 
       let application = await jobApplicationModel.applicationDetails(application_id);
 
 
    if(!application)
     {
         var resp = {
             status : RESPONSE_CODES.FAILED,
             message : "Invalid application ID"
         }; 
     }
   
     if(status == 1)
        {
            application.status = TASK_STATUS.ACTIVE
        }else{
            application.status = TASK_STATUS.DECLINED
        }

        const currentDate = new Date();

        application.date_processed = currentDate;
        application.processComment = processComment;
        application.user_process_id = user.id;

 
    let newApplication = await jobApplicationModel.processApplication(application_id,application);
 
 
 
        if(!newApplication)
         {
             var resp = {
                 status : RESPONSE_CODES.FAILED,
                 message : "Failed to process application",
                 data : continents
             };
         }
 
    var resp = {
        status : RESPONSE_CODES.SUCCESS,
        message : "Success",
        data : newApplication
    };
 
    return UtilityHelper.sendResponse(res, 200, resp.message, resp,session);
 
 })
 



