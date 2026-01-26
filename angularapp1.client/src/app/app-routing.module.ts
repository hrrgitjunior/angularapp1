import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from "./structure/mainLayout";
import { CategoryLayoutComponent } from "./structure/categoryLayout";
import { AnalysisLayoutComponent } from "./structure/analysisLayout";
import { PCALayoutComponent } from "./structure/PCALayout";

const routes: Routes = [
  {
    path: '', component: MainLayoutComponent,
    children: [
      {
        path: '', component: CategoryLayoutComponent,
        children: [
          { path: '', component: AnalysisLayoutComponent },
          { path: 'mlanalysis', component: AnalysisLayoutComponent },
          { path: 'pca', component: PCALayoutComponent }
        ]
      }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
