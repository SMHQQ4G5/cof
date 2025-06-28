import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input, SimpleChanges, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { ColorSegment } from './model';
import { WheelCoordinate } from './model/wheel-coordinate.model';


@Component({
  selector: 'app-spin-wheel',
  templateUrl: './spin-wheel.component.html',
  imports: [
    FormsModule,
    CommonModule
  ],
  styleUrl: './spin-wheel.component.scss'
})
export class SpinWheelComponent {

  // Input array of colors. Using a property here instead of @Input()
  // for a fully self-contained, interactive demo in one component.
  // If you were using this component inside another, you'd make this an @Input().
  @Input()
  set colorsInput(val: string[]) {
    if(val) this._colorsInput = val;
  }

  private _colorsInput: string[] = [
    '#FF6F61', 
    '#6B5B95', 
    '#88B04B', 
    '#F7CAC9',
    '#FF6F61',
    '#6B5B95',
    '#88B04B',
    '#F7CAC9',
    '#92A8D1',
    '#FF6F61', 
    '#6B5B95', 
    '#88B04B', 
    '#F7CAC9',
    '#FF6F61',
    '#6B5B95',
    '#88B04B',
    '#F7CAC9',
    '#92A8D1',
  ];

  @Input()
  set spinListener(val: Subject<any>) {
    this._spinListener = val;
  }
  private _spinListener = new Subject<any>();

  radius: number = 200;
  svgSize: number = this.radius * 2; // SVG width/height will be 2 * radius
  viewBox: string = `0 0 ${this.radius * 2} ${this.radius * 2}`;

  // This array will hold the calculated path data for each segment
  segments: ColorSegment[] = [];
  spinWheelElement: any;


  // Called once when the component is initialized
  ngOnInit(): void {
    this._spinListener.subscribe((evt) => {
      if(evt) {
        switch(evt.action) {
          case 'start': {
            this.spin();
          } break;
          default: {
            this.stop();
          } break;
        }
      }
    });
  }

  // Called when @Input() properties change. Since `colorsInput` isn't @Input()
  // in this self-contained demo, we'll manually call generateSegments().
  // However, this hook is good practice if `colorsInput` were an actual @Input().
  ngOnChanges(changes: SimpleChanges): void {
    // If `colorsInput` were an @Input(), this would react to changes in its reference.
    // For this self-contained demo, we manually call generateSegments() on array modification.
    setTimeout(() => {
      this.generateSegments(); 
    });
  }

  // Helper function to convert polar coordinates (angle, radius) to Cartesian (x, y)
  private polarToCartesian(angleInDegrees: number): WheelCoordinate {
    // We subtract 90 degrees to make 0 degrees point straight up (12 o'clock position)
    // This is more intuitive for a wheel than SVG's default (3 o'clock).
    const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
    return new WheelCoordinate(this.radius * Math.cos(angleInRadians), this.radius * Math.sin(angleInRadians));
  }

  // Generates the SVG path data for all segments based on `colorsInput`
  private generateSegments(): void {
    if (!this._colorsInput || this._colorsInput.length === 0) {
      this.segments = []; // Clear segments if no colors
      return;
    }

    const totalColors = this._colorsInput.length;
    // Divide 360 degrees equally among the number of colors
    const anglePerSegment = 360 / totalColors;
    let currentAngle = 0; // Tracks the starting angle for the current segment

    // Rotate wheel to center of the first color segment
    const wheelPositionStart = (anglePerSegment / 2) * -1;
    this.spinWheelElement.style.transform = `rotate(${wheelPositionStart}deg)`;

    // Map each color to a segment object containing its color and SVG path data
    this.segments = this._colorsInput.map((color) => {
      const startAngle = currentAngle;
      const endAngle = currentAngle + anglePerSegment;

      // Calculate the Cartesian coordinates for the start and end of the arc
      // Note: SVG arc command 'A' draws clockwise from the start point to the end point.
      // So, for a wedge pointing out from the center, the "start" of the arc in terms of drawing order
      // is actually the end point of the angle, and vice-versa.
      const arcStartPoint = this.polarToCartesian(endAngle);
      const arcEndPoint = this.polarToCartesian(startAngle);

      // Determine if the arc spans more than 180 degrees
      const largeArcFlag = anglePerSegment > 180 ? 1 : 0;

      // Construct the SVG path string:
      // M 0 0: Move to the center of the circle (origin of the <g> element)
      // L ${arcStartPoint.x} ${arcStartPoint.y}: Draw a line from the center to the start of the arc
      // A ${this.radius} ${this.radius} 0 ${largeArcFlag} 0 ${arcEndPoint.x} ${arcEndPoint.y}: Draw the arc
      //    - ${this.radius} ${this.radius}: x-radius and y-radius of the ellipse (same for a circle)
      //    - 0: x-axis-rotation (irrelevant for circles)
      //    - ${largeArcFlag}: 0 for arc <= 180°, 1 for arc > 180°
      //    - 0: sweep-flag (0 for counter-clockwise, 1 for clockwise). We use 0 and manage angle order.
      //    - ${arcEndPoint.x} ${arcEndPoint.y}: The final point of the arc
      // Z: Close the path by drawing a line back to the starting point (the center)
      const pathData = [
        'M 0 0',
        `L ${arcStartPoint.x} ${arcStartPoint.y}`,
        `A ${this.radius} ${this.radius} 0 ${largeArcFlag} 0 ${arcEndPoint.x} ${arcEndPoint.y}`,
        'Z',
      ].join(' ');

      currentAngle = endAngle; // Prepare angle for the next segment
      return new ColorSegment(color, pathData);
    });

  }


  @ViewChild('spinWheel', { static: false })
  set setContainer(c: ElementRef) {
    if (c) {
      this.spinWheelElement = c.nativeElement;
    }
  }

  currentIndex: number = 0;
  interval: any;
  selectedColor: string | null = null;
  running = false;


  spin() {

    if (this.running) return;
    this.running = true;
    this.selectedColor = null;
    // this.currentIndex = 0;
    this.interval = setInterval(() => {
      this.currentIndex = (this.currentIndex + 1) % this._colorsInput.length;
    }, 150);

  }

  stop() {
    if (!this.running) return;
    this.running = false;

    // Slow down and stop
    let delay = 200;
    const steps = 10;

    const slowStop = (step: number) => {
      if (step <= 0) {
        clearInterval(this.interval);
        this.selectedColor = this._colorsInput[this.currentIndex!];
        return;
      }

      setTimeout(() => {
        this.currentIndex = (this.currentIndex! + 1) % this._colorsInput.length;
        slowStop(step - 1);
      }, delay);
      delay += 100; // Increase delay to simulate slowdown
    };

    clearInterval(this.interval);
    slowStop(steps);
  }

}
