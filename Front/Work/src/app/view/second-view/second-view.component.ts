import { Component, OnInit, Input } from '@angular/core';
import { Project } from 'src/app/project';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'app-second-view',
  templateUrl: './second-view.component.html',
  styleUrls: ['./second-view.component.css']
})
export class SecondViewComponent implements OnInit {

  @Input() index: any;
  @Input() project: Project;
  private Form: FormGroup;
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.Form = this.formBuilder.group({
      heading: new FormControl(''),
      firstSubtitle: new FormControl(''),
      firstcolumn: new FormControl(''),
      secondSubtitle: new FormControl(''),
      secondcolumn: new FormControl(''),
      thirdSubtitle: new FormControl(''),
      thirdcolumn: new FormControl(''),
    });
    this.Form.patchValue(this.project.fourth[this.index]);
    this.save();
  }
  save() {
    this.Form.valueChanges.subscribe(val => {
      this.project.fourth[this.index] = {
        id: '2', heading: val.heading,
        firstcolumn: val.firstcolumn,
        firstSubtitle: val.firstSubtitle,
        secondcolumn: val.secondcolumn,
        secondSubtitle: val.secondSubtitle,
        thirdcolumn: val.thirdcolumn,
        thirdSubtitle: val.thirdSubtitle,
      };
    });
  }


}
