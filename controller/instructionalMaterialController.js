const express = require("express");
const router = express.Router();

const lmModel = require("../model/instructionalModel");

router.get("/", async (req, res) => {
    try {
        console.time("GET instructional materials");
        const result = await lmModel.getLearningMaterials();

        res.status(200).json(result);
    } catch (err) {
        if (err instanceof Error || err instanceof MongoError)
            res.status(500).send({
                error: err.message,
                code: "DATABASE_ERROR",
            });
        else
            res.status(500).send({
                error: "Error getting instructional materials",
                code: "UNEXPECTED_ERROR",
            });
    } finally {
        console.timeEnd("GET instructional materials");
    }
});

router.post("/", async (req, res) => {
    const data = req.body;
    try {
        console.time("POST instructional material");
        const result = await lmModel.createLearningMaterials(data);

        res.status(200).send({ new_id: result._id });
    } catch (err) {
        if (err instanceof Error || err instanceof MongoError)
            res.status(500).send({
                error: err.message,
                code: "DATABASE_ERROR",
            });
        else
            res.status(500).send({
                error: "Error creating instructional material",
                code: "UNEXPECTED_ERROR",
            });
    } finally {
        console.timeEnd("POST instructional material");
    }
});

router.delete("/", async (req, res) => {
    const { lmId } = req.query;
    try {
        console.time("DELETE instructional material by id");
        const result = await lmModel.deleteLearningMaterials(lmId);

        res.status(200).send({
            message: "Instructional material Deleted",
            lmId: result._id,
        });
    } catch (err) {
        if (err == "NOT_FOUND")
            res.status(404).send({
                error: "Learning Material ID not found",
                code: err,
            });
        else if (err instanceof Error || err instanceof MongoError)
            res.status(500).send({
                error: err.message,
                code: "DATABASE_ERROR",
            });
        else
            res.status(500).send({
                error: "Error deleting Learning Material",
                code: "UNEXPECTED_ERROR",
            });
    } finally {
        console.timeEnd("DELETE instructional material by id");
    }
});

router.put("/", async (req, res) => {
    const { lmId } = req.query;
    const data = req.body;

    try {
        console.time("PUT skill");
        const result = await lmModel.updateLearningMaterials(lmId, data);

        res.status(200).send({
            message: "Learning Material update",
            lmId: result._id,
        });
    } catch (err) {
        if (err == "NOT_FOUND")
            res.status(404).send({ error: "Skill ID not found", code: err });
        else if (err instanceof Error || err instanceof MongoError)
            res.status(500).send({
                error: err.message,
                code: "DATABASE_ERROR",
            });
        else
            res.status(500).send({
                error: "Error updating skill by id",
                code: "UNEXPECTED_ERROR",
            });
    } finally {
        console.timeEnd("PUT skill");
    }
});
