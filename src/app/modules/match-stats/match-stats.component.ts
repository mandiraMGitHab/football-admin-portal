import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ChartConfiguration, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-match-stats',
  templateUrl: './match-stats.component.html',
  styleUrls: ['./match-stats.component.scss'],
})
export class MatchStatsComponent implements OnInit {
  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {}

  public barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: ['Manchester United', 'Chelsea', 'Real Madrid', 'Juventus'],
    datasets: [
      {
        data: [65, 59, 80, 81],
        backgroundColor: 'rgb(133, 77, 248)',
        borderColor: 'rgb(133, 77, 248)',
        borderWidth: 1,
        label: 'Goals',
      },
      {
        data: [28, 48, 40, 19],
        backgroundColor: 'rgb(193, 79, 76)',
        borderColor: 'rgb(193, 79, 76)',
        borderWidth: 1,
        label: 'Assists',
      },
    ],
  };

  public barChartOptions: ChartOptions<'bar'> = {
    responsive: true,
  };

  public barChartType: 'bar' = 'bar';
}
