const client = require("./client");

async function createActivity({ name, description }) {
  try {
    const {
      rows: [activity],
    } = await client.query(
      `
        INSERT INTO activities(name, description)
        VALUES ($1, $2)
        RETURNING *;
        `,
      [name, description]
    );
    return activity;
  } catch (error) {
    throw error;
  }
}

async function getAllActivities() {
  try {
    const { rows } = await client.query(`
        SELECT * FROM activities

        `);
    return rows;
  } catch (error) {
    throw error;
  }
}

async function getActivityById(id) {
  try {
    const {
      rows: [activities],
    } = await client.query(`
        SELECT * FROM activities
        WHERE id = ${id}
        `);

    if (!activities) {
      return null;
    }

    return activities;
  } catch (error) {
    throw error;
  }
}
/* work starts here
async function updateActivity(id, name, description) {
  const fields = {
    name: name,
    description: description,
  };
  const setString = Object.keys(fields)
    .map((key, index) => `"${key}"=$${index + 1}`)
    .join(", ");

  if (setString.length === 0) {
    return;
  }
  console.log(setString);
  try {
    const {
      rows: [activity],
    } = await client.query(
      `
      UPDATE activities
      SET ${setString},
      WHERE id=${id}
      RETURNING *;
    `,
      Object.values(fields)
    );
    console.log(activity, "Here is the activity!");
    return activity;
  } catch (error) {
    throw error;
  }
}
*/
module.exports = {
  createActivity,
  getAllActivities,
  getActivityById,
  updateActivity,
};
