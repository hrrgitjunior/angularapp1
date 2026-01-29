import {Injectable} from '@angular/core';
@Injectable({ providedIn: 'root' })

export class BasicDataStore {
  
  getFirst(coll: any[]): any {
    return coll[0];
  }

  getRest(coll: any[]): any[] {
    let first = coll.shift();
    return coll;
  }

  public baseState: { [key: string]: any } = {
    'analysis': {
      'isPythonInit': false,
      'dtColumns': {},
      'explorColumns': {},
      'regrStat': {},
      'plotUrls': new Map([
          ['corrPlot', ''],
          ['regr1', ''],
          ['regr2', ''],
          ['regr3', ''],
          ['regr4', ''],
          ['densPlot', ''],
          ['residPlot1', ''],
          ['residPlot2', '']
        ])
    },

    'pca': {
      'isPythonInit': false,
      'dtColumns': {},
      'componentsRatio': [],
      'plotUrls': new Map([
        ['elbowPlot', ''],
        ['bpwClusters', '']
      ])
    }
  }

  private assignIn(obj: any, keys: string[], val: any): void {
    let key: string = this.getFirst(keys);
    if (keys.length == 1) {
      obj[key] = val;
    } else {
      keys = this.getRest(keys);
      this.assignIn(obj[key], keys, val);
    }
  }

  public updateInState(keys: string[], val: any): void {
    this.assignIn(this.baseState, keys, val);
    
  }

  getIn(obj: any, keys: string[]): any {
    let key: string = this.getFirst(keys);
    if (keys.length == 1) {
      return obj[key];
    } else {
      keys = this.getRest(keys);
      return this.getIn(obj[key], keys);
    }
  }

  getInState(keys: string[]): any {
      return this.getIn(this.baseState, keys);
  }

  public updateInPlotUrls(statePlotPath:string[], plotId: string, plotUrl: string): void {
    let regrPlots = this.getInState(statePlotPath);
    regrPlots.set(plotId, plotUrl);
    this.updateInState(['analysis', 'plotUrls'], regrPlots);
  }

  getInPlotUrls(statePlotPath: string[], plotId: string): string {
    let regrPlots = this.getInState(statePlotPath);
    return regrPlots.get(plotId);
  }


}
