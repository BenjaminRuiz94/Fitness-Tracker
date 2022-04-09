const express = require("express");
const { getAllPublicRoutines } = require("../db");
const routinesRouter = express.Router();

routinesRouter.get("/", async (req,res,next) =>{
    try {
        const routines = await getAllPublicRoutines()
        res.send(routines)
    } catch (error) {
        throw error;
    }
})






module.exports = routinesRouter;