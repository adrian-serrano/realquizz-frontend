import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuestionComponent } from './question/question.component';
import { StartComponent } from './start/start.component';
import { MenuComponent } from './menu/menu.component';
import { QuestionMenuComponent } from './question-menu/question-menu.component';
import { SelectQuestionComponent } from './select-question/select-question.component';
import { CreateQuestionsComponent } from './create-questions/create-questions.component';
import { QuizHistoryComponent } from './quiz-history/quiz-history.component';
import { ResultsCheckComponent } from './results-check/results-check.component';


//ng serve --host 192.168.1.46
const routes: Routes = [
  {path:'', redirectTo:'start',pathMatch:"full"},
  {path:"menu", component:MenuComponent},
  {path:"start", component:StartComponent},
  {path:"question-menu", component:QuestionMenuComponent},
  {path:"question", component:QuestionComponent},
  {path:"select-question", component:SelectQuestionComponent},
  {path:"create-questions", component:CreateQuestionsComponent},
  {path:"quiz-history", component:QuizHistoryComponent},
  {path:"results-check", component:ResultsCheckComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
