import {Component, Injectable} from '@angular/core';
import {Http, URLSearchParams} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/merge';

@Injectable()
export class SeverService {

  constructor(private http:Http) { }

  getData(){
    var start_time = new Date().getTime()
return this.http.get('https://jsonplaceholder.typicode.com/comments').map(res=>{
  return {

    timeInSeconds:(new Date().getTime()-start_time)/1000,
    data:res.json()

  }
});
  }

}
