import { Component, OnInit,ViewChild,ElementRef } from '@angular/core';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss']
})
export class StartComponent implements OnInit {

  @ViewChild('name') nameKey!: ElementRef;
  isInputEmpty = true;

  constructor() { }

  ngOnInit(): void {
  }
  checkInputValue(value: string) {
    this.isInputEmpty = value === '';
  }
  startQuiz(){
    localStorage.removeItem("dateDailyMode");
    localStorage.setItem("name",this.nameKey.nativeElement.value);
  }

  
  imageSource: string = '/assets/img/volume.png';
  alternateImageSource: string = '/assets/img/volume_muted.png';
  isAlternateImage: boolean = false;

  toggleImage() {
    this.isAlternateImage = !this.isAlternateImage;
    this.imageSource = this.isAlternateImage ? this.alternateImageSource : '/assets/img/volume.png';
  }
}
