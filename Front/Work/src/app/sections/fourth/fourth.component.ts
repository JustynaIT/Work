import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { Project } from 'src/app/project';
import { MainService } from 'src/app/main.service';

@Component({
  selector: 'app-fourth',
  templateUrl: './fourth.component.html',
  styleUrls: ['./fourth.component.css']
})


export class FourthComponent implements OnInit {

  View = [];
  @Output() section: EventEmitter<any>;
  @Input() project: Project;

  constructor(private mainS: MainService) {
    this.section = new EventEmitter();
  }

  ngOnInit() {
    if (this.project.fourth.length === 0) {
      for (let e in this.project.second.tab)
        this.project.fourth.push({ id: null });
    }
  }


  next() {
    this.section.emit('final');
  }
  back() {
    this.section.emit('third');
  }
}
