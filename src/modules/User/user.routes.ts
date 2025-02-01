import { Router } from "express";
import { IUser } from "./user.schema";
import { getUsers, getUser, createUser } from './user.service';

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
        const user: IUser | null = await getUser(req.body);

        if (user)
            res.status(200).json(user);
        else
            res.status(404).json({ message: `This user does not exist`});
    } catch (error){
        res.status(500).json({ message: `An error has occurred with fetching user with id: ${req.body} : ${error}` });
    }
})

router.post("/createUser", async (req, res) => {
    console.log(req.body);
    try {
        const user: IUser = await createUser(req.body);
        res.status(200).json(user);
    } catch (error) {
        if (error instanceof Error && error.message == "Username already in use") {
            res.status(401).json({ message: error.message })
        }
        res.status(500).json({ message: `An error has occurred while creating user: ${error}` });
    }
})

export default router;
