import BaseRepo from "./base.repo";

class UserRepo extends BaseRepo {
    async getUserById(id) {
        return this.client.get(`/users/getUserById/${id}`)
    }
    async updateUserById(userData,id){
        return this.client.put(`/users/updateUserById/${id}`,userData)
    }
}

export default UserRepo;