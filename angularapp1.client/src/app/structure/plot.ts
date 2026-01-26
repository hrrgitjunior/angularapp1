import { Component, Input } from '@angular/core';
import { Repository } from "../models/repository";
import { BasicDataStore } from '../models/stateService';
import { inject } from '@angular/core';


@Component({
  selector: "plot-frame",
  templateUrl: "./plot.component.html"
})

export class PlotComponent {
  @Input() pythonUrl: string = "";
 // @Input() plotUrl: string = "";
  @Input() plotTitle: string = "";
  @Input() plotId: string = "";
  @Input() plotName: string = "";
  enableViewPlot: boolean = false;
  isLoadedPlot: boolean = true;

  private dataStore = inject(BasicDataStore);
  constructor(private repo: Repository) {
  }

  get isLoaded(): boolean {
    return this.repo.isLoaded;
  }

  get plotUrl(): string {
    return this.dataStore.getInPlotUrls(this.plotId);
  }

  get isValidUrl(): boolean {
    if (!this.plotUrl)
      return false;
    else return true;
  }


  enable_view_plot(): void {
    this.enableViewPlot = true;
    this.isLoadedPlot = false;
    let plotData = {
      PlotUrl: this.pythonUrl,
      PlotName: this.plotName
    }

    this.repo.download_plot(this.plotId, plotData);
  }

  onImageLoad(): void {
    console.log("ON IMGAE LOAD");
    this.isLoadedPlot = true;
  }

}
