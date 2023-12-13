import { Component, OnInit } from '@angular/core';
import { ConfirmModalComponent } from '../confirm-modal/confirm-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DataService } from '../service/data.service';
@Component({
  selector: 'app-quiz-history',
  templateUrl: './quiz-history.component.html',
  styleUrls: ['./quiz-history.component.scss']
})
export class QuizHistoryComponent implements OnInit {

  isModalOpen = false;

  constructor(public dialog: MatDialog, private router: Router, public dataService: DataService) { }

  ngOnInit(): void {
  }
  openConfirmModal(){
    this.isModalOpen = !this.isModalOpen; 
    const dialogRef = this.dialog.open(ConfirmModalComponent, {
      data: { message: '¿Estás seguro de que deseas salir al menu principal?' }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // El usuario ha confirmado la acción
        this.router.navigate(['/menu']);

      } else {
        // El usuario ha cancelado la acción
        this.isModalOpen = !this.isModalOpen; 

      }
    });
  }
}
