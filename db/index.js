// require and re-export all files in this db directory (users, activities...)
const {
  createUser,
  getUser,
  getUserById,
  getUserByUsername,
} = require("./users");
const {
  createActivity,
  getAllActivities,
  getActivityById,
  updateActivity,
  attachActivitiesToRoutines,
} = require("./activities");
const {
  createRoutine,
  getAllRoutines,
  getRoutinesWithoutActivities,
  getAllPublicRoutines,
  getAllRoutinesByUser,
  getPublicRoutinesByUser,
  getPublicRoutinesByActivity,
  getRoutineById,
  updateRoutine,
  destroyRoutine,
} = require("./routines");
const {
  addActivityToRoutine,
  getRoutineActivitiesByRoutine,
  updateRoutineActivity,
  destroyRoutineActivity,
} = require("./routine_activities");

module.exports = {
  createUser,
  getUser,
  getUserById,
  createActivity,
  getAllActivities,
  getActivityById,
  updateActivity,
  createRoutine,
  getAllRoutines,
  getRoutinesWithoutActivities,
  addActivityToRoutine,
  attachActivitiesToRoutines,
  getAllPublicRoutines,
  getAllRoutinesByUser,
  getPublicRoutinesByUser,
  getPublicRoutinesByActivity,
  getRoutineById,
  updateRoutine,
  destroyRoutineActivity,
  destroyRoutine,
  getRoutineActivitiesByRoutine,
  updateRoutineActivity,
  getUserByUsername,
};
