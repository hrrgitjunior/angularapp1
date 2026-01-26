import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NavigationService } from "./models/navigation.service";

interface WeatherForecast {
  date: string;
  temperatureC: number;
  temperatureF: number;
  summary: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  public forecasts: WeatherForecast[] = [];

  constructor(private http: HttpClient,
              private navigServ: NavigationService) {
  }

  ngOnInit() {
    
  }

  setCategory(category: string) {
    this.navigServ.currentCategory = category;
  }

  title = 'angularapp1.client';
}
