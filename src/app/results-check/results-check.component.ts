import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfirmModalComponent } from '../confirm-modal/confirm-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { QuestionService } from '../service/question.service';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-results-check',
  templateUrl: './results-check.component.html',
  styleUrls: ['./results-check.component.scss']
})
export class ResultsCheckComponent implements OnInit {

  questionsList: any = [];
  isModalOpen = false;
  selectedNumber: number | undefined;
  constructor(private http: HttpClient, public dialog: MatDialog, private router: Router, private questionService: QuestionService, private dataService: DataService) {
    // this.http.get<any>('./assets/questions.json').subscribe(data => {
    //   this.questionsList = data.questions;
    // });
  }
  getAllQuestions(num : number | undefined ) {
    this.questionService.getQuestionJson(num)
      .subscribe(res => {
        this.questionsList = res.questions;
      })
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
  ngOnInit(): void {
    if(this.dataService.selectedNumber===undefined){
      this.router.navigate(['/menu']);
    }
    this.selectedNumber = this.dataService.selectedNumber;
    this.getAllQuestions(this.selectedNumber);
  }
}
