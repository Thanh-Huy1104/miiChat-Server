import { IUser } from "./user.schema";
import { CreateUserDto } from './user.dto';
import User from './user.schema';
import { v4 as uuidv4 } from 'uuid';


//Return a list of all the users
const getUsers = async (): Promise<IUser[]> => {
    const users: IUser[] = await User.find();
    return users;
}

const getUser = async (userId: number): Promise<IUser> => {
    const user: IUser | null = await User.findOne({userId});

    //If user does not exist, throw error so the api returns 500 status code
    if (!user) {
        throw new Error("User not found");
    }

    return user;
}

const createUser = async (createUserDto: CreateUserDto): Promise<IUser> => {
    const user = {
      userID: uuidv4(),
      ...createUserDto
    }

    //find user with username and if null then create and if not null then throw error
    //check if username already exists in database
    const userCheck: IUser | null = await User.findOne({username: createUserDto.username})

    if (userCheck) {
        throw new Error("This username is already in use.")
    }

    return await User.create(user);

}

export { getUsers, getUser, createUser };