import { Component } from '@angular/core';
import { NgModule } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Repository } from "../models/repository";
import { BasicDataStore } from '../models/stateService';
import { inject } from '@angular/core';

declare var $: any;



class DataTablesResponse {
  data: any[] = [];
  draw: number = 0;
  recordsFiltered: number = 0;
  recordsTotal: number = 0;
}


@Component({
  selector: "PCA-layout",
  templateUrl: "PCALayout.component.html",
  providers: [Repository]
})

export class PCALayoutComponent {
  private dataStore = inject(BasicDataStore);
  constructor(
    public repo: Repository,
    private _route: ActivatedRoute,
    private router: Router,
    private http: HttpClient) {
  }

  ngOnInit() {
    console.log("PCA init");
    //  this.repo.get_dt_columns();
  }

  initPython(): void {
    this.repo.get_dt_columns("PCA");
  }

  get dtColumns(): any {
    return this.dataStore.getInState(['pca', 'dtColumns']);
  }

  
}
