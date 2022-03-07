import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { FirstSectionComponent } from './sections/first-section/first-section.component';
import { SecondSectionComponent } from './sections/second-section/second-section.component';
import { PreviewComponent } from './preview/preview.component';
import { MainService } from './main.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FinalSectionComponent } from './sections/final-section/final-section.component';
import { HttpClientModule } from '@angular/common/http';
import { FileSaverModule } from 'ngx-filesaver';
import { ThirdSectionComponent } from './sections/third-section/third-section.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthService } from './auth.service';
import { ProjectComponent } from './project/project.component';
import { ProjectService } from './project.service';
import { AuthGuard } from './Guards/auth.guard';
import { FourthComponent } from './sections/fourth/fourth.component';
import { FirstViewComponent } from './view/first-view/first-view.component';
import { SecondViewComponent } from './view/second-view/second-view.component';
import { ThirdViewComponent } from './view/third-view/third-view.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FirstSectionComponent,
    SecondSectionComponent,
    PreviewComponent,
    FinalSectionComponent,
    ThirdSectionComponent,
    LoginComponent,
    RegisterComponent,
    ProjectComponent,
    FourthComponent,
    FirstViewComponent,
    SecondViewComponent,
    ThirdViewComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FileSaverModule
  ],
  providers: [MainService, AuthService, ProjectService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
