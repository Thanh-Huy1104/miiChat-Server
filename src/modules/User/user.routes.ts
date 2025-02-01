import { Router } from "express";
import { IUser } from "./user.schema";

const { getUsers, getUser, createUser }  = require("./user.service");

const router = Router();

router.get("/getUsers", async (_, res) => {
    try {
        const users: IUser[] = await getUsers();
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json({ message: `An error has occurred with fetching users: ${error}` });
    }
    }
);

router.get("/getUser", async (req, res) => {
    try {
        const user: IUser = await getUser(req.body);
        res.status(200).json(user);
    } catch (error){
        res.status(500).json({ message: `An error has occurred with fetching user with id: ${req.body} : ${error}` });
    }
})

router.post("/createUser", async (req, res) => {
    try {
        const user: IUser = await createUser(req.body);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: `An error has occurred while creating user: ${error}` });
    }
})

export default router;
