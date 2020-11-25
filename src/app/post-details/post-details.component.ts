import { Component, OnInit } from '@angular/core';
import {ApiService} from '../api.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.css']
})
export class PostDetailsComponent implements OnInit {
  public lang;
  public api_key;
  public data;
  public id:number;
  public type;
  public post_title;
  public post_image;
  public posts = [];
  public side_posts = [];
  public post ;
  public next_page=1;

  constructor(private api: ApiService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.lang = 'en-US';
    this.api_key = '0bd38f7a4cc67147fd83797326c1623c';
    this.route.paramMap.subscribe(params => {
      let id_string = params.get('index');
      this.id = Number(id_string);
      this.type = params.get('type');
      console.log(this.id);
      console.log(this.type);
    });
    if(this.type=='upcoming'){
      this.get_upcoming(1)
    }else if(this.type=='top-rated'){
      this.get_rated(1)
    }



  }
  get_rated(page){
  this.api.top_rated(this.lang, page, this.api_key).subscribe(res => {
    if(page==1){
      this.posts = []
    }
    this.next_page++;
    const dict = res['results'];
    this.data = res['results'];
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
    let current_id=this.id;
    for (let i = 1; i < 5;i++){
      let post={
        'poster_path':dict[current_id+i]['poster_path'],
        'original_title': dict[current_id+i]['original_title'],
        'vote_average':dict[current_id+i]['vote_average'],
        'vote_count':dict[current_id+i]['vote_count'],
        'popularity':dict[current_id+i]['popularity'],
      }
      this.side_posts.push(post);
    }

  });

  }
  get_upcoming(page){
    this.api.upcoming(this.lang,page,this.api_key).subscribe (res=>{
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

      let current_id=this.id;
      for (let i = 1; i < 5;i++){
        let post={
          'poster_path':dict[current_id+i]['poster_path'],
          'original_title': dict[current_id+i]['original_title'],
          'vote_average':dict[current_id+i]['vote_average'],
          'vote_count':dict[current_id+i]['vote_count'],
          'popularity':dict[current_id+i]['popularity'],
        }
        this.side_posts.push(post);
      }

    })

  }

  next(){
    this.id++;
    let last_index=this.id+4;


      let post = {
        'poster_path': this.data[last_index]['poster_path'],
        'original_title': this.data[last_index]['original_title'],
        'vote_average': this.data[last_index]['vote_average'],
        'vote_count': this.data[last_index]['vote_count'],
        'popularity': this.data[last_index]['popularity'],
      }
      this.side_posts.splice(0, 1);
      this.side_posts.push(post);

    console.log(this.side_posts)
    if(this.id%20 == 0){
      console.log('by 20');
      if(this.type=='upcoming'){
        this.get_upcoming(this.next_page);
      }else if(this.type=='top-rated'){
        this.get_rated(this.next_page);
      }
    }
  }
  previous(){
    this.id--;
    let post = {
      'poster_path': this.data[this.id+1]['poster_path'],
      'original_title': this.data[this.id+1]['original_title'],
      'vote_average': this.data[this.id+1]['vote_average'],
      'vote_count': this.data[this.id+1]['vote_count'],
      'popularity': this.data[this.id+1]['popularity'],
    }
    this.side_posts.splice(-1, 1);
    this.side_posts.splice(0, 0, post)

  }
}
