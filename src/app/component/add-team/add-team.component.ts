import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TeamsService } from 'src/app/services/teams.service';


@Component({
  selector: 'app-add-team',
  templateUrl: './add-team.component.html',
  styleUrls: ['./add-team.component.css']
})
export class AddTeamComponent implements OnInit {
  addTeamForm !: FormGroup
  team: any = {}
  id : any
  title:string="Add Team"
  msg:string=""
  constructor(private router:Router, private activatedRoute:ActivatedRoute, private tServices:TeamsService) { }

  ngOnInit(): void {
    this.id=this.activatedRoute.snapshot.paramMap.get('id')
    if(this.id !==null){
      this.title = "Edit Team"
      this.getTeamById()
    }
  }

  addEditTeam() {
    if (this.id) {
      //rani fel Edit
      this.tServices.updateTeam(this.team).subscribe((rst)=>{
        
        this.msg=rst.message
        
        this.router.navigate(['table-team'])
      }) 
    }else{
      //rani fel add
      this.tServices.addTeam(this.team).subscribe((rst)=>{
        //console.log(rst.message);
        this.msg=rst.message
        this.router.navigate(['table-team'])
      })
    }
  }


  getTeamById(){

    this.tServices.getTeamById(this.id).subscribe((res)=>{
      console.log(res.team);
      
      this.team=res.team
    })
  }
}
