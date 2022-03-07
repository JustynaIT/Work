import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { FirstSectionComponent } from './sections/first-section/first-section.component';
import { SecondSectionComponent } from './sections/second-section/second-section.component';
import { FinalSectionComponent } from './sections/final-section/final-section.component';
import { ThirdSectionComponent } from './sections/third-section/third-section.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ProjectComponent } from './project/project.component';
import { AuthGuard } from './Guards/auth.guard';

const routes: Routes = [
  {
    path: 'sign-up',
    component: RegisterComponent
  },
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [ AuthGuard ],
  },
  {
    path: 'project/:id',
    component: ProjectComponent,
    canActivate: [ AuthGuard ],
    children: [
      {
        path: 'first',
        component: FirstSectionComponent
      },
      {
        path: 'second',
        component: SecondSectionComponent
      },
      {
        path: 'third',
        component: ThirdSectionComponent
      },
      {
        path: 'final',
        component: FinalSectionComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
