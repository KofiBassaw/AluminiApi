const express = require("express");
const router = express.Router();

//TEST CONTROLLER
const {
   TestController
} = require("../controllers/test");



//set up constants
const {
   AllContinent,
   AddContent,
    AddBatchContent,
    UpdateContent,
    AddSubregion,
    AllSubRegion,
    AddBatchSubregion,
    UpdateSubregion,
    AddCountry,
    AddBatchCountries,
    AllCountries,
    UpdateCountry,
    AddSchool,
    AddBatchSchools,
    AllSchools,
    UpdateSchool,
    AllCountriesWithSchools
} = require("../controllers/Setup");




const {
   AddJob,
   AllJobs,
   JobDetailsController,
   ApplyController,
   PendingApplicationController,
   ProcessApplicationController,
   CompletedApplicationController,
   DeclinedApplicationController
} = require("../controllers/JobSetUp");



const {
   AllUsers,
   UserDetailsController
} = require("../controllers/UserSetup");





const {
   AddScholarshipController,
   AllScholarshipsController,
   ScholarshipDetailsController,
   ApplyScholarshipController,
   PendingScholarshipApplicationController,
   ProcessScholarshipApplicationController,
   CompletedScholarshipController,
   DeclinedScholarshipApplicationController
} = require("../controllers/ScholarshipSetup");





const {
   AddEvent,
   updateEvent,
   BookEvent,
   ActiveEvent,
   UserActiveEvent
} = require("../controllers/EventController");





const {
   AddDiscussion,
   updateDiscussion,
   AddMessage,
   ActiveDiscussions,
   DiscussionDetails
} = require("../controllers/DiscussionsController");




const { CheckAgent } = require("../middleware/requestMiddleware");


 

//test routes link
router.route("/testapi").get(TestController);



//setup routes
router.route("/setup/allContinent").get(CheckAgent,AllContinent);
router.route("/setup/addContinent").post(CheckAgent,AddContent);
router.route("/setup/addBatchContinent").post(CheckAgent,AddBatchContent);
router.route("/setup/updateContinent").post(CheckAgent,UpdateContent);

router.route("/setup/addSubregion").post(CheckAgent,AddSubregion);
router.route("/setup/allSubregion").get(CheckAgent,AllSubRegion);
router.route("/setup/addBatchSubregion").post(CheckAgent,AddBatchSubregion);
router.route("/setup/updateSubregion").post(CheckAgent,UpdateSubregion);


router.route("/setup/addCountry").post(CheckAgent,AddCountry);
router.route("/setup/addBatchCountries").post(CheckAgent,AddBatchCountries);
router.route("/setup/allCountries").get(CheckAgent,AllCountries);

router.route("/setup/allCountriesWithSchool").get(AllCountriesWithSchools);
router.route("/setup/updateCountry").post(CheckAgent,UpdateCountry);



//
router.route("/setup/addSchool").post(CheckAgent,AddSchool);
router.route("/setup/addBatchSchool").post(CheckAgent,AddBatchSchools);
router.route("/setup/allSchools").get(CheckAgent,AllSchools);
router.route("/setup/updateSchool").post(CheckAgent,UpdateSchool);




//routes for jobs
router.route("/Job/addJob").post(CheckAgent,AddJob);
router.route("/Job/all").get(CheckAgent,AllJobs);
router.route("/Job/all/:job_id").get(CheckAgent,JobDetailsController);
router.route("/Job/apply").post(CheckAgent,ApplyController);
router.route("/Job/pendingApplication").get(CheckAgent,PendingApplicationController);
router.route("/Job/completed-applications").get(CheckAgent,CompletedApplicationController);
router.route("/Job/declined-applications").get(CheckAgent,DeclinedApplicationController);

router.route("/Job/process-application").post(CheckAgent,ProcessApplicationController);




//routes for users
router.route("/User/all").get(CheckAgent,AllUsers);
router.route("/User/all/:id").get(CheckAgent,UserDetailsController);



//routs for scholarship
router.route("/scholarship/add").post(CheckAgent,AddScholarshipController);
router.route("/scholarship/all").get(CheckAgent,AllScholarshipsController);
router.route("/scholarship/all/:scholarship_id").get(CheckAgent,ScholarshipDetailsController);
router.route("/scholarship/apply").post(CheckAgent,ApplyScholarshipController);
router.route("/scholarship/pending-application").get(CheckAgent,PendingScholarshipApplicationController);
router.route("/scholarship/process-application").post(CheckAgent,ProcessScholarshipApplicationController);
router.route("/scholarship/completed-application").get(CheckAgent,CompletedScholarshipController);
router.route("/scholarship/declined-application").get(CheckAgent,DeclinedScholarshipApplicationController);





//event routes
router.route("/event/add").post(CheckAgent,AddEvent);
router.route("/event/update-event").post(CheckAgent,updateEvent);
router.route("/event/book").post(CheckAgent,BookEvent);
router.route("/event/active-event").get(CheckAgent,ActiveEvent);
router.route("/event/user-active-event").get(CheckAgent,UserActiveEvent);





//event routes
router.route("/discussion/add").post(CheckAgent,AddDiscussion);
router.route("/discussion/update-discussion").post(CheckAgent,updateDiscussion);
router.route("/discussion/add-message").post(CheckAgent,AddMessage);
router.route("/discussion/active-discussion").get(CheckAgent,ActiveDiscussions);
router.route("/discussion/discussion-details/:discussion_id").get(CheckAgent,DiscussionDetails);

/*
   ,
   ,
   ,
   ,
   
*/
module.exports = router;
