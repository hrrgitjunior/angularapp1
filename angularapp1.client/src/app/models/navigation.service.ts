import { Injectable } from "@angular/core";
import { Router, ActivatedRoute, NavigationEnd } from "@angular/router";
import { Repository } from "../models/repository";
import { filter, map } from "rxjs/operators";

@Injectable()

export class NavigationService {
  breadcrumbList: Array<any> = [];

  constructor(private repo: Repository, private router: Router,
    private route: ActivatedRoute) {
    router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        map(() => this.rootRoute(this.route)),
        filter((route: ActivatedRoute) => route.outlet === 'primary'),)
      .subscribe((route: ActivatedRoute) => {
        this.handleNavigationChange(route);
      })
  }

  private rootRoute(route: ActivatedRoute): ActivatedRoute {
    while (route.firstChild) {
      route = route.firstChild;
    }
    return route;
  }

  private handleNavigationChange(route: any) {
    /*    console.log("HANDLE NAVIGATION ROUTE ===", route);
        console.log("HANDLE NAVIGATION CATEGORY ===", route.snapshot.paramMap.get('category'));
        console.log("HANDLE NAVIGATION PAGE ===", route.snapshot.paramMap.get('page'));
        console.log("HANDLE NAVIGATION URL PATH ===", route.url.value);*/

    
  }

 
  set currentCategory(newCategory: string) {
       this.router.navigate(['', newCategory], { relativeTo: this.route });
    }

  
}
