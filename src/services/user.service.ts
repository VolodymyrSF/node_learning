import { userRepository } from "../repositories/user.repository";
import { IUser } from "../user.interface";

class UserService {
  public async getUsers(): Promise<IUser[]> {
    return await userRepository.getUsers();
  }
  public async createUser(dto: Partial<IUser>): Promise<IUser> {
    return await userRepository.createUser(dto);
  }
  public async getById(id: Partial<IUser>): Promise<IUser> {
    return await userRepository.getById(id);
  }
}

export const userService = new UserService();
