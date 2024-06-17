import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatchesService } from 'src/app/services/matches.service';

@Component({
  selector: 'app-add-matches',
  templateUrl: './add-matches.component.html',
  styleUrls: ['./add-matches.component.css']
})
export class AddMatchesComponent implements OnInit {
  addMatchForm !: FormGroup
  match: any = {}
  id : any
  title:string="Add Match"
  msg:string=""

  constructor(private router:Router, private activatedRoute:ActivatedRoute, private mServices:MatchesService ) { }

  ngOnInit(): void {
    this.id=this.activatedRoute.snapshot.paramMap.get('id')
    if(this.id !==null){
      this.title = "Edit Match"
      this.getMatchById()
    }
  }
  

  addEditMatch() {
    //let matches = JSON.parse(localStorage.getItem("matches") || '[]')
    if (this.id) {
      //rani fel Edit
      this.mServices.updateMatch(this.match).subscribe((rst)=>{
        
        this.msg=rst.message
        
        this.router.navigate(['table-matches'])
      })
      //for (let i = 0; i < matches.length; i++) {
        //if (matches[i].id === Number(this.id)) {
          //matches[i] = this.match
        //} 
      //}
      
    }else{
      //rani fel add
      this.mServices.addMatch(this.match).subscribe((rst)=>{
        //console.log(rst.message);
        this.msg=rst.message
        this.router.navigate(['table-matches '])
      })
     //// this.match.id = matches.length === 0 ? 1 : matches.at(-1).id +1
    //if (matches.length === 0) {
    //  id=1
    //} else {
    //  id=matches.at(-1).id +1
    //}
    //this.match.id=id
    //// matches.push(this.match)
    }
    //localStorage.setItem("matches", JSON.stringify(matches))
    //this.router.navigate(["table-matches"])
  }


  getMatchById(){

    this.mServices.getMatchById(this.id).subscribe((res)=>{
      this.match=res.match
    })
    /*let matches = JSON.parse(localStorage.getItem("matches") || '[]')
    for (let i = 0; i < matches.length; i++) {
      if (matches[i].id === Number(this.id)) {
        this.match=matches[i] 
      }
      
    }*/
  }
}
