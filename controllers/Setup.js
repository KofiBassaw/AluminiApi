const asynHandler = require("../middleware/async");
const continentModel = require("../DBFunctions/ContinentDb");
const UtilityHelper = require("../helper/utilfunc");
const { myVars, RESPONSE_CODES,REGISTRATION_STATUS } = require("../helper/vars");
const subRegionModel = require("../DBFunctions/SubregionDb");
const countryModel = require("../DBFunctions/CountryDb");
const  schoolModel = require("../DBFunctions/SchoolDb");



//beginning of continent function
exports.AllContinent = asynHandler(async (req, res, next) => {

    let session = req.session;
   // console.log(session);

    let continents = await continentModel.allContinent();


   var resp = {
       status : RESPONSE_CODES.SUCCESS,
       message : "Success",
       data : continents
   };

   return UtilityHelper.sendResponse(res, 200, resp.message, resp,session);

})


exports.AddContent = asynHandler(async (req, res, next) => {

    let session = req.session;
   // console.log(session);
   let content  = req.body;

   let NewContinent = await continentModel.createContinent(content);



       if(!NewContinent)
        {
            var resp = {
                status : RESPONSE_CODES.FAILED,
                message : "Failed to create continent",
                data : continents
            };
        }

   var resp = {
       status : RESPONSE_CODES.SUCCESS,
       message : "Success",
       data : NewContinent
   };

   return UtilityHelper.sendResponse(res, 200, resp.message, resp,session);

})



exports.AddBatchContent = asynHandler(async (req, res, next) => {

    let session = req.session;
   // console.log(session);
   let continents  = req.body;

   let NewContinents = await continentModel.createBatchContinents(continents);



       if(!NewContinents)
        {
            var resp = {
                status : RESPONSE_CODES.FAILED,
                message : "Failed to create continent",
                data : continents
            };
        }

   var resp = {
       status : RESPONSE_CODES.SUCCESS,
       message : "Success",
       data : NewContinents
   };

   return UtilityHelper.sendResponse(res, 200, resp.message, resp,session);

})




exports.UpdateContent = asynHandler(async (req, res, next) => {

    let session = req.session;
   // console.log(session);
   let continent  = req.body;
   let continent_id = continent.continent_id;

   let UpdatedContinents = await continentModel.updateContinent(continent_id,continent);



       if(!UpdatedContinents)
        {
            var resp = {
                status : RESPONSE_CODES.FAILED,
                message : "Failed to create continent",
                data : continents
            };
        }

   var resp = {
       status : RESPONSE_CODES.SUCCESS,
       message : "Success",
       data : UpdatedContinents
   };

   return UtilityHelper.sendResponse(res, 200, resp.message, resp,session);

})

//rnding of contnent function











//beginning of subregion function
exports.AllSubRegion = asynHandler(async (req, res, next) => {

    let session = req.session;
   // console.log(session);

    let continents = await subRegionModel.allSubregion();


   var resp = {
       status : RESPONSE_CODES.SUCCESS,
       message : "Success",
       data : continents
   };

   return UtilityHelper.sendResponse(res, 200, resp.message, resp,session);

})


exports.AddSubregion = asynHandler(async (req, res, next) => {

    let session = req.session;
   // console.log(session);
   let content  = req.body;

   let NewContinent = await subRegionModel.createSubregion(content);



       if(!NewContinent)
        {
            var resp = {
                status : RESPONSE_CODES.FAILED,
                message : "Failed to create subregion",
                data : continents
            };
        }

   var resp = {
       status : RESPONSE_CODES.SUCCESS,
       message : "Success",
       data : NewContinent
   };

   return UtilityHelper.sendResponse(res, 200, resp.message, resp,session);

})



exports.AddBatchSubregion = asynHandler(async (req, res, next) => {

    let session = req.session;
   // console.log(session);
   let continents  = req.body;

   let NewContinents = await subRegionModel.createBatchSubregion(continents);



       if(!NewContinents)
        {
            var resp = {
                status : RESPONSE_CODES.FAILED,
                message : "Failed to create continent",
                data : continents
            };
        }

   var resp = {
       status : RESPONSE_CODES.SUCCESS,
       message : "Success",
       data : NewContinents
   };

   return UtilityHelper.sendResponse(res, 200, resp.message, resp,session);

})




exports.UpdateSubregion = asynHandler(async (req, res, next) => {

    let session = req.session;
   // console.log(session);
   let continent  = req.body;
   let subreion_id = continent.subreion_id;

   let UpdatedContinents = await subRegionModel.updateSubregion(subreion_id,continent);



       if(!UpdatedContinents)
        {
            var resp = {
                status : RESPONSE_CODES.FAILED,
                message : "Failed to create continent",
                data : continents
            };
        }

   var resp = {
       status : RESPONSE_CODES.SUCCESS,
       message : "Success",
       data : UpdatedContinents
   };

   return UtilityHelper.sendResponse(res, 200, resp.message, resp,session);

})

//rnding of contnent function
















//beginning of country function
exports.AllCountries = asynHandler(async (req, res, next) => {

    let session = req.session;
   // console.log(session);

    let continents = await countryModel.allCountries();


   var resp = {
       status : RESPONSE_CODES.SUCCESS,
       message : "Success",
       data : continents
   };

   return UtilityHelper.sendResponse(res, 200, resp.message, resp,session);

})





exports.AddCountry = asynHandler(async (req, res, next) => {

    let session = req.session;
   // console.log(session);
   let content  = req.body;

   let NewContinent = await countryModel.createCountry(content);



       if(!NewContinent)
        {
            var resp = {
                status : RESPONSE_CODES.FAILED,
                message : "Failed to create subregion",
                data : continents
            };
        }

   var resp = {
       status : RESPONSE_CODES.SUCCESS,
       message : "Success",
       data : NewContinent
   };

   return UtilityHelper.sendResponse(res, 200, resp.message, resp,session);

})



exports.AddBatchCountries = asynHandler(async (req, res, next) => {

    let session = req.session;
   // console.log(session);
   let continents  = req.body;

   let NewContinents = await countryModel.createBatchCountries(continents);



       if(!NewContinents)
        {
            var resp = {
                status : RESPONSE_CODES.FAILED,
                message : "Failed to create continent",
                data : continents
            };
        }

   var resp = {
       status : RESPONSE_CODES.SUCCESS,
       message : "Success",
       data : NewContinents
   };

   return UtilityHelper.sendResponse(res, 200, resp.message, resp,session);

})




exports.UpdateCountry= asynHandler(async (req, res, next) => {

    let session = req.session;
   // console.log(session);
   let country  = req.body;
   let country_id = country.country_id;

   let UpdatedContinents = await countryModel.updateCountry(country_id,country);



       if(!UpdatedContinents)
        {
            var resp = {
                status : RESPONSE_CODES.FAILED,
                message : "Failed to create continent",
                data : continents
            };
        }

   var resp = {
       status : RESPONSE_CODES.SUCCESS,
       message : "Success",
       data : UpdatedContinents
   };

   return UtilityHelper.sendResponse(res, 200, resp.message, resp,session);

})

//ending of country function











//beginning of school function
exports.AllSchools = asynHandler(async (req, res, next) => {

    let session = req.session;
   // console.log(session);

    let continents = await schoolModel.allSchools();


   var resp = {
       status : RESPONSE_CODES.SUCCESS,
       message : "Success",
       data : continents
   };

   return UtilityHelper.sendResponse(res, 200, resp.message, resp,session);

})





exports.AddSchool = asynHandler(async (req, res, next) => {

    let session = req.session;
   // console.log(session);
   let content  = req.body;

   let NewContinent = await schoolModel.createSchool(content);



       if(!NewContinent)
        {
            var resp = {
                status : RESPONSE_CODES.FAILED,
                message : "Failed to create record",
                data : continents
            };
        }

   var resp = {
       status : RESPONSE_CODES.SUCCESS,
       message : "Success",
       data : NewContinent
   };

   return UtilityHelper.sendResponse(res, 200, resp.message, resp,session);

})



exports.AddBatchSchools = asynHandler(async (req, res, next) => {

    let session = req.session;
   // console.log(session);
   let continents  = req.body;

   let NewContinents = await schoolModel.createBatchSchools(continents);



       if(!NewContinents)
        {
            var resp = {
                status : RESPONSE_CODES.FAILED,
                message : "Failed to create records",
                data : continents
            };
        }

   var resp = {
       status : RESPONSE_CODES.SUCCESS,
       message : "Success",
       data : NewContinents
   };

   return UtilityHelper.sendResponse(res, 200, resp.message, resp,session);

})




exports.UpdateSchool= asynHandler(async (req, res, next) => {

    let session = req.session;
   // console.log(session);
   let school  = req.body;
   let school_id = school.school_id;

   let UpdatedContinents = await schoolModel.updateSchool(school_id,school);



       if(!UpdatedContinents)
        {
            var resp = {
                status : RESPONSE_CODES.FAILED,
                message : "Failed to create continent",
                data : continents
            };
        }

   var resp = {
       status : RESPONSE_CODES.SUCCESS,
       message : "Success",
       data : UpdatedContinents
   };

   return UtilityHelper.sendResponse(res, 200, resp.message, resp,session);

})

//ending of schools function

