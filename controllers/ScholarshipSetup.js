const asynHandler = require("../middleware/async");
const scholarshipModel = require("../DBFunctions/ScholarshipDb");
const scholarshipApplicationModel = require("../DBFunctions/ScholarshipApplicationDb");
const UtilityHelper = require("../helper/utilfunc");
const { myVars, RESPONSE_CODES,REGISTRATION_STATUS, TASK_STATUS } = require("../helper/vars");




exports.AddScholarshipController = asynHandler(async (req, res, next) => {

    let session = req.session;
   // console.log(session);
   let job  = req.body;

   let newJob = await scholarshipModel.creatScholarship(job);



       if(!newJob)
        {
            var resp = {
                status : RESPONSE_CODES.FAILED,
                message : "Failed to create scholarship",
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



exports.AllScholarshipsController = asynHandler(async (req, res, next) => {

    let session = req.session;
   // console.log(session);

    let jobs = await scholarshipModel.allScholarships();


   var resp = {
       status : RESPONSE_CODES.SUCCESS,
       message : "Success",
       data : jobs
   };

   return UtilityHelper.sendResponse(res, 200, resp.message, resp,session);

})


exports.ScholarshipDetailsController = asynHandler(async (req, res, next) => {

    let {session,params} = req;
    let {scholarship_id} = params;
   // console.log(session);

    let jobDetails = await scholarshipModel.scholarshipDetailsFull(scholarship_id);


    if(!jobDetails)
        {
            var resp = {
                status : RESPONSE_CODES.FAILED,
                message : "Failed to retrieve scholarship details"
            };
        }


   var resp = {
       status : RESPONSE_CODES.SUCCESS,
       message : "Success",
       data : jobDetails
   };

   return UtilityHelper.sendResponse(res, 200, resp.message, resp,session);

})








exports.ApplyScholarshipController = asynHandler(async (req, res, next) => {

  

    let {session, body, user} = req
     
   let {scholarship_id,certificate_url, application_letter_url,recommendation_letter_url }= body
   
   //check if user has already applied for job before
 
       let oldApplication = await scholarshipApplicationModel.applicationByUser(scholarship_id, user.id);
 
 
    if(oldApplication)
     {
         var resp = {
             status : RESPONSE_CODES.FAILED,
             message : "You have already applied for this scholarship"
         }; 
     }
   
  //get job details
     let jobDetails = await scholarshipModel.scholarshipDetails(scholarship_id);
 
 
     if(!jobDetails)
         {
             var resp = {
                 status : RESPONSE_CODES.FAILED,
                 message : "Invalid scholarship id"
             };  
         }
 
 
         if(jobDetails.status !=  TASK_STATUS.ACTIVE)
             {
                 var resp = {
                     status : RESPONSE_CODES.FAILED,
                     message : "scholarship is currently not active"
                 };  
             }
 
 
 
             var application = {
                 user_id: user.id,
                 scholarship_id: scholarship_id,
                 certificate_url: certificate_url,
                 application_letter_url: application_letter_url,
                 recommendation_letter_url : recommendation_letter_url
 
             };
 
 
             
            
 
 
    let newApplication = await scholarshipApplicationModel.apply(application);
 
 
 
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




exports.PendingScholarshipApplicationController = asynHandler(async (req, res, next) => {

    let session = req.session;
   // console.log(session);

    let jobs = await scholarshipApplicationModel.ApplicationsByStatus(TASK_STATUS.PENDING);


   var resp = {
       status : RESPONSE_CODES.SUCCESS,
       message : "Success",
       data : jobs
   };

   return UtilityHelper.sendResponse(res, 200, resp.message, resp,session);

})


 
 


exports.CompletedScholarshipController = asynHandler(async (req, res, next) => {

    let session = req.session;
   // console.log(session);

    let jobs = await scholarshipApplicationModel.ApplicationsByStatus(TASK_STATUS.ACTIVE);


   var resp = {
       status : RESPONSE_CODES.SUCCESS,
       message : "Success",
       data : jobs
   };

   return UtilityHelper.sendResponse(res, 200, resp.message, resp,session);

})





exports.DeclinedScholarshipApplicationController = asynHandler(async (req, res, next) => {

    let session = req.session;
   // console.log(session);

    let jobs = await scholarshipApplicationModel.ApplicationsByStatus(TASK_STATUS.DECLINED);


   var resp = {
       status : RESPONSE_CODES.SUCCESS,
       message : "Success",
       data : jobs
   };

   return UtilityHelper.sendResponse(res, 200, resp.message, resp,session);

})











exports.ProcessScholarshipApplicationController = asynHandler(async (req, res, next) => {

  

    let {session, body, user} = req
     
   let {application_id,processComment, status}= body
   
   //check if user has already applied for job before
 
       let application = await scholarshipApplicationModel.applicationDetails(application_id);
 
 
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

 
    let newApplication = await scholarshipApplicationModel.processApplication(application_id,application);
 
 
 
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
 
