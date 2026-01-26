import { Component, Input } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from "@angular/router";
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Repository } from "../models/repository";
declare var $: any;


@Component({
  selector: 'init-python',
  templateUrl: './initpython.component.html'
 })


export class InitPythonComponent {
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
    this.repo.get_dt_columns();
  }

  public create_table(): void {
    let that = this;
    if (this.hTable) {
      alert("The data has been loaded already.")
    } else {
      this.dTable = $('#analysTable2');
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
          dataTablesParameters.filter = { field: "week", value: 10 };
          console.log("AJAX PARAMS ===", dataTablesParameters);
          that.http
            .post<any>('/api/analysis', dataTablesParameters, {})
            .subscribe(resp => {
              that.analysisdata = resp.test;
              this.columns = this.repo.tableColumns;

              callback({
                recordsTotal: resp.rowNumber,
                //resp.recordsTotal, => from analysiscontroller
                recordsFiltered: resp.rowNumber, //=> from analysiscontroller
                //                resp.recordsFiltered,
                data: resp.data,
                columns: this.repo.tableColumns
              });
            });
        },

        responsive: true,
        //columns: dataanalys_columns,
        columns: this.repo.tableColumns,
        data: this.analysisdata

      });
    }


    console.log("analysis after init", this.hTable);

  }

  
  get isPythonInit(): boolean {
    return this.repo.isPythonInit = true;
  }

  
}


