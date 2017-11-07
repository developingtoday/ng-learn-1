import { Component } from "@angular/core";
import { Observable } from "rxjs/Rx";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { ReplaySubject } from "rxjs/ReplaySubject";
import "rxjs/add/operator/map";
import "rxjs/add/operator/filter";
import "rxjs/add/operator/switchMap";
import "rxjs/add/operator/concatMap";
import "rxjs/add/operator/withLatestFrom";
import "rxjs/add/operator/scan";
import "rxjs/add/operator/reduce";
import "rxjs/add/operator/skip";
import "rxjs/add/observable/of";
import { OnInit, OnDestroy } from "@angular/core";
import { Http } from "@angular/http";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit, OnDestroy {
  private subj: ReplaySubject<number>;
  private subj2: ReplaySubject<number>;
  public obs: Observable<number>;
  public obsAccum: Observable<number>;
  public obsArr: Observable<any>;
  public arr: any;
  constructor(private http: Http) {}

  ngOnInit() {
    this.subj = new ReplaySubject();
    this.subj2 = new ReplaySubject();
    this.arr = [];
    this.obs = this.subj.asObservable();
    this.obsAccum = this.subj2.asObservable();
    this.obsArr = this.subj2.asObservable();
    this.obsAccum = this.obsAccum.skip(2).scan((acc, value) => {
      return acc + value;
    });
    this.obsArr = this.obsArr.scan((acc, value) => [value, ...acc], []);
    this.obs.subscribe(r => {
      this.arr.push(r);
    });
    this.subj.next(1);
    this.subj2.next(1);
    this.subj2.next(2);
    this.subj.next(2);
    this.subj.next(3);
    this.subj2.next(3);
    this.subj.next(4);
    this.subj2.next(4);
  }

  ngOnDestroy() {
    this.subj.complete();
    this.subj2.complete();
    this.subj.unsubscribe();
    this.subj2.unsubscribe();
  }
}
