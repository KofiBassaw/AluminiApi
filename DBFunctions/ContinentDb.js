const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { logger } = require("../logs/winston");
const { ProcessStatus } = require("../helper/vars");

let ussd = {};

ussd.allContinent = async () => {
    try {
        const users = await prisma.continent.findMany({
            orderBy: {
                date_created: 'desc', // Ensure your field is correct (createdAt or date_added)
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


ussd.continentDetails = async (continent_id) => {
    try {
        const record = await prisma.continent.findFirst({
            where: {
                continent_id: continent_id
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



ussd.createContinent = async (continent) => {
    try {
        const newContinent = await prisma.continent.create({
            data: continent
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


ussd.createBatchContinents = async (continents) => {
    try {
        const newContinents = await prisma.continent.createMany({
            data: continents,
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




ussd.updateContinent = async (continent_id, continent) => {
    try {
        const updatedContinent = await prisma.continent.update({
            where:{
                continent_id: continent_id
            },
            data: continent
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