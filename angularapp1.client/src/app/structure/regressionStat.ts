import { Component } from '@angular/core';
import { NgModule } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Repository } from "../models/repository";
import { BasicDataStore } from '../models/stateService';
import { inject } from '@angular/core';



@Component({
  selector: "regression-stat",
  templateUrl: "regrStat.component.html",
  providers: [Repository]
})

export class RegressionStatComponent {
   private dataStore = inject(BasicDataStore);

  constructor(
    private repo: Repository,
    private _route: ActivatedRoute,
    private router: Router,
    private http: HttpClient) {
  }

  get isLoaded(): boolean {
    return this.repo.isLoaded;
  }

  public get_regression_stat() {
    this.repo.get_regression_statistics();
  }

  get mlrStats(): any {
    return this.dataStore.getInState(['analysis', 'regrStat']);
  }


}
