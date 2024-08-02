
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { logger } = require("../logs/winston");
const { ProcessStatus } = require("../helper/vars");

let ussd = {};






ussd.activeSession = async (token) => {
    return new Promise(async (resolve, reject) => {
        try {
            // Await the resolution of the Prisma findFirst query
            if (!token) {
                return resolve(null);
            }
            const record = await prisma.Session.findFirst({
                where: {
                    token: token,
                },
            });
            return resolve(record);
        } catch (error) {
            console.error("Error retrieving record:", error);
            logger.error(error);
            return reject(error);
        } finally {
            await prisma.$disconnect();
        }
    });
};





ussd.userDetails = async (userID) => {
    try {
          // Await the resolution findFirst query
          if (!userID) {
            return resolve(null);
        }
        const record = await prisma.user.findFirst({
            where: {
                id: userID,
                status: ProcessStatus.COMPLETED
            },
        });
        return record;
    } catch (error) {
        console.error("Error retrieving record:", error);
        logger.error(error);
        throw error;
    } finally {
        await prisma.$disconnect();
    }
};



ussd.userDetailsFull = async (userID) => {
    try {
          // Await the resolution findFirst query
          if (!userID) {
            return resolve(null);
        }
        const record = await prisma.user.findFirst({
            where: {
                id: userID,
                status: ProcessStatus.COMPLETED
            },
            include:{
                user_employment: true,
                user_education: true,
                user_employment: true,
                user_certificate: true,
                school: true,
                country: true,
                job_applications: {
                    include:{
                        job: true
                    }
                },
                scholarships: {
                    include:{
                        scholarship: true
                    }
                }
                


            }
        });
        return record;
    } catch (error) {
        console.error("Error retrieving record:", error);
        logger.error(error);
        throw error;
    } finally {
        await prisma.$disconnect();
    }
};


/*

       userJobApplications[]

*/



ussd.allUsers = async () => {
    try {
        const users = await prisma.user.findMany({
            orderBy: {
                date_added: 'desc', // Ensure your field is correct (createdAt or date_added)
            },
            include:{
                school: true,
                country: true
            }
        });
        console.log(users); // Log users to check if it's empty or contains data
        return users;
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


/*
ussd.allUsers = () => {
   
    return new Promise(async (resolve, reject) => {
        try {
            const users = await prisma.user.findMany({
                orderBy: {
                    date_added: 'desc', // Ensure your field is correct (createdAt or date_added)
                },
            });
            console.log(users)
            return resolve(users);
        } catch (error) {
            console.error("Error retrieving record:", error);
            // Ensure logger is defined or remove the logger line if not using a logging library
            if (logger) {
                logger.error(error);
            }
            return reject(error);
        } finally {
            await prisma.$disconnect();
        }
    });
};
*/



module.exports = ussd