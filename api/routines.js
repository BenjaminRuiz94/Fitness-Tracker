const express = require("express");
const id = require("faker/lib/locales/id_ID");
const {
  getAllPublicRoutines,
  createRoutine,
  updateRoutine,
  getRoutineById,
  destroyRoutine,
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
    console.log(req.user, "TAKE A LOOK");
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
    console.log(req.user.id, "Current user Id");
    const routineId = req.params.routineId;
    const routine = await getRoutineById(routineId);
    console.log(routine, "Routine");
    if (id === routine.creatorId) {
      let newRoutine = await destroyRoutine(routineId);
      console.log(newRoutine, "New routine");
      res.send(newRoutine);
    }
  } catch (error) {
    throw error;
  }
});

module.exports = routinesRouter;
