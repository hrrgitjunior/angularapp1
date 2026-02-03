import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MainLayoutComponent } from "./structure/mainLayout";
import { CategoryLayoutComponent } from "./structure/categoryLayout";
import { AnalysisLayoutComponent } from "./structure/analysisLayout";
import { PCALayoutComponent } from "./structure/PCALayout";
import { TabComponent } from './structure/tab';
import { TabsComponent } from './structure/tabs';
import { ExploratoryComponent } from './structure/exploratory';
import { PlotComponent } from './structure/plot';
import { RegressionStatComponent } from './structure/regressionStat';
import { EvaluationComponent } from './structure/evaluation';
import { InitPythonComponent } from './structure/initPython';
import { ComponentsRatioComponent } from "./structure/componentsRatio";
import { PCAClustersComponent } from "./structure/pcaClusters";
import { HttpErrorModalComponent } from "./structure/httpErrorModal";


import { Repository } from "./models/repository";

import { NavigationService } from "./models/navigation.service"

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    AppComponent,
    MainLayoutComponent,
    CategoryLayoutComponent,
    AnalysisLayoutComponent,
    PCALayoutComponent,
    TabComponent,
    TabsComponent,
    ExploratoryComponent,
    PlotComponent,
    RegressionStatComponent,
    EvaluationComponent,
    InitPythonComponent,
    ComponentsRatioComponent,
    PCAClustersComponent,
    HttpErrorModalComponent
    
  ],
  imports: [
    BrowserModule, HttpClientModule,
    AppRoutingModule,
    NgbModule
  ],
  providers: [Repository, NavigationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
