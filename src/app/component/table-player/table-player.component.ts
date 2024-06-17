import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PlayersService } from 'src/app/services/players.service';
@Component({
  selector: 'app-table-player',
  templateUrl: './table-player.component.html',
  styleUrls: ['./table-player.component.css']
})
export class TablePlayerComponent implements OnInit {
  players: any = []
  constructor(private router:Router, private pService: PlayersService) { }

  ngOnInit(): void {
    this.getAllPlayers()
  }
  
  getAllPlayers() {
    this.pService.getAllPlayers().subscribe((rst) => {
      console.log("here all players",rst.players);
      
      this.players = rst.players
    })
  }
  deletePlayer(id: any) {
    this.pService.deletePlayer(id).subscribe((res)=>{
      console.log(res.message);
      this.getAllPlayers()
      
    })
  }
  
  navigateTo(id: any, path: any) {

    this.router.navigate([path + id])
  }

}

