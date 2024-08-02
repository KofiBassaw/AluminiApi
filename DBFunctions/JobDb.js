const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { logger } = require("../logs/winston");
const { ProcessStatus } = require("../helper/vars");

let ussd = {};


ussd.allJobs = async () => {
    try {
        const allJobs = await prisma.job.findMany({
            orderBy: {
                date_added: 'desc', // Ensure your field is correct (createdAt or date_added)
            },
            include: {
                country: true,
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




ussd.jobsByStatus = async (status) => {
    try {
        const allJobs = await prisma.job.findMany({
            where: {
                status: status
            },
            orderBy: {
                date_added: 'desc', // Ensure your field is correct (createdAt or date_added)
            },
            include: {
                country: true,
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


ussd.jobDetailsFullMain = async (job_id) => {
    try {
        const jodDetails = await prisma.job.findFirst({
            where: {
                job_id: job_id
            },
            include: {
                country: true,
                applications: {
                    include:{
                      user: true
                    }
                  }
            },
          });
        console.log(jodDetails); // Log users to check if it's empty or contains data
        return jodDetails;
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


ussd.jobDetails = async (job_id) => {
    try {
        const jobDetails = await prisma.job.findFirst({
            where: {
                job_id: job_id
            },
          });
        return jobDetails;
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




ussd.jobDetailsFull = async (job_id) => {
    try {
        const jobDetails = await prisma.job.findFirst({
            where: {
                job_id: job_id
            },
            include:{
                country: true, 
                applications: {
                    include:{
                        user: true
                    }
                }
            }
          });
        return jobDetails;
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


ussd.creatJob = async (job) => {
    try {
        console.log("**********************")
        console.log(job)
        const newJob = await prisma.job.create({
            data: job
          });
          
        return newJob;
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





ussd.updateJob = async (job_id, job) => {
    try {
        const updatedJob = await prisma.job.update({
            where:{
                job_id: job_id
            },
            data: job
          });
          
        return updatedJob;
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