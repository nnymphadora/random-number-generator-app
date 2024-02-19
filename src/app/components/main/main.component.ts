import { Component } from '@angular/core';
import { RandomOrgApiService } from '../../services/random-org-api.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
})
export class MainComponent {
  randomNumberData: object;

  onFormSubmitted(formData: any) {
    this.randomOrgApiService
      .getRandomOrgNumbersData(formData.n, formData.minNum, formData.maxNum)
      .subscribe((data) => {
        this.randomNumberData = data;
        console.log(this.randomNumberData);
      });
  }

  constructor(private randomOrgApiService: RandomOrgApiService) {}
}
