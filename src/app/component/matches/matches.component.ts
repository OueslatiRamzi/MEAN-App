import { Component, OnInit } from '@angular/core';
import { MatchesService } from 'src/app/services/matches.service';

@Component({
  selector: 'app-matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.css']
})
export class MatchesComponent implements OnInit {
  term : any
  matches: any = []
  constructor(private mService: MatchesService) { }

  ngOnInit(): void {
    this.getAllMatches()
    
  }
  getAllMatches() {
    this.mService.getAllMatches().subscribe((rst) => {
      console.log(rst.matches);
      
      this.matches = rst.matches
    })

  }
  deleteMatch(id:any){
    for (let i = 0; i < this.matches.length; i++) {
      if (this.matches[i].id === id) {
        (this.matches.splice(i, 1))
        localStorage.setItem('matches', JSON.stringify(this.matches))
        break
      }
    }
  }
}
