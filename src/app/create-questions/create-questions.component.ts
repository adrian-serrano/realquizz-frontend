import { Component, OnInit } from '@angular/core';
import { saveAs } from 'file-saver';
import { ConfirmModalComponent } from '../confirm-modal/confirm-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-questions',
  templateUrl: './create-questions.component.html',
  styleUrls: ['./create-questions.component.scss']
})

export class CreateQuestionsComponent implements OnInit {
  // cuestionarioForm = new FormGroup({
  //   titulo: new FormControl('', Validators.required),
  //   descripcion: new FormControl('', Validators.required),
  //   preguntas: new FormControl('', Validators.required)
  // });
  
  questions: Question[] = [];
  options: Option[]=[{text:''}, {text:''}, {text:''}, {text:''}];
  currentQuestion: number = 0;// se usa?
  isModalOpen = false;


  addQuestion() {
    this.questions.push({
      questionText: '',
      options: [{text:''}, {text:''}, {text:''}, {text:''}],//numero de opciones
      explanation: '',
    });
    this.currentQuestion = this.questions.length - 1;
  }
 
  saveQuestions() {
    // Agregar aquí la lógica para guardar el cuestionario
    const preguntasJson = JSON.stringify(this.questions);
    const blob = new Blob([preguntasJson], { type: 'application/json;charset=utf-8' });
    saveAs(blob, 'questions.json');
  }
  selectOption(opcionIndex: number, preguntaIndex: number) {
    // Deseleccionar todas las opciones de la pregunta
    this.questions[preguntaIndex].options.forEach((opcion) => {
      opcion.correct = false;
    });
    // Seleccionar la opción elegida
    this.questions[preguntaIndex].options[opcionIndex].correct = true;
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
  constructor(public dialog: MatDialog,private router: Router) { }

  ngOnInit(): void {
  }

}
export interface Question {
  questionText: string;
  options: Option[];
  explanation: string;
}

export interface Option {
  text: string;
  correct?: boolean;
}