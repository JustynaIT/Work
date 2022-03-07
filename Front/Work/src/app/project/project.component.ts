import { Component, OnInit, Input } from '@angular/core';
import { ProjectService } from '../project.service';
import { Route, ActivatedRoute, ParamMap, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { MainService } from '../main.service';
import { Project } from '../project';
@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  isShow = {
    first: false,
    second: false,
    third: false,
    fourth: false,
    final: false,
  };
  project = {
    first: {},
    second: {},
    third: {
      valueBattons: []
    }
  };
  constructor(private projectS: ProjectService,
              private route: ActivatedRoute,
              private mainS: MainService) { }

  ngOnInit() {
    this.route.params.subscribe( params => {
      this.projectS.get(params.id).subscribe((res: Project) => {
        this.project = res;
        this.mainS.setProject(res);
        this.isShow.first = true;
      });
    });
  }

  change(name) {
    this.isShow = {
      first: false,
      second: false,
      third: false,
      fourth: false,
      final: false,
    };
    this.isShow[name] = true;
  }

  save() {
    this.projectS.update(this.project).subscribe();
  }
}
