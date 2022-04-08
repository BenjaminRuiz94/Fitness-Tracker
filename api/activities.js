const express = require("express");
const { getAllActivities, createActivity, getActivityById, updateActivity,  getPublicRoutinesByActivity } = require("../db");
const activitiesRouter = express.Router();
const { requireUser } = require('./utils');

activitiesRouter.get('/',  async (req,res,next) =>{
    try {
        const allActvities = await getAllActivities()
        res.send(allActvities);
    } catch (error) {
        throw({
        name: 'ActivitiesGetError',
        message: 'Trouble getting activities',
      });
    }
})

activitiesRouter.post('/', requireUser, async (req,res,next)=>{
    try {
        const {name, description} = req.body
        const newActivity = {}
        newActivity.name = name
        newActivity.description = description
        const activity = await createActivity(newActivity)
        if(activity){
            res.send(activity)
        }
        else{
            throw({
                name: 'Create Activity Error',
                message: 'Failed to create activity'
            })
        }

    } catch (error) {
        throw({
        name: 'ActivitiesPostError',
        message: 'Trouble posting a new activity',
      });
    }
})

activitiesRouter.patch('/:activityId', requireUser, async (req,res,next)=>{
    const {activityId} = req.params;
    const {name, description} = req.body
    const updateFields = {}
    if(activityId){
        updateFields.id = activityId
    }
    if(name){
         updateFields.name = name;
    }
    if(description){
        updateFields.description = description;
    }
    try {
        const updatedActivity = await updateActivity(updateFields)
        res.send(updatedActivity)
    } catch (error) {
        throw ({
            name: 'Patch Error',
            message: 'Did not update Activity'
        })
    }
})

activitiesRouter.get('/:activityId/routines', async (req,res,next)=>{
    const {activityId} = req.params
    const fields = {}
    fields.id = activityId
    try {
        console.log(req.params,'TESTING')
        const pubRoutines = await getPublicRoutinesByActivity(fields)
        res.send(pubRoutines)
    } catch ({error}) {
         throw error;
    }
})

module.exports = activitiesRouter