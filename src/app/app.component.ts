

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { SelectItem } from 'primeng/api';
import { map } from 'rxjs/operators';
import { ServiceService } from 'src/service/service.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'weather';





  weatherConditions: any[]=[];
  selectedCondition: any;
  forecastData: any[] = [];
  filteredData: any[] =[];
  test_data: any[] =["all", "data"];

  constructor(private ServiceService: ServiceService) { }

  ngOnInit(): void {
    this.ServiceService.getWeatherConditions().subscribe({
      next: (data) => {
        this.weatherConditions = data.wethercondition.map((item: { condition: string })=> item.condition);

      },
      error: (error) => {
        console.log('Error fetching weather conditions:', error);
      }
      
    });

    this.ServiceService.getWeatherData().subscribe((forecast) => {
      this.forecastData = forecast.data;
      this.filteredData = this.forecastData;
    });
  }

  

  filterData() {
    if (this.selectedCondition && this.selectedCondition !== 'All') {
      this.filteredData = this.forecastData.filter(item => item.condition === this.selectedCondition);
    } else {
      this.filteredData = this.forecastData;
    }
  }

  
}




