const { attachActivitiesToRoutines } = require("./activities");
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

async function getAllRoutines() {
  try {
    const { rows } = await client.query(`
    SELECT routines.*, users.username as "creatorName"
 FROM routines
    JOIN users ON routines."creatorId" = users.id
    
    `);
    console.log(rows, "Here are the rows");
    return attachActivitiesToRoutines(rows);
  } catch (error) {
    throw error;
  }
}

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

async function getAllPublicRoutines() {
  try {
    const { rows } = await client.query(`
    SELECT routines.*, users.username as "creatorName"
 FROM routines
    JOIN users ON routines."creatorId" = users.id
    WHERE "isPublic" = true
    
    `);
    return attachActivitiesToRoutines(rows);
  } catch (error) {
    throw error;
  }
}

async function getAllRoutinesByUser({ username }) {
  try {
    const { rows } = await client.query(
      `
    SELECT routines.*, users.username as "creatorName"
 FROM routines
    JOIN users ON routines."creatorId" = users.id
    WHERE users.username = $1
    `,
      [username]
    );
    console.log(rows, "THIS SHOULD BE ROUTINES BY USER");
    return attachActivitiesToRoutines(rows);
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createRoutine,
  getAllRoutines,
  getRoutinesWithoutActivities,
  getAllPublicRoutines,
  getAllRoutinesByUser,
};
