import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  currentSlider: number;
  sliderMax: number;
  sliderMin: number;
  imageList: string[];
  currentImage: string;

  constructor() {
    this.sliderMax = 6;
    this.sliderMin = 0;
    this.currentSlider = this.sliderMin;
    this.imageList = [''];
    this.currentImage = this.imageList[this.currentSlider];
  }

  goNext() {
    this.currentSlider = (this.currentSlider + 1) % (this.sliderMax + 1);
    this.currentImage[this.currentSlider];
  }

  goBack() {
    this.currentSlider = 
      (this.currentSlider - 1 + (this.sliderMax + 1)) % (this.sliderMax + 1);
    this.currentImage[this.currentSlider];
  }
}
