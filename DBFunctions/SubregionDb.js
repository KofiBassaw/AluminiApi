const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { logger } = require("../logs/winston");
const { ProcessStatus } = require("../helper/vars");

let ussd = {};

ussd.allSubregion = async () => {
    try {
        const regions = await prisma.subregion.findMany({
            orderBy: {
                date_created: 'desc', // Ensure your field is correct (createdAt or date_added)
            },
        });
        return regions;
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


ussd.subregionDetails = async (subreion_id) => {
    try {
        const record = await prisma.subregion.findFirst({
            where: {
                subreion_id: subreion_id
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



ussd.createSubregion = async (subregion) => {
    try {
        const newContinent = await prisma.subregion.create({
            data: subregion
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


ussd.createBatchSubregion = async (subregions) => {
    try {
        const newContinents = await prisma.subregion.createMany({
            data: subregions,
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




ussd.updateSubregion = async (subreion_id, region) => {
    try {
        const updatedContinent = await prisma.subregion.update({
            where:{
                subreion_id: subreion_id
            },
            data: region
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