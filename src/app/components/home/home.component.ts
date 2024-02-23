import { Component } from '@angular/core';
import { RandomOrgApiService } from '../../services/random-org-api.service';
import { IntegerOccurrence, RequestParams } from '../../../types';
import { Point } from 'chart.js';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
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
export class HomeComponent {
  randomNumbersData: Point[];
  dataRecieved: boolean = false;
  animationStateLeft: string = '70Width';

  onFormSubmitted(formData: RequestParams) {
    this.randomOrgApiService
      .getRandomOrgNumbersData(
        formData.num,
        formData.minValue,
        formData.maxValue
      )
      .subscribe((data: IntegerOccurrence[]) => {
        this.onDataRecieved(data);
      });
  }

  onDataRecieved(data: IntegerOccurrence[]) {
    this.randomNumbersData = data.map((item) => ({
      x: item.integer,
      y: item.occurrences,
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
