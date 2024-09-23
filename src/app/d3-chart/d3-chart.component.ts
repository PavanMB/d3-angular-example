import { Component, OnInit, ElementRef } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-d3-chart',
  standalone: true,
  imports: [],
  templateUrl: './d3-chart.component.html',
  styleUrl: './d3-chart.component.css'
})
export class D3ChartComponent {

  private data = [25, 30, 45, 60, 80, 65, 75];  // Sample data
  private svg: any;
  private margin = 50;
  private width = 750 - (this.margin * 2);
  private height = 400 - (this.margin * 2);

  constructor(private elRef: ElementRef) { }

  ngOnInit(): void {
    this.createSvg();
    this.drawBars(this.data);
  }

  private createSvg(): void {
    this.svg = d3.select(this.elRef.nativeElement)
      .append('svg')
      .attr('width', this.width + (this.margin * 2))
      .attr('height', this.height + (this.margin * 2))
      .append('g')
      .attr('transform', `translate(${this.margin}, ${this.margin})`);
  }

  private drawBars(data: number[]): void {
    // Create the x-axis band scale
    const x = d3.scaleBand() //Scales are used to map data values to pixel values
      .range([0, this.width])
      .domain(data.map((d, i) => i.toString()))
      .padding(0.2);

    // Draw the x-axis on the DOM
    this.svg.append('g')
      .attr('transform', `translate(0, ${this.height})`)
      .call(d3.axisBottom(x));

    // Create the y-axis band scale
    const y = d3.scaleLinear()
      .domain([0, d3.max(data)!])
      .range([this.height, 0]);

    // Draw the y-axis on the DOM
    this.svg.append('g')
      .call(d3.axisLeft(y));

    // Create and fill the bars
    this.svg.selectAll('bars')
      .data(data)
      .enter()
      .append('rect')
      .attr('x', (d:any, i:any) => x(i.toString())!)
      .attr('y', (d:any) => y(d))
      .attr('width', x.bandwidth())
      .attr('height', (d:any) => this.height - y(d))
      .attr('fill', '#d04a35');
  }

}
