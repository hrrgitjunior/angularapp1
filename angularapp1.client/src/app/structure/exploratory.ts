import { Component } from '@angular/core';
import { NgModule } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Repository } from "../models/repository";
import { BasicDataStore } from '../models/stateService';
import { inject } from '@angular/core';



@Component({
  selector: "exploratory-layout",
  templateUrl: "exploratory.component.html",
  providers: [Repository]
})

export class ExploratoryComponent {
  private dataStore = inject(BasicDataStore);

  constructor(
    private repo: Repository,
    private _route: ActivatedRoute,
    private router: Router,
    private http: HttpClient) {
  }

  get columnTypes(): any {
    return this.repo.columnTypes
    //return this.repo.products;
  }

  public downloaded_plot_url(plotId: string): any {
    return this.dataStore.getInPlotUrls(plotId);
  }

  public get_exploratory_columns() {
    this.repo.exploratory_get_columns();
  }

  get isLoaded(): boolean {
    return this.repo.isLoaded;
  }

  public set_to_state() {
    this.dataStore.updateInState(['analysis', 'corrPlot'], "TEST ASSIGN IN");
  }

  public get_from_state() {
    let corrPlot = this.dataStore.getInPlotUrls('corrPlot');
    console.log("CORR PLOTS ===", corrPlot);
    console.log("=== GET FROM STATE ===", this.dataStore.baseState);
  }

}
