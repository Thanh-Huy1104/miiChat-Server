import { IUser } from "./user.schema";
import { CreateUserDto } from './user.dto';
import User from './user.schema';


//Return a list of all the users
const getUsers = async (): Promise<IUser[]> => {
    const users: IUser[] = await User.find();
    return users;
}

const getUser = async (userId: number): Promise<IUser | null> => {
    const user: IUser | null = await User.findById(userId);
    return user;
}

const createUser = async (createUserDto: CreateUserDto): Promise<IUser> => {
    //pass in empty array for hotspot id and votes
    return await User.create(createUserDto);

}


module.exports = { getUsers, getUser, createUser };