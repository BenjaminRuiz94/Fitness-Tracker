const client = require("./client");

async function createUser({username, password}){
    try {
        const {rows:[user]} = await client.query(`
        INSERT INTO users(username, password)
        VALUES ($1, $2)
        ON CONFLICT (username) DO NOTHING
        RETURNING *;
        `,[username, password])
        delete user.password
        return user;
    } catch (error) {
        throw error
    }
}

async function getUser({username, password}){
    try {
        const {rows: [user]} = await client.query(`
        SELECT * FROM users
        WHERE username = $1 AND password = $2
        `,[username, password])
        if(user.password === password){
            console.log('User: ', user)
           delete user.password
           console.log('user: ', user)
            return user;
        } else {
            return false;
        }
    } catch (error) {
        
    }
}

module.exports = {
    createUser,
    getUser
}
