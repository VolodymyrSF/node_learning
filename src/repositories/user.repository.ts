import { ApiError } from "../api-error";
import { reader, writer } from "../fs.service";
import { IUser } from "../user.interface";

class UserRepository {
  public async getUsers(): Promise<IUser[]> {
    return await reader();
  }
  public async createUser(dto: Partial<IUser>): Promise<IUser> {
    const users = await reader();
    const newUser: IUser = {
      id: users[users.length - 1].id + 1,
      name: dto.name,
      email: dto.email,
      password: dto.password,
    };
    users.push(newUser);
    await writer(users);
    return newUser;
  }
  public async getById(id: number): Promise<IUser> {
    const users = await reader();
    const user = users.find((user) => user.id === id);
    return user;
  }
  public async putById(data: Partial<IUser>, id: number): Promise<IUser> {
    const { name, email, password } = data;
    const users = await reader();
    const index = users.findIndex((user) => user.id === id);
    if (index === -1) {
      throw new ApiError("user not found", 404);
    }
    const newPutUser = (users[index] = {
      ...users[index],
      name,
      email,
      password,
    });
    await writer(users);
    return newPutUser;
  }
  public async deleteById(id: number): Promise<IUser[]> {
    const users = await reader();
    const index = users.findIndex((user) => user.id === id);
    if (index === -1) {
      throw new ApiError("user not found", 404);
    }
    users.splice(index, 1);
    await writer(users);
    const newUsers = await reader();
    return newUsers;
  }
}

export const userRepository = new UserRepository();
