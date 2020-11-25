import {AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import {ApiService} from '../api.service';
import {Router} from '@angular/router';

import { InfiniteScrollModule } from 'ngx-infinite-scroll';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public  lang;
  public page;
  public api_key;
  public data;
  public next_page=1;
  public scroll_top=0;
  throttle = 300;
  scrollDistance = 1;
  scrollUpDistance = 2;
  public posts = [];
  public post ;
  public top:boolean=true;
  public upcoming:boolean=false;
  public open_block:boolean=false;
  public type;
  constructor(private api: ApiService,private router: Router) {

  }

  ngOnInit(){
    this.get_top_rated(1);
  }
  go_to_signup(){
     this.router.navigate(['/sign-up'])
  }

  get_top_rated(page){
    this.lang='en-US' ;
    this.api_key='0bd38f7a4cc67147fd83797326c1623c';
    this.api.top_rated(this.lang,page,this.api_key).subscribe (res=>{
      this.top=true;
      this.upcoming=false;
      if(page==1){
        this.posts = []
      }
      this.next_page++;
      const dict = res['results'];
      for (let i = 0; i < dict.length;i++){
        let post={
          'poster_path':dict[i]['poster_path'],
          'original_title': dict[i]['original_title'],
          'vote_average':dict[i]['vote_average'],
          'vote_count':dict[i]['vote_count'],
          'popularity':dict[i]['popularity'],
        }

        this.posts.push(post);

      }
    })

  }
  get_upcoming(page){
    this.lang='en-US' ;

    this.api_key='0bd38f7a4cc67147fd83797326c1623c';
    this.api.upcoming(this.lang,page,this.api_key).subscribe (res=>{
      this.upcoming=true;
      this.top=false;
      if(page==1){
        this.posts = []
      }
      this.next_page++;
      const dict = res['results'];
      for (let i = 0; i < dict.length;i++){
        let post={
          'poster_path':dict[i]['poster_path'],
          'original_title': dict[i]['original_title'],
          'vote_average':dict[i]['vote_average'],
          'vote_count':dict[i]['vote_count'],
          'popularity':dict[i]['popularity'],
        }

        this.posts.push(post);
      }
    })

  }

  post_details(index){
    if(this.upcoming==true){
      this.type='upcoming';
    }else if(this.top==true)
    {
      this.type='top-rated'
    }
    this.router.navigate(['/details/'+this.type+'/'+index]);

  }

  onScroll() {
    if(this.top){
      this.get_top_rated(this.next_page);
    }else if(this.upcoming){
      this.get_upcoming(this.next_page)
    }
  }
  onUp() {
  }


}
