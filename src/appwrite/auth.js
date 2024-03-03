import conf from "../conf/conf.js";
import {
  Client,
  Account
} from "appwrite";

export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client.setEndpoint(conf.appwriteUrl).setProject(conf.appwriteProjectId);
    this.account = new Account(this.client);
  }

  async createAccount(email, password, name) {
    try {
      const userAccount = await this.account.create(ID.unique(), email, password, name);
      if (userAccount) {
        return this.login({
          email,
          password
        });
      } else {
        throw new Error("Failed to create user account");
      }
    } catch (error) {
      throw error;
    }
  }

  async login(email, password) {
    try {
      return await this.account.createSession(email, password);
    } catch (error) {
      throw error;
    }
  }


  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      console.log("Appwrite service :: gerCurrentUser :: error", error);
    }
    return null;
  }

  async logout() {
    try {
      return await this.account.deleteSession("current");
    } catch (error) {
      throw error;
    }
  }
}

const authservice  = new AuthService();

export default authservice;