import BaseRepo from "./base.repo";

class ArtistRepo extends BaseRepo {
  async createArtist(artistData) {
    return this.client.post("/artist/createArtists", artistData);
  }
  async importArtist(formData,headers){
    return this.client.post('/artist/upload-artists/',formData,headers)
  }
  async updateArtistById(artistData,id) {
    return this.client.put(`/artist/updateArtistById/${id}`,artistData);
  }
  async getArtists(page){
    return this.client.get(`/artist/getArtists/${page}`)
  }
  async deleteArtistById(id){
    return this.client.delete(`/artist/deleteArtistById/${id}`)
  }
  async getArtistById(id){
    return this.client.get(`/artist/getArtistById/${id}`)
  }
}

export default ArtistRepo;