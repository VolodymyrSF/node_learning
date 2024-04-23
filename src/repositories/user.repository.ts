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
  public async getById(id: Partial<IUser>): Promise<IUser> {
    const users = await reader();
    console.log(id);
    const user = users.find((user) => user.id === id);
    return user;
  }
}

export const userRepository = new UserRepository();
