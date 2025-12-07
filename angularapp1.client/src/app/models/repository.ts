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

  constructor(private http: HttpClient) {
  }

  get_dt_columns() {
    this.isLoaded = false; 
    this.http
      .post('/api/analysis/GetDTColumns', {}, {})
      .subscribe((resp: any) => {
        this.isLoaded = true;
        this.tableColumns = resp.tableColumns;
        console.log("==== repository tableColumns ===", this.tableColumns);
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
        console.log("==== repository columnTypes ===", resp.columnTypes);
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
        console.log("==== repository mlrStats ===", resp.mlrStats);
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
