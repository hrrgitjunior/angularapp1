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
  selector: "analysis-layout",
  templateUrl: "analysisLayout.component.html",
  providers: [Repository]
})

export class AnalysisLayoutComponent {
  private dataStore = inject(BasicDataStore);

  dTable: any = null;
  hTable: any = null;
  jqDataTable: any = null;
  analysisdata: any = null;
  columns: any;
  isLoadCorr: boolean = false;
 // DataTable = require('datatables.net');
  //dtOptions: DataTables.Settings = {};
  constructor(
    public repo: Repository,
    private _route: ActivatedRoute,
    private router: Router,
    private http: HttpClient) {
  }

  ngOnInit() {
    console.log("analysis init");
  //  this.repo.get_dt_columns();
  }

  initPython(): void {
    this.repo.get_dt_columns("MLR");
  }

  public create_table(): void {
    let that = this;
    if (this.hTable) {
      alert("The data has been loaded already.")
    } else {
      this.dTable = $('#analysTable');
      this.hTable = this.dTable.DataTable({
        layout: {
          topStart: 'pageLength',
          topEnd: 'search',
          bottomStart: 'info',
          bottomEnd: 'paging',
          /*  bottom: [
              'pageLength',
              'info'
            ]*/
        },
        pagingType: 'numbers',
        pageLength: 5,
        serverSide: true,
        processing: true,
        columnDefs: [{
          'targets': 0,
          'searcheble': true,
          'orderable': false,
          'className': 'dt-body-center'
        }],
        ajax: (dataTablesParameters: any, callback: any) => {
          console.log("AJAX PARAMS ===", dataTablesParameters);
          that.http
            .post<any>('/api/analysis', dataTablesParameters, {})
            .subscribe(resp => {
              that.analysisdata = resp.test;
            //  this.columns = this.repo.dtColumns;

              callback({
                recordsTotal: resp.rowNumber,
                //resp.recordsTotal, => from analysiscontroller
                recordsFiltered: resp.rowNumber, //=> from analysiscontroller
                //                resp.recordsFiltered,
                data: resp.data,
                columns: this.repo.dtColumns
              });
            });
        },

        responsive: true,
        //columns: dataanalys_columns,
        columns: this.repo.dtColumns,
        data: this.analysisdata

      });
    }

  
    console.log("analysis after init", this.hTable);

  }

  upload() {
    console.log("==== upload click ====");
    this.repo.isLoaded = false;
    this.isLoadCorr = true;
    //this.router.navigateByUrl("/api/upload");
  }

  exploratory() {
    let that = this;
    this.http
      .post('/api/analysis/ExploratoryColumns', {}, {})
      .subscribe((resp: any) => {
        this.columns = resp.columns;
      }, (error) => {
        // Handle error
      });
  }

  download_plot(): void {
    this.repo.download_plot('corrPlot', {});
  }

  get isLoaded(): boolean {
    return this.repo.isLoaded;
  }

  get isPythonInit(): boolean {
    return this.repo.isPythonInit = true;
  }

  get dtColumns(): any {
    return this.dataStore.getInState(['analysis', 'dtColumns']);
  }

  onImageLoad(): void {
    this.repo.isLoaded = true;
  }


}
