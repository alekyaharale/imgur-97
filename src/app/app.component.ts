import { Component } from '@angular/core';
import {ApiService} from './api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public  lang;
  public page;
  public api_key;
  public data;

  constructor(private api: ApiService) {

  }
  get_top_rated(){
    this.lang='en-US';
    this.page=1;
    this.api_key='0bd38f7a4cc67147fd83797326c1623c';
    this.api.top_rated(this.lang,this.page,this.api_key).subscribe (res=>{

      this.data=res['results'];
      console.log(this.data);
     })

  }
}
