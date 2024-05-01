import { ApiError } from "../errors/api-error";
import { IUser } from "../interfaces/user.interface";
import { userRepository } from "../repositories/user.repository";
import { passwordService } from "./password.service";

class UserService {
  public async getUsers(): Promise<IUser[]> {
    return await userRepository.getUsers();
  }
  public async createUser(dto: Partial<IUser>): Promise<IUser> {
    const hashedPassword = await passwordService.hashPassword(dto.password);
    return await userRepository.createUser({
      ...dto,
      password: hashedPassword,
    });
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
  public async deleteById(id: string): Promise<void> {
    const user = await userRepository.getById(id);
    if (!user) {
      throw new ApiError("user not found", 404);
    }
    return await userRepository.deleteById(id);
  }
}

export const userService = new UserService();
