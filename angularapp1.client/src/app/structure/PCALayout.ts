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

  get isLoaded(): boolean {
    return this.repo.isLoaded;
  }

  get dtColumns(): any {
    return this.dataStore.getInState(['pca', 'dtColumns']);
  }

  get isPythonInit(): boolean {
    return this.dataStore.getInState(['pca', 'isPythonInit']);
  }

  public get_PCA_components_ratio() {
    this.repo.get_pca_componets_ratio();
  }

  public debug() {
    console.log(this.dataStore);
  }

  
}
