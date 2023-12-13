import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StartComponent } from './start/start.component';
import { QuestionComponent } from './question/question.component';
import { HeaderComponent } from './header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { ChangeBgDirective } from './change-bg.directive';
import { MenuComponent } from './menu/menu.component';
import { QuestionMenuComponent } from './question-menu/question-menu.component';
import { SelectQuestionComponent } from './select-question/select-question.component';
import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CreateQuestionsComponent } from './create-questions/create-questions.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { QuizHistoryComponent } from './quiz-history/quiz-history.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Placement as PopperPlacement, Options } from '@popperjs/core';
import { ResultsCheckComponent } from './results-check/results-check.component';


@NgModule({
  declarations: [
    AppComponent,
    StartComponent,
    QuestionComponent,
    HeaderComponent,
    ChangeBgDirective,
    MenuComponent,
    QuestionMenuComponent,
    SelectQuestionComponent,
    ConfirmModalComponent,
    CreateQuestionsComponent,
    QuizHistoryComponent,
    ResultsCheckComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatDialogModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule
  ],
  providers: [
    MatDialog
 ],
  bootstrap: [AppComponent]
})
export class AppModule {

}