import User, { IUser } from "../User/user.schema";

export const loginUser = async (username: string, password: string): Promise<IUser | null> => {
  try {
    const user: IUser | null = await User.findOne({ username, password });

    return user;
  } catch (error) {
    console.error(error);
    return null;
  }
};
