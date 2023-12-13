import { Component, OnInit } from '@angular/core';
import { DataService } from '../service/data.service';
@Component({
  selector: 'app-question-menu',
  templateUrl: './question-menu.component.html',
  styleUrls: ['./question-menu.component.scss']
})
export class QuestionMenuComponent implements OnInit {

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.setSelectedNumber(2);
  }

  gameMode(num: number): void {
    switch (num) {
      case 1:
        localStorage.setItem("mode", "Cuestionarios");
        break;
      case 2:
        localStorage.setItem("mode", "Cuestionario al azar");
        break;

    }
  }

  imageSource: string = '/assets/img/volume.png';
  alternateImageSource: string = '/assets/img/volume_muted.png';
  isAlternateImage: boolean = false;

  toggleImage() {
    this.isAlternateImage = !this.isAlternateImage;
    this.imageSource = this.isAlternateImage ? this.alternateImageSource : '/assets/img/volume.png';
  }
}
