import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { QuestionService } from '../service/question.service';
import { ConfirmModalComponent } from '../confirm-modal/confirm-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Placement as PopperPlacement, Options } from '@popperjs/core';
import { DataService } from '../service/data.service'

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {

  public name: string = "";
  public questionList: any = [];
  public currentQuestion: number = 0;
  public points: number = 0;
 // counter = 10;//contador para cada pregunta
  correctAnswer: number = 0;
  inCorrectAnswer: number = 0;
 // interval$: any;
  progress: string = "0";
  isQuizCompleted : boolean = false;
  isModalOpen = false;
  minutes: number = 7;
  seconds: number = 0;
  dailyQuestion: boolean = localStorage.getItem("mode")==="Cuestionario diario"; 
  timerActive: boolean = this.dailyQuestion;
  selectedNumber: number | undefined = this.dataService.selectedNumber;

  constructor(private questionService: QuestionService, public dialog: MatDialog,private router: Router, private dataService: DataService) { }

  ngOnInit(): void {
    if(this.dataService.selectedNumber===undefined){
      this.timerActive=false;
      this.router.navigate(['/menu']);
    }
    this.name = localStorage.getItem("name")!;
    this.getAllQuestions(this.selectedNumber);
    setInterval(() => {
      this.startCounter();
    }, 1000);
    this.dataService.resetAnswers();
  }
  getAllQuestions(num : number | undefined ) {
    this.questionService.getQuestionJson(num)
      .subscribe(res => {
        this.questionList = res.questions;
      })

  }
  nextQuestion() {
    this.currentQuestion++;
  }
  previousQuestion() {
    this.currentQuestion--;
  }
  answer(currentQno: number, option: any) {
    this.dataService.addAnswer(option);

    if (option.correct) {
      this.points += 10;
      this.correctAnswer++;
      setTimeout(() => {
        this.currentQuestion++;
        // this.resetCounter();
        this.getProgressPercent();
      }, 1000);


    } else {
      setTimeout(() => {
        this.currentQuestion++;
        this.inCorrectAnswer++;
        // this.resetCounter();
        this.getProgressPercent();
      }, 1000);

      this.points -= 10;
    }
    if(currentQno === this.questionList.length){
      this.isQuizCompleted = true;
      //this.stopCounter();
      this.dataService.setQuestions(this.dataService.selectedNumber);//igual no hace falta
      this.dataService.resetAnswers();
      this.dataService.setResults(this.dataService.selectedNumber, this.correctAnswer, this.inCorrectAnswer, this.questionList.length, this.points);
      if(this.dailyQuestion){//si hemos terminado cuestionario diario
        const today = new Date();
        const dateString = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        localStorage.setItem("dateDailyMode", dateString);
      }
    }
  }
  startCounter() {
    //contador para cada pregunta
    // this.interval$ = interval(1000)
    //   .subscribe(val => {
    //     this.counter--;
    //     if (this.counter === 0) {
    //       this.currentQuestion++;
    //       this.counter = 60;
    //       this.points -= 10;
    //     }
    //   });
    // setTimeout(() => {
    //   this.interval$.unsubscribe();
    // }, 600000);
    

    if (!this.timerActive) {
      // Temporizador detenido, realiza acciones adicionales si es necesario
   return;

    }

    if (this.minutes === 0 && this.seconds === 0) {
      // Temporizador terminado, realiza acciones adicionales si es necesario
      this.isQuizCompleted = true;
      this.dataService.setQuestions(this.dataService.selectedNumber);//igual no hace falta
      this.dataService.resetAnswers();
      this.dataService.setResults(this.dataService.selectedNumber, this.correctAnswer, this.inCorrectAnswer, this.questionList.length, this.points);
    }
  
    if (this.seconds === 0) {
      this.minutes--;
      this.seconds = 59;
    } else {
      this.seconds--;
    }

  }
  // stopCounter() {
  //   this.interval$.unsubscribe();
  //   this.counter = 0;
  // }
  // resetCounter() {
  //   this.stopCounter();
  //   this.counter = 60;
  //   this.startCounter();
  // }
  //por ahora no se usa
//   resetQuiz() {
//     this.resetCounter();
//     //this.getAllQuestions();
//     this.points = 0;
//     this.counter = 60;
//     this.currentQuestion = 0;
//     this.progress = "0";
// }
  openConfirmModal() {
    this.isModalOpen = !this.isModalOpen;
    if (this.dailyQuestion) {
      const dialogRef = this.dialog.open(ConfirmModalComponent, {
        data: { message: '¿Salir al menu principal? Dispone de 1 oportunidad para el cuestionario.' }
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          // El usuario ha confirmado la acción
          this.timerActive = false;
          this.dataService.setQuestions(this.dataService.selectedNumber);//igual no hace falta
          this.dataService.resetAnswers();
          this.dataService.setResults(this.dataService.selectedNumber, this.correctAnswer, this.inCorrectAnswer, this.questionList.length, this.points);
          const today = new Date();
          const dateString = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
          localStorage.setItem("dateDailyMode", dateString);
          this.router.navigate(['/menu']);
        } else {
          // El usuario ha cancelado la acción
          this.isModalOpen = !this.isModalOpen;

        }
      });
    }
    else {
      const dialogRef = this.dialog.open(ConfirmModalComponent, {
        data: { message: '¿Estás seguro de que deseas salir al menu principal?' }
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          // El usuario ha confirmado la acción
          this.timerActive = false;
          this.router.navigate(['/menu']);
        } else {
          // El usuario ha cancelado la acción
          this.isModalOpen = !this.isModalOpen;

        }
      });
    }
  }
  getProgressPercent() {
    this.progress = ((this.currentQuestion / this.questionList.length) * 100).toString();
    return this.progress;

  }
}
