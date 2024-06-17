import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-team-info',
  templateUrl: './team-info.component.html',
  styleUrls: ['./team-info.component.css']
})
export class TeamInfoComponent implements OnInit {
  id: any

  team: any = {}
  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get('idTeam')
    this.getTeamById()
  }
  getTeamById() {
    let teams = JSON.parse(localStorage.getItem("teams") || "[]")
    for (let i = 0; i < teams.length; i++) {
      if (teams[i].id === Number(this.id)) {
        this.team = teams[i]
      }
    }
  }

}
