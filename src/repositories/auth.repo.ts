import BaseRepo from "./base.repo";

class AuthRepo extends BaseRepo {
  async login(credentials) {
    return this.client.post("/users/login", credentials);
  }
  async register(credentials) {
    return this.client.post("/users/register", credentials);
  }
}

export default AuthRepo;