const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { logger } = require("../logs/winston");
const { ProcessStatus } = require("../helper/vars");
const { format } = require('date-fns');

let ussd = {};


ussd.add = async (event) => {
    try {
        
        const newJob = await prisma.event.create({
            data: event
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



ussd.updateEvent = async (event_id, event) => {
    try {
        const updatedJob = await prisma.event.update({
            where:{
                event_id: event_id
            },
            data: event
          });
          
        return updatedJob;
    } catch (error) {
        console.error("Error updating record:", error);
        if (typeof logger !== 'undefined') {
            logger.error(error);
        }
        throw error;
    } finally {
        await prisma.$disconnect();
    }
};





ussd.eventDetailsFull = async (event_id) => {
    try {
        const jobDetails = await prisma.event.findFirst({
            where: {
                event_id: event_id
            },
            include:{
                bookings:{
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


ussd.eventDetails = async (event_id) => {
    try {
        const jobDetails = await prisma.event.findFirst({
            where: {
                event_id: event_id
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






ussd.bookEvent = async (booking) => {
    try {
        const newJob = await prisma.eventBooking.upsert({
            where: {
                event_id_user_id: { // Use the composite unique key
                    event_id: booking.event_id,
                    user_id: booking.user_id,
                },
            },
            update: {
                status:1, // Update existing fields with new data
            },
            create: {
                ...booking, // Create a new record if it doesn't exist
            },
        });

        return newJob;
    } catch (error) {
        console.error("Error upserting record:", error);
        if (typeof logger !== 'undefined') {
            logger.error(error);
        }
        throw error;
    } finally {
        await prisma.$disconnect();
    }
};
  





ussd.userActiveBookings = async (user_id) => {
    try {
        const currentDate = format(new Date(), 'yyyy-MM-dd');

        const allJobs = await prisma.eventBooking.findMany({
            where: {
                status: 1,
                user_id: user_id,
                event: {
                    status: 1,
                    eventDate: {
                        gte: new Date(currentDate), // Filter for events not expired
                    },
                },
            },
            orderBy: {
                date_added: 'desc', // Ensure the field exists in your model
            },
            include: {
                event: true, // Correct field name based on the model
                user: true
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






ussd.activeEvents = async () => {
    try {
        const currentDate = format(new Date(), 'yyyy-MM-dd');

        const allJobs = await prisma.event.findMany({
            where: {
                status: 1,
                eventDate: {
                    gte: new Date(currentDate), // Filter for events not expired
                },
            },
            orderBy: {
                date_added: 'desc', // Ensure the field exists in your model
            },
            include: {
                added_by: true, // Correct field name based on the model
                bookings: {
                    where:{
                     status: 1
                    },
                    include:{
                        event: true
                    }
                }
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







module.exports = ussd