import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MainLayoutComponent } from "./structure/mainLayout";
import { CategoryLayoutComponent } from "./structure/categoryLayout";
import { AnalysisLayoutComponent } from "./structure/analysisLayout";
import { TabComponent } from './structure/tab';
import { TabsComponent } from './structure/tabs';
import { ExploratoryComponent } from './structure/exploratory';
import { PlotComponent } from './structure/plot';
import { RegressionStatComponent } from './structure/regressionStat';
import { EvaluationComponent } from './structure/evaluation';



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
    MainLayoutComponent,
    CategoryLayoutComponent,
    AnalysisLayoutComponent,
    TabComponent,
    TabsComponent,
    ExploratoryComponent,
    PlotComponent,
    RegressionStatComponent,
    EvaluationComponent
  ],
  imports: [
    BrowserModule, HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
