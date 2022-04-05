// require and re-export all files in this db directory (users, activities...)
const { createUser, getUser, getUserById } = require("./users");
const {
  createActivity,
  getAllActivities,
  getActivityById,
  updateActivity,
} = require("./activities");

module.exports = {
  createUser,
  getUser,
  getUserById,
  createActivity,
  getAllActivities,
  getActivityById,
  updateActivity,
};
