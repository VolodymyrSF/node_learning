import { User } from "../models/user.model";
import { IUser } from "../user.interface";

class UserRepository {
  public async getUsers(): Promise<IUser[]> {
    return await User.find({});
  }
  public async createUser(dto: Partial<IUser>): Promise<IUser> {
    return await User.create(dto);
  }
  public async getById(id: string): Promise<IUser> {
    return await User.findById(id);
  }
  public async putById(data: Partial<IUser>, id: string): Promise<IUser> {
    return await User.findByIdAndUpdate(id, data, {
      returnDocument: "after",
    });
  }
  public async deleteById(id: string): Promise<IUser[]> {
    await User.deleteOne({ _id: id });
    return await User.find({});
  }
}

export const userRepository = new UserRepository();
