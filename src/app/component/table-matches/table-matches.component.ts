import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatchesService } from 'src/app/services/matches.service';

@Component({
  selector: 'app-table-matches',
  templateUrl: './table-matches.component.html',
  styleUrls: ['./table-matches.component.css']
})
export class TableMatchesComponent implements OnInit {
  matches: any = []
  constructor(private router: Router, private mService: MatchesService) { }

  ngOnInit(): void {
    this.getAllMatches()

  }
  getAllMatches() {
    this.mService.getAllMatches().subscribe((rst) => {
      console.log(rst.matches);
      
      this.matches = rst.matches
    })
    //this.matches = JSON.parse(localStorage.getItem("matches") || "[]")


  }
  deleteMatch(id: any) {
    this.mService.deleteMatch(id).subscribe((res)=>{
      console.log(res.message);
      this.getAllMatches()
      
    })
    //for (let i = 0; i < this.matches.length; i++) {
    // if (this.matches[i].id === id) {
    //  (this.matches.splice(i, 1))
    // localStorage.setItem('matches', JSON.stringify(this.matches))
    // break
    // }

    // }

  }

  navigateTo(id: any, path: any) {

    this.router.navigate([path + id])
    //this.router.navigate(['/match-info/'+id])
    //this.router.navigate([`/match-info/${id}`])
  }
}


