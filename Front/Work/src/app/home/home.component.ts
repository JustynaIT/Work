import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../project.service';
import { Project } from '../project';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  projects: Array<Project>;
  constructor(private projectS: ProjectService, private router: Router) { }

  ngOnInit() {
    this.fetchData();
  }

  fetchData() {
    this.projectS.index()
      .subscribe((res) => {
        this.projects = res['projects'];
      });
  }

  createProject() {
    this.projectS.create().subscribe(() => {
      this.fetchData();
    });
  }

  remove(id) {
    this.projectS.delete(id).subscribe(() => {
      this.fetchData();
    });
  }

  logOut() {
    localStorage.clear();
    this.router.navigate(['/']);

  }
}
