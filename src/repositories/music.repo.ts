import BaseRepo from "./base.repo";

class MusicRepo extends BaseRepo {
  async createMusic(musicData) {
    return this.client.post("/music/createMusic", musicData);
  }
  async updateMusicById(artistData,id) {
    return this.client.put(`/music/updateMusicById/${id}`,artistData);
  }
  async getMusic(id,page){
    return this.client.get(`/music/getMusic/${id}/${page}`)
  }
  async deleteMusicById(id){
    return this.client.delete(`/music/deleteMusicById/${id}`)
  }
  async getMusicById(id){
    return this.client.get(`/music/getMusicById/${id}`)
  }
}

export default MusicRepo;