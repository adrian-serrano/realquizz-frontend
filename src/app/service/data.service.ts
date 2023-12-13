import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  selectedNumber: number | undefined;
  selectedAnswers: any[] = [];
  questions: QuestionList= {
    number: 0,
    questions: []
  };
  questionList: QuestionList[] = [];
  results: Results[] = [];


  setSelectedNumber(number: number) {
    this.selectedNumber = number;
  }
  addAnswer(answer: any[]) {//añade cada opcion escogida en selectedAnswers
    this.selectedAnswers.push(answer);
  }
  resetAnswers(){//resetea las opciones escogidas
    this.selectedAnswers = [];
  }
  setQuestions(number: number | undefined) {//guarda las respuestas-> segun numero de cuestionario y las respuestas escogidas
    const questions: QuestionList = {
      number: number,
      questions: [...this.selectedAnswers] // Copia las respuestas en una nueva lista
    };
    this.questionList.push(questions);
  }
  setResults(number: number | undefined, correctAnswer:number, incorrectAnswer:number, size:number, points:number) {
    const today = new Date();
    const dateString = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    const results: Results = {
      number: number,
      date: dateString,
      score: points,
      numberOfQuestions: size,
      rightwrong: correctAnswer+'/'+incorrectAnswer,
    };
    this.results.push(results);
  }

  constructor() { }
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
export interface QuestionList {
  number: number | undefined;
  questions: Option[];
}
export interface Results {
  number: number | undefined,
  date: string,
  score: number,
  numberOfQuestions: number,
  rightwrong: string,
}