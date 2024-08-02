const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { logger } = require("../logs/winston");
const { ProcessStatus } = require("../helper/vars");

let ussd = {};


ussd.allScholarships = async () => {
    try {
        const allJobs = await prisma.scholarship.findMany({
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




ussd.scholarshipByStatus = async (status) => {
    try {
        const allJobs = await prisma.scholarship.findMany({
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



ussd.jobDetailsFullMain = async (scholarship_id) => {
    try {
        const jodDetails = await prisma.scholarship.findFirst({
            where: {
                scholarship_id: scholarship_id
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




ussd.scholarshipDetails = async (scholarship_id) => {
    try {
        const jobDetails = await prisma.scholarship.findFirst({
            where: {
                scholarship_id: scholarship_id
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



ussd.scholarshipDetailsFull = async (scholarship_id) => {
    try {
        const jobDetails = await prisma.scholarship.findFirst({
            where: {
                scholarship_id: scholarship_id
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





ussd.creatScholarship = async (scholarship) => {
    try {
        
        const newJob = await prisma.scholarship.create({
            data: scholarship
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




ussd.updateScholarship = async (scholarship_id, scholarship) => {
    try {
        const updatedJob = await prisma.scholarship.update({
            where:{
                scholarship_id: scholarship_id
            },
            data: scholarship
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