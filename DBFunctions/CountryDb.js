const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { logger } = require("../logs/winston");
const { ProcessStatus } = require("../helper/vars");

let ussd = {};


ussd.allCountriesWithSchools = async () => {
    try {
        const users = await prisma.country.findMany({
            orderBy: {
                date_created: 'desc', // Ensure your field is correct (createdAt or date_added)
            },
            include: {
                subregion: {
                    include: {
                        continent: true,
                    }
                },
                school : true
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




ussd.allCountries = async () => {
    try {
        const users = await prisma.country.findMany({
            orderBy: {
                date_created: 'desc', // Ensure your field is correct (createdAt or date_added)
            },
            include: {
                subregion: {
                    include: {
                        continent: true,
                    }
                },
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


ussd.countryDetails = async (country_id) => {
    try {
        const record = await prisma.country.findFirst({
            where: {
                country_id: country_id
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



ussd.createCountry = async (country) => {
    try {
        const newContinent = await prisma.country.create({
            data: country
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


ussd.createBatchCountries = async (countries) => {
    try {
        const newContinents = await prisma.country.createMany({
            data: countries,
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




ussd.updateCountry = async (country_id, country) => {
    try {
        const updatedContinent = await prisma.country.update({
            where:{
                country_id: country_id
            },
            data: country
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