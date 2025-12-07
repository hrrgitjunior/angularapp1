import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from "./structure/mainLayout";
import { CategoryLayoutComponent } from "./structure/categoryLayout";
import { AnalysisLayoutComponent } from "./structure/analysisLayout";

const routes: Routes = [
  {
    path: '', component: MainLayoutComponent,
    children: [
      {
        path: '', component: CategoryLayoutComponent,
        children: [
          { path: '', component: AnalysisLayoutComponent }
        //  { path: 'api/upload', component: UploadComponent }
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
