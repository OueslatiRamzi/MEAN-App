import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TeamsService } from 'src/app/services/teams.service';

@Component({
  selector: 'app-table-team',
  templateUrl: './table-team.component.html',
  styleUrls: ['./table-team.component.css']
})
export class TableTeamComponent implements OnInit {
  teams: any = []
  constructor(private router: Router, private tService: TeamsService) { }

  ngOnInit(): void {
    this.getAllTeams()
  }

  getAllTeams() {
    this.tService.getAllTeams().subscribe((rst) => {
      console.log(rst.teams);

      this.teams = rst.teams
    })
  }

  deleteTeam(id: any) {
    this.tService.deleteTeam(id).subscribe((res)=>{
      console.log(res.message);
      this.getAllTeams()
      
    })
  }

  navigateTo(id: any, path: any) {

    this.router.navigate([path + id])
  }
}
