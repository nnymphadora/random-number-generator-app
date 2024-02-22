import { Component, Input, OnChanges } from '@angular/core';

import { ChartConfiguration, Point } from 'chart.js';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.scss',
})
export class ChartComponent implements OnChanges {
  @Input() randomNumbersData: Point[];

  ngOnChanges(): void {
    this.chartData[0].data = this.randomNumbersData;

    this.chartData = [...this.chartData];
  }

  public chartData: ChartConfiguration<'scatter'>['data']['datasets'] = [
    {
      data: [],
      label: 'Generated numbers distribution',
      pointRadius: 6,
    },
  ];

  public chartOptions: ChartConfiguration<'scatter'>['options'] = {
    responsive: true,
    plugins: {
      legend: { onClick: null },
    },
    scales: {
      y: {
        ticks: { precision: 0 },
        title: {
          display: true,
          text: 'Occurencies',
        },
      },
      x: {
        title: {
          display: true,
          text: 'Integer',
        },
      },
    },
  };

  constructor() {}
}
