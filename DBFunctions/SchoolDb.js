const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { logger } = require("../logs/winston");
const { ProcessStatus } = require("../helper/vars");

let ussd = {};

ussd.allSchools = async () => {
    try {
        const schools = await prisma.school.findMany({
            orderBy: {
                date_added: 'desc', // Ensure your field is correct (createdAt or date_added)
            },
            include: {
                country: {
                    include: {
                        subregion: {
                            include: {
                                continent: true,
                            }
                        },
                    }
                }, // Include the related subregion
              },
        });

            return schools;
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


ussd.schoolDetails = async (school_id) => {
    try {
        const record = await prisma.school.findFirst({
            where: {
                school_id: school_id
            },
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



ussd.createSchool = async (school) => {
    try {
        const newContinent = await prisma.school.create({
            data: school
          });
          
        return newContinent;
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


ussd.createBatchSchools = async (schools) => {
    try {
        const newContinents = await prisma.school.createMany({
            data: schools,
            skipDuplicates: true, 
          });
          
        return newContinents;
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




ussd.updateSchool = async (school_id, school) => {
    try {
        const updatedContinent = await prisma.school.update({
            where:{
                school_id: school_id
            },
            data: school
          });
          
        return updatedContinent;
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