import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { D3ChartComponent } from './d3-chart/d3-chart.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,D3ChartComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'd3-angular-example';
}
