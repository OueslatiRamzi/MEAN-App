import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PlayersService {

  playerUrl = "http://localhost:3000/players"

  constructor(private httpClient: HttpClient) { }

  addPlayer(data: any, file:File) {
    const formData= new FormData()

    formData.append('image',file)
    formData.append('name',data.name)
    formData.append('number',data.number)
    formData.append('post',data.post)
    formData.append('teamId',data.teamId)

    return this.httpClient.post<{ message: any }>(this.playerUrl,formData)
  }

  getAllPlayers() {
    return this.httpClient.get<{ players: any }>(this.playerUrl)
  }

  deletePlayer(id: any) {
    return this.httpClient.delete<{ message: any }>(`${this.playerUrl}/${id}`)
  }

  getPlayerById(id: any) {
    return this.httpClient.get<{ player: any }>(`${this.playerUrl}/${id}`)
  }
  updatePlayer(data: any) {
    return this.httpClient.put<{ message: any }>(this.playerUrl, data)
  }
}
