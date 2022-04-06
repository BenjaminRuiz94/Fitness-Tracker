const client = require("./client");

async function createRoutine({ creatorId, isPublic, name, goal }) {
  try {
    const { rows } = await client.query(
      `
        INSERT INTO routines("creatorId", "isPublic", name, goal)
        VALUES ($1, $2, $3, $4)
        RETURNING *;
    `,
      [creatorId, isPublic, name, goal]
    );
    return rows;
  } catch (error) {
    throw error;
  }
}
/*
async function getAllRoutines() {
  try {
    const { rows } = await client.query(`
    SELECT * FROM routines
    JOIN routine_activities ON routine_activities."routineId" = routine.id
    JOIN activities ON routine_activities."activityId" = activities.id
    `);
    console.log(rows, "Here are the rows");
    return rows;
  } catch (error) {
    throw error;
  }
}
*/
async function getRoutinesWithoutActivities() {
  try {
    const { rows } = await client.query(`
    SELECT * FROM routines
    `);
    return rows;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createRoutine,
  getAllRoutines,
  getRoutinesWithoutActivities,
};
