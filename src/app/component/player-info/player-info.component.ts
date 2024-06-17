import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-player-info',
  templateUrl: './player-info.component.html',
  styleUrls: ['./player-info.component.css']
})
export class PlayerInfoComponent implements OnInit {
  id:any
  
  player:any={}

  constructor(private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.id=this.activatedRoute.snapshot.paramMap.get('idPlayer')
    this.getPlayerById()
  }
  getPlayerById(){
    let players = JSON.parse(localStorage.getItem("players") || "[]")
    for (let i = 0; i < players.length; i++) {
      if(players[i].id === Number(this.id)){
        this.player=players[i]
      }
    }
  }

}
