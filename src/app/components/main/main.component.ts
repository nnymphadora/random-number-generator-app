import { Component } from '@angular/core';
import { RandomOrgApiService } from '../../services/random-org-api.service';
import { Point } from 'chart.js';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
  animations: [
    trigger('slideAnimationLeft', [
      state(
        '70Width',
        style({
          width: '70%',
        })
      ),
      state(
        '30Width',
        style({
          width: '40%',
        })
      ),
      transition('70Width => 30Width', [animate('700ms ease-in')]),
    ]),
  ],
})
export class MainComponent {
  randomNumbersData: Point[];
  dataRecieved: boolean = false;
  animationStateLeft: string = '70Width';

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
    this.showAnimations();
  }

  showAnimations() {
    const screenWidth = window.innerWidth;
    if (screenWidth >= 768) {
      this.animationStateLeft = '30Width';
    }
  }

  constructor(private randomOrgApiService: RandomOrgApiService) {}
}
