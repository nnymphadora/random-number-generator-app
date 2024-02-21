import { Component } from '@angular/core';
import { RandomOrgApiService } from '../../services/random-org-api.service';
import { Point } from 'chart.js';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
})
export class MainComponent {
  randomNumbersData: Point[];
  dataRecieved: boolean = false;

  onFormSubmitted(formData: any) {
    this.randomOrgApiService
      .getRandomOrgNumbersData(formData.n, formData.minNum, formData.maxNum)
      .subscribe((data: any) => {
        this.onDataRecieved(data);
      });
  }

  onDataRecieved(data: { number: number; occurencies: number }[]) {
    this.randomNumbersData = data.map((item) => ({
      x: item.number,
      y: item.occurencies,
    }));
    this.dataRecieved = true;
  }

  constructor(private randomOrgApiService: RandomOrgApiService) {}
}
