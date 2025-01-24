const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { logger } = require("../logs/winston");
const { ProcessStatus } = require("../helper/vars");
const { format } = require('date-fns');

let ussd = {};





ussd.add = async (discussion) => {
    try {
        
        const newJob = await prisma.discussion.create({
            data: discussion
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





ussd.update = async (discussion_id, discussion) => {
    try {
        const updatedJob = await prisma.discussion.update({
            where:{
                discussion_id: discussion_id
            },
            data: discussion
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







ussd.discussionDetailsFull = async (discussion_id) => {
    try {
        const jobDetails = await prisma.discussion.findFirst({
            where: {
                discussion_id: discussion_id
            },
            include:{
                messages:{
                    include:{
                        user: true
                    },
                    where:{
                        status:1
                    },
                    orderBy: {
                        date_added: 'desc', // Ensure the field exists in your model
                    }
                    
                },
                added_by: true
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







ussd.discussionDetails = async (discussion_id) => {
    try {
        const jobDetails = await prisma.discussion.findFirst({
            where: {
                discussion_id: discussion_id
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




ussd.addDiscussionMessage = async (message) => {
    try {
        
        const newJob = await prisma.discussionMessage.create({
            data: message
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


ussd.activeDiscussion = async () => {
    try {


        const allJobs = await prisma.discussion.findMany({
            where: {
                status: 1,
            },
            orderBy: {
                date_added: 'desc', // Ensure the field exists in your model
            },
            include: {
                added_by: true,
                _count: {
                    select: {
                        messages: {
                            where:{
                                status:1
                            }
                        }, // Count the messages for each discussion
                    },
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