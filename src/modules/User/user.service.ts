import { IUser } from "./user.schema";
import { CreateUserDto } from './user.dto';

const User = require('./user.schema');


//Return a list of all the users
const getUsers = async (): Promise<IUser[]> => {
    const users: IUser[] = await User.find();
    return users;
}

const getUser = async (userId: number): Promise<IUser> => {
    const user: IUser = await User.findById(userId);
    return user;
}

const createUser = async (createUserDto: CreateUserDto): Promise<IUser> => {
    //pass in empty array for hotspot id and votes

    const userData = {
        ...createUserDto,
        HotspotIDs: [],
        Votes: [],
        createdAt: Date.now()
    }

    const user: IUser = await User.create(userData);
    return user;

}


module.exports = { getUsers, getUser, createUser };