const express = require("express");
const {
  getAllPublicRoutines,
  createRoutine,
  updateRoutine,
  getRoutineById,
  destroyRoutine,
  addActivityToRoutine,
  getRoutineActivitiesByRoutine,
} = require("../db");
const { requireUser } = require("./utils");
const routinesRouter = express.Router();

routinesRouter.get("/", async (req, res, next) => {
  try {
    const routines = await getAllPublicRoutines();
    res.send(routines);
  } catch (error) {
    throw error;
  }
});

routinesRouter.post("/", requireUser, async (req, res, next) => {
  try {
    const { isPublic, name, goal } = req.body;
    const newRoutine = {};
    newRoutine.creatorId = req.user.id;
    newRoutine.isPublic = isPublic;
    newRoutine.name = name;
    newRoutine.goal = goal;
    const routine = await createRoutine(newRoutine);
    if (routine) {
      res.send(routine);
    } else {
      throw {
        name: "Create Routine Error",
        message: "Failed to create routine",
      };
    }
  } catch (error) {
    throw error;
  }
});

routinesRouter.patch("/:routineId", requireUser, async (req, res, next) => {
  const { routineId } = req.params;
  const Routine = await getRoutineById(routineId);
  if (req.user.id === Routine.creatorId) {
    const { isPublic, name, goal } = req.body;
    const updateFields = {};
    if (routineId) {
      updateFields.id = routineId;
    }
    if (isPublic) {
      updateFields.isPublic = isPublic;
    }
    if (name) {
      updateFields.name = name;
    }
    if (goal) {
      updateFields.goal = goal;
    }
    try {
      const updatedRoutine = await updateRoutine(updateFields);
      res.send(updatedRoutine);
    } catch (error) {
      throw error;
    }
  } else {
    throw error;
  }
});

routinesRouter.delete("/:routineId", requireUser, async (req, res, next) => {
  try {
    const id = req.user.id;
    const routineId = req.params.routineId;
    const routine = await getRoutineById(routineId);
    if (id === routine.creatorId) {
      let newRoutine = await destroyRoutine(routineId);
      res.send(routine);
    }
  } catch (error) {
    throw error;
  }
});

routinesRouter.post("/:routineId/activities", async (req,res,next)=>{
    try {
        const {activityId, duration, count} = req.body
        const fields = {}
        const routine = await getRoutineById(req.params.routineId)
        const routineActivities = await getRoutineActivitiesByRoutine(routine)
        if(routine && routineActivities.length === 0){
            fields.routineId = routine.id
            fields.activityId = activityId
            fields.duration = duration
            fields.count = count
            const attached = await addActivityToRoutine(fields)
            res.send(attached)
        } else{
            next ({
                name: "RoutineId Error",
                message: "That routine doesn't exist!"
            })
    }
    } catch (error) {
        throw error;
    }

})

module.exports = routinesRouter;
