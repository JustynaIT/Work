import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Project } from 'src/app/project';

@Component({
  selector: 'app-first-view',
  templateUrl: './first-view.component.html',
  styleUrls: ['./first-view.component.css']
})
export class FirstViewComponent implements OnInit {

  @Input() index: any;
  @Input() project: Project;
  private Form: FormGroup;
  constructor(private formBuilder: FormBuilder ) {
  }

  ngOnInit() {
    this.Form = this.formBuilder.group({
      heading: new FormControl(''),
      description: new FormControl(''),
    });
    this.Form.patchValue(this.project.fourth[this.index]);
    this.save();
  }
  save() {
    this.Form.valueChanges.subscribe(val => {
      this.project.fourth[this.index] = {
        id: '1',
        heading: val.heading ,
        description: val.description };
    });
  }

}
