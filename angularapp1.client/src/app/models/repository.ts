import { Injectable } from "@angular/core";
//import { Http, Headers, RequestMethod, Request, Response } from "@angular/http";
//import { ResponseContentType } from '@angular/http';
import { HttpClient, HttpRequest, HttpEvent, HttpResponse } from '@angular/common/http';

@Injectable()
export class Repository {
  tableColumns: any;
  columnTypes: any;
  corr_image_url: string = "";
  isLoaded: boolean = true;
  imgUrl: any;
  mlrStats: any;
  isPythonInit: boolean = false;

  constructor(private http: HttpClient) {
  }

  get_dt_columns() {
    this.isLoaded = false; 
    this.http
      .post('/api/analysis/GetDTColumns', {}, {})
      .subscribe((resp: any) => {
        this.isLoaded = true;
        this.tableColumns = resp.tableColumns;
        this.isPythonInit = true;
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
      }, (error) => {
        // Handle error
      });
  }

  //TO DO
  download_plot() {
    this.http
      .post('/api/exploratory/DownloadPlot', {}, {})
      .subscribe((resp: any) => {
        this.imgUrl = resp.imgUrl;
      }, (error) => {
        // Handle error
      });
  }

  
}
