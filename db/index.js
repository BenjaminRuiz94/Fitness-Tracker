// require and re-export all files in this db directory (users, activities...)
const { createUser, getUser, getUserById } = require("./users");
const {
  createActivity,
  getAllActivities,
  getActivityById,
  updateActivity,
} = require("./activities");
const {
  createRoutine,
  getAllRoutines,
  getRoutinesWithoutActivities,
} = require("./routines");
const { addActivityToRoutine } = require("./routine_activities");

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
};
