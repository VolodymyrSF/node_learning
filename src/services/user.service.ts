import { ApiError } from "../api-error";
import { userRepository } from "../repositories/user.repository";
import { IUser } from "../user.interface";

class UserService {
  public async getUsers(): Promise<IUser[]> {
    return await userRepository.getUsers();
  }
  public async createUser(dto: Partial<IUser>): Promise<IUser> {
    return await userRepository.createUser(dto);
  }
  public async getById(id: string): Promise<IUser> {
    const user = await userRepository.getById(id);
    if (!user) {
      throw new ApiError("user not found", 404);
    }
    return user;
  }
  public async putById(data: Partial<IUser>, id: string) {
    const user = await userRepository.getById(id);
    if (!user) {
      throw new ApiError("user not found", 404);
    }
    return await userRepository.putById(data, id);
  }
  public async deleteById(id: string): Promise<IUser[]> {
    const user = await userRepository.getById(id);
    if (!user) {
      throw new ApiError("user not found", 404);
    }
    return await userRepository.deleteById(id);
  }
}

export const userService = new UserService();
