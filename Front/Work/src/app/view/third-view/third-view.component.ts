import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Project } from 'src/app/project';

@Component({
  selector: 'app-third-view',
  templateUrl: './third-view.component.html',
  styleUrls: ['./third-view.component.css']
})
export class ThirdViewComponent implements OnInit {

  @Input() index: any;
  @Input() project: Project;
  private Form: FormGroup;
  constructor(private formBuilder: FormBuilder ) { }

  ngOnInit() {
    this.Form = this.formBuilder.group({
      heading: new FormControl(''),
      firstIcon: new FormControl(''),
      firstSubtitle: new FormControl(''),
      firstcolumn: new FormControl(''),
      secondIcon: new FormControl(''),
      secondSubtitle: new FormControl(''),
      secondcolumn: new FormControl(''),
      thirdIcon: new FormControl(''),
      thirdSubtitle: new FormControl(''),
      thirdcolumn: new FormControl(''),
    });
    this.Form.patchValue(this.project.fourth[this.index]);
    this.save();
  }

  save() {
    this.Form.valueChanges.subscribe(val => {
      this.project.fourth[this.index] = {
        id: '3', heading: val.heading,
        firstIcon: val.firstIcon,
        firstcolumn: val.firstcolumn,
        secondIcon: val.secondIcon,
        firstSubtitle: val.firstSubtitle,
        secondcolumn: val.secondcolumn,
        secondSubtitle: val.secondSubtitle,
        thirdIcon: val.thirdIcon,
        thirdcolumn: val.thirdcolumn,
        thirdSubtitle: val.thirdSubtitle,
      };
    });
  }

}
