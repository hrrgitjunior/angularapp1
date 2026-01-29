import { Component } from '@angular/core';
import { NgModule } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Repository } from "../models/repository";



@Component({
  selector: "pca-clusters",
  templateUrl: "pcaClusters.component.html",
  providers: [Repository]
})

export class PCAClustersComponent {

  constructor(
    private repo: Repository,
    private _route: ActivatedRoute,
    private router: Router,
    private http: HttpClient) {
  }


}
