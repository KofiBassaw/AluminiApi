const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { logger } = require("../logs/winston");
const { ProcessStatus, TASK_STATUS } = require("../helper/vars");

let ussd = {};





ussd.applicationByUser = async (job_id, user_id) => {
    try {
        if (!user_id) {
            return resolve(null);
        }

        if (!job_id) {
            return resolve(null);
        }

        const applicationDetails = await prisma.userJobApplications.findFirst({
            where: {
                job_id: job_id,
                user_id: user_id
            },
          });
        console.log(applicationDetails); // Log users to check if it's empty or contains data
        return applicationDetails;
    } catch (error) {
        console.error("Error retrieving record:", error);
        if (typeof logger !== 'undefined') {
            logger.error(error);
        }
        throw error;
    } finally {
        await prisma.$disconnect();
    }
};



ussd.apply = async (application) => {
    try {

        var newApp = null;
          await prisma.$transaction(async (prisma) => {
            // Create a new job
             newApp = await prisma.userJobApplications.create({
                data: application
              });
      
            await prisma.job.update({
              where: { job_id: application.job_id},
              data: {
                numberOfApplication: {
                  increment: 1
                },
                numberOfPending:{
                    increment: 1 
                }
              }
            });
      
            console.log(newApp);
          });


        return newApp;
    } catch (error) {
        console.error("Error creating record:", error);
        if (typeof logger !== 'undefined') {
            logger.error(error);
        }
        throw error;
    } finally {
        await prisma.$disconnect();
    }
};




ussd.processApplication = async (application_id, application) => {

    
    try {

       var updatedApplication = null;
        await prisma.$transaction(async (prisma) => {
            // Create a new job
            

             updatedApplication = await prisma.userJobApplications.update({
                where:{
                    application_id: application_id
                },
                data: application
              });
              
              var confirm = 0;
              var decline = 0;
               if(application.status  == TASK_STATUS.ACTIVE)
                {
                    //application has been confirmed
                    confirm = 1;
                }else{
                    //application has been declined
                    decline = 1;
                }
                



            await prisma.job.update({
                where: { job_id: application.job_id},
                data: {
                  numberOfPending:{
                    decrement: 1 
                  },
                  numberOfConfirmation:{
                    increment: confirm 
                  },
                  numberOfDeclined :{
                    increment: decline 
                  }
                }
              });
      
              

          });




          
        return updatedApplication;
    } catch (error) {
        console.error("Error retrieving record:", error);
        if (typeof logger !== 'undefined') {
            logger.error(error);
        }
        throw error;
    } finally {
        await prisma.$disconnect();
    }
};




ussd.applicationDetails = async (application_id) => {
    try {
      

        if (!application_id) {
            return resolve(null);
        }

        const applicationDetails = await prisma.userJobApplications.findFirst({
            where: {
                application_id: application_id,
            },
          });
        console.log(applicationDetails); // Log users to check if it's empty or contains data
        return applicationDetails;
    } catch (error) {
        console.error("Error retrieving record:", error);
        if (typeof logger !== 'undefined') {
            logger.error(error);
        }
        throw error;
    } finally {
        await prisma.$disconnect();
    }
};




ussd.ApplicationsByStatus = async (status) => {
    try {
        const allJobs = await prisma.userJobApplications.findMany({
            where: {
                status: status
            },
            orderBy: {
                date_added: 'desc', // Ensure your field is correct (createdAt or date_added)
            },
            include: {
                 user: true,
                 job: true
            },
        });
        return allJobs;
    } catch (error) {
        console.error("Error retrieving record:", error);
        if (typeof logger !== 'undefined') {
            logger.error(error);
        }
        throw error;
    } finally {
        await prisma.$disconnect();
    }
};





ussd.applicationDetails = async (application_id) => {
    try {
        if (!application_id) {
            return resolve(null);
        }

       

        const applicationDetails = await prisma.userJobApplications.findFirst({
            where: {
                application_id: application_id
            },
          });
        return applicationDetails;
    } catch (error) {
        console.error("Error retrieving record:", error);
        if (typeof logger !== 'undefined') {
            logger.error(error);
        }
        throw error;
    } finally {
        await prisma.$disconnect();
    }
};



module.exports = ussd