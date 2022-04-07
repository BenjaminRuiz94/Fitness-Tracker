const client = require("./client");

async function addActivityToRoutine({
  routineId,
  activityId,
  count,
  duration,
}) {
  const {
    rows: [routine],
  } = await client.query(
    `
    INSERT INTO routine_activities("routineId", "activityId", count, duration)
    VALUES ($1, $2, $3, $4)
    RETURNING *;
    `,
    [routineId, activityId, count, duration]
  );

  return routine;
}

async function getRoutineActivitiesByRoutine({ id }) {
  try {
    const { rows } = await client.query(`
    SELECT * FROM routine_activities
    WHERE "routineId" = ${id}
    `);
    return rows;
  } catch (error) {
    throw error;
  }
}
module.exports = { addActivityToRoutine, getRoutineActivitiesByRoutine };
