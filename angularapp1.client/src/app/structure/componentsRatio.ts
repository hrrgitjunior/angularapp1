import { Component } from '@angular/core';
import { NgModule } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Repository } from "../models/repository";
import { BasicDataStore } from '../models/stateService';
import { inject } from '@angular/core';



@Component({
  selector: "components-ratio",
  templateUrl: "componentsRatio.component.html",
  providers: [Repository]
})

export class ComponentsRatioComponent {
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

  public get_PCA_components_ratio() {
    this.repo.get_pca_componets_ratio();
  }

  get componentsRatio(): any {
    return this.dataStore.getInState(['pca', 'componentsRatio'])
  }


}
