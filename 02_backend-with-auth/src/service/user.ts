import { prismaClient } from "../lib/db";
import crypto from "node:crypto";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "RANDOM_SECRET_KEY";

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined in environment variables");
}

export interface CreateUserPayload {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface GetUserTokenPayload {
  email: string;
  password: string;
}

class UserService {
  public static getUserByEmail(email: string) {
    return prismaClient.user.findUnique({
      where: { email: email },
    });
  }

  public static generateHash(password: string, salt: string) {
    const hashedPassword = crypto
      .createHmac("sha256", salt)
      .update(password)
      .digest("hex");

    return hashedPassword;
  }

  public static async getUserToken(payload: GetUserTokenPayload) {
    const { email, password } = payload;

    const user = await UserService.getUserByEmail(email);

    if (!user) {
      throw new Error("User not found");
    }

    const hashedPassword = UserService.generateHash(password, user.salt);

    if (hashedPassword !== user.password) {
      throw new Error("Invalid password");
    }

    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET);

    return token;
  }

  public static async createUser(payload: CreateUserPayload) {
    const { firstName, lastName, email, password } = payload;

    const saltValue = crypto.randomBytes(16).toString("hex");

    const hashedPassword = UserService.generateHash(password, saltValue);

    const user = await prismaClient.user.create({
      data: {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: hashedPassword,
        salt: saltValue,
      },
    });

    if (!user) {
      throw new Error("Error creating user");
    }

    return user;
  }

  public static decodeJWTToken(token: string) {
    return jwt.verify(token, JWT_SECRET);
  }

  public static async getUserById(id: string) {
    return prismaClient.user.findUnique({
      where: { id: id },
    });
  }
}

export { UserService };
