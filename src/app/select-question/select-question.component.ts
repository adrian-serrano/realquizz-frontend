import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmModalComponent } from '../confirm-modal/confirm-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-select-question',
  templateUrl: './select-question.component.html',
  styleUrls: ['./select-question.component.scss']
})
export class SelectQuestionComponent implements OnInit {
  numbers: number[] = [];
  isModalOpen = false;
  public currentQuestion: number = 0;

  constructor(private router: Router, public dialog: MatDialog, private dataService: DataService) { 
  for (let i = 1; i <= 32; i++) {
      this.numbers.push(i);
    }
  }

  ngOnInit(): void {
  }

  buttonClicked(number: number) {
    // Abre cuestionario con number
    this.dataService.setSelectedNumber(number);
    this.router.navigate(['/question']);

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
  nextQuestion() {
  }
  previousQuestion() {
  }
}
