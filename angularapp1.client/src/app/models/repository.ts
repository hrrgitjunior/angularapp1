import { Injectable } from "@angular/core";
//import { Http, Headers, RequestMethod, Request, Response } from "@angular/http";
//import { ResponseContentType } from '@angular/http';
import { HttpClient, HttpRequest, HttpEvent, HttpResponse } from '@angular/common/http';
import { BasicDataStore } from '../models/stateService';
import { inject } from '@angular/core';



@Injectable({
  providedIn: 'root'
})

export class Repository {
  private dataStore = inject(BasicDataStore);

  dtColumns: any;
  columnTypes: any;
  corr_image_url: string = "";
  isLoaded: boolean = true;
  imgUrl: any;
  mlrStats: any;
  isPythonInit: boolean = false;
  analysUrls = new Map([
    ['p1', ''],
    ['p2', ''],
  ]);
  
  

 // https://localhost:7240/corr.jpg
  
  constructor(private http: HttpClient) {
  }

  get_dt_columns(analysType: string) {
    this.isLoaded = false; 
    this.http
      .post('/api/analysis/GetDTColumns', { AnalysType: analysType}, {})
      .subscribe((resp: any) => {
        this.isLoaded = true;
        this.dtColumns = resp.tableColumns;
        this.isPythonInit = true;
        switch (analysType) {
          case "MLR": {
            this.dataStore.updateInState(['analysis', 'dtColumns'], resp.tableColumns);
            break;
          }
          case "PCA": {
            this.dataStore.updateInState(['pca', 'dtColumns'], resp.tableColumns);
            break;
          }
        }
      }, (error) => {
        // Handle error
      });
  }

  exploratory_get_columns() {
    this.isLoaded = false;
    this.http
      .post('/api/exploratory/ExploratoryColumns', {}, {})
      .subscribe((resp: any) => {
        this.isLoaded = true;
        this.columnTypes = resp;
        this.dataStore.updateInState(['analysis', 'explorColumns'], resp)
      }, (error) => {
        // Handle error
      });
  }

  get_regression_statistics() {
    this.isLoaded = false; 
    this.http
      .post('/api/analysis/MLRegressionStats', {}, {})
        .subscribe((resp: any) => {
        this.isLoaded = true;
        this.mlrStats = resp;
        this.dataStore.updateInState(['analysis', 'regrStat'], resp)
      }, (error) => {
        // Handle error
      });
  }
  
  download_plot(plotId: string, plotData: any) {
    this.http
      .post('/api/analysis/GetPlot', plotData, {})
      .subscribe((resp: any) => {
        this.isLoaded = true;
        this.dataStore.updateInPlotUrls(['analysis', 'plotUrls'], plotId, resp.plotUrl);
      }, (error) => {
        // Handle error
      });
  }

  get_pca_componets_ratio() {
    this.isLoaded = false;
    this.http
      .post('/api/pca/GetPCAComponentsRatio', {}, {})
      .subscribe((resp: any) => {
        this.isLoaded = true;
        console.log("GET PCA COMPONENTS RATION ===", resp);
        this.dataStore.updateInState(['pca', 'componentsRatio'], resp.componentsRatio)
        
      }, (error) => {
        // Handle error
      });
  }

   
}
