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

async function updateRoutineActivity(fields = {}) {
  const { id } = fields;
  const setString = Object.keys(fields)
    .map((key, index) => `"${key}"=$${index + 1}`)
    .join(", ");

  if (setString.length === 0) {
    return;
  }

  try {
    if (setString.length > 0) {
      const {
        rows: [routine_activity],
      } = await client.query(
        `
      UPDATE routine_activities
      SET ${setString}
      WHERE id=${id}
      RETURNING *;
    `,
        Object.values(fields)
      );

      return routine_activity;
    }
  } catch (error) {
    throw error;
  }
}

async function destroyRoutineActivity(id) {
  try {
    const {
      rows: [deletedRoutine],
    } = await client.query(
      `
    DELETE FROM routine_activities
    WHERE id = $1
    RETURNING *;
    `,
      [id]
    );
    return deletedRoutine;
  } catch (error) {
    throw error;
  }
}

async function getRoutineActivityById(id) {
  try {
    const {
      rows: [routineActivity],
    } = await client.query(
      `
    SELECT * FROM routine_activities
    WHERE id = $1
    `,
      [id]
    );
    return routineActivity;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  addActivityToRoutine,
  getRoutineActivitiesByRoutine,
  updateRoutineActivity,
  destroyRoutineActivity,
  getRoutineActivityById,
};
