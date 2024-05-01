import { IUser } from "../interfaces/user.interface";
import { User } from "../models/user.model";

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
  public async deleteById(id: string): Promise<void> {
    await User.deleteOne({ _id: id });
  }
  public async getByParams(params: Partial<IUser>): Promise<IUser> {
    return await User.findOne(params);
  }
}

export const userRepository = new UserRepository();
