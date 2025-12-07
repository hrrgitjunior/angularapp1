import { Component, Input } from '@angular/core';
import { Repository } from "../models/repository";


@Component({
  selector: "plot-frame",
  templateUrl: "./plot.component.html"
})

export class PlotComponent {
  @Input() plotUrl: string = "";
  @Input() plotTitle: string = "";
  enableViewPlot: boolean = false;
  isLoadedPlot: boolean = true;

  constructor(private repo: Repository) {
  }

  get isLoaded(): boolean {
    return this.repo.isLoaded;
  }

  enable_view_plot(): void {
    this.enableViewPlot = true;
    this.isLoadedPlot = false;
  }

  onImageLoad(): void {
    console.log("ON IMGAE LOAD");
    this.isLoadedPlot = true;
  }

}
