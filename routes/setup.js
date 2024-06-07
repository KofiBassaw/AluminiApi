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
    UpdateSchool
} = require("../controllers/Setup");



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
router.route("/setup/updateCountry").post(CheckAgent,UpdateCountry);



//
router.route("/setup/addSchool").post(CheckAgent,AddSchool);
router.route("/setup/addBatchSchool").post(CheckAgent,AddBatchSchools);
router.route("/setup/allSchools").get(CheckAgent,AllSchools);
router.route("/setup/updateSchool").post(CheckAgent,UpdateSchool);


module.exports = router;
