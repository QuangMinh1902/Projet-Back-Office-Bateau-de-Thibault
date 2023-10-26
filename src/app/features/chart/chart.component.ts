import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})

export class ChartComponent implements OnChanges {

  @Input() dataChart: any[] = [];

  chartOptions = {
    animationEnabled: true,
    theme: "dark2",
    exportEnabled: true,
    title: { text: "Developer Work Week" },
    subtitles: [{ text: "Median hours/week" }],
    data: [{
      type: "pie",
      indexLabel: "{name}: {y}%",
      dataPoints: [] as any[] // Définir le type comme any[]
    }]
  };

  ngOnChanges(changes: SimpleChanges) {
    if (changes['dataChart'] && changes['dataChart'].currentValue) {
      //this.chartOptions.data[0].dataPoints = this.dataChart;
      this.chartOptions.data[0].dataPoints = this.dataChart
    }
  }
}



