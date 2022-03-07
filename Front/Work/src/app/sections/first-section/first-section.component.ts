import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { MainService } from 'src/app/main.service';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ProjectService } from 'src/app/project.service';
import { Project } from 'src/app/project';

@Component({
  selector: 'app-first-section',
  templateUrl: './first-section.component.html',
  styleUrls: ['./first-section.component.css']
})
export class FirstSectionComponent implements OnInit {

  private ProjectID: number;
  @Output() section: EventEmitter<any>;
  @Input() project: Project;

  constructor(private mainS: MainService, private projectS: ProjectService) {
    this.section = new EventEmitter();
  }

  ngOnInit() {
    this.ProjectID = this.projectS.getProjectID();
  }

  next() {
    this.mainS.saveProject();
    this.section.emit('second');
  }
}
