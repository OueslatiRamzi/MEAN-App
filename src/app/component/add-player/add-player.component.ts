import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PlayersService } from 'src/app/services/players.service';
import { TeamsService } from 'src/app/services/teams.service';

@Component({
  selector: 'app-add-player',
  templateUrl: './add-player.component.html',
  styleUrls: ['./add-player.component.css']
})
export class AddPlayerComponent implements OnInit {
  addPlayerForm !: FormGroup
  player: any = {}
  id : any
  title:string="Add Player"
  msg:string=""
  teams: any = []
  imagePreview=""
  fileImage:any

  constructor(private router:Router, private activatedRoute:ActivatedRoute, private pServices:PlayersService, private tServices:TeamsService) { }

  ngOnInit(): void {
    this.getAllTeams()
    this.id=this.activatedRoute.snapshot.paramMap.get('id')
    if(this.id !==null){
      this.title = "Edit Player"
      this.getPlayerById()
    }

  }

  addEditPlayer() {
    if (this.id) {
      //rani fel Edit
      this.pServices.updatePlayer(this.player).subscribe((rst)=>{
        
        this.msg=rst.message
        
        this.router.navigate(['table-player'])
      })
    }else{
      //rani fel add
      this.pServices.addPlayer(this.player, this.fileImage).subscribe((rst)=>{
        console.log(rst.message);
        this.msg=rst.message
        
        this.router.navigate(['table-player'])
      })
    }
  }
  getAllTeams(){
    this.tServices.getAllTeams().subscribe((res)=>{
      this.teams=res.teams
    })
  }


  getPlayerById(){
    this.pServices.getPlayerById(this.id).subscribe((res)=>{
      this.player=res.player
    })
  }

  onImageSelected(event:any){
    // const file = (event.target as HTMLInputElement).files[0];
    const file =  event.target.files[0]
    this.fileImage=file

 
    const reader = new FileReader();
    reader.onload = () => {
    this.imagePreview = reader.result as string
    };
    reader.readAsDataURL(file);
  }
}
