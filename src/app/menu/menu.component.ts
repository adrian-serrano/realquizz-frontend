import { Component, OnInit } from '@angular/core';
import { DataService } from '../service/data.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmModalComponent } from '../confirm-modal/confirm-modal.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  constructor(public dialog: MatDialog, private router: Router, private dataService: DataService) { }
  dailyModeOn: boolean = false;
  isSongPlaying = false;
  isModalOpen = false;

  ngOnInit(): void {
    const today = new Date();
    const dateString = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    this.dataService.setSelectedNumber(1);
    this.dailyModeOn = localStorage.getItem("dateDailyMode") !== dateString;
    localStorage.setItem("mode", "menu");
  }
  //    ng serve --host 192.168.1.39
  gameMode(num: number): void {
    switch (num) {
      case 1:
        localStorage.setItem("mode", "Cuestionario diario");
        break;
      case 2:
        localStorage.setItem("mode", "Crear cuestionario");
        break;
      case 3:
        localStorage.setItem("mode", "Historial de " + localStorage.getItem("name"));
        break;
      default:
        localStorage.setItem("mode", "Cuestionarios online");
        break;
    }
  }
  toggleSong() {
    this.isSongPlaying = !this.isSongPlaying;
    // Add your logic to start/stop the song here
  }

  openConfirmModal(){
    this.isModalOpen = !this.isModalOpen; 
    const dialogRef = this.dialog.open(ConfirmModalComponent, {
      data: { message: '¿Estás seguro de que deseas cerrar sesión?' }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // El usuario ha confirmado la acción
        this.router.navigate(['/start']);

      } else {
        // El usuario ha cancelado la acción
        this.isModalOpen = !this.isModalOpen; 

      }
    });
  }

  imageSource: string = '/assets/img/volume.png';
  alternateImageSource: string = '/assets/img/volume_muted.png';
  isAlternateImage: boolean = false;

  toggleImage() {
    this.isAlternateImage = !this.isAlternateImage;
    this.imageSource = this.isAlternateImage ? this.alternateImageSource : '/assets/img/volume.png';
  }
}
