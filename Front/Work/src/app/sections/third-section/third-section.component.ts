import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { MainService } from 'src/app/main.service';
import { FormGroup, FormBuilder, FormControl, FormArray } from '@angular/forms';
import { Third } from 'src/app/third';
import { Project } from 'src/app/project';

@Component({
  selector: 'app-third-section',
  templateUrl: './third-section.component.html',
  styleUrls: ['./third-section.component.css']
})
export class ThirdSectionComponent implements OnInit {

  private dataThird: Third;
  private thirdForm: FormGroup;
  private buttons = new FormArray([]);
  private numberButtons: number;
  private valueBattons: Array<string>;
  private imageURL: any = '';


  @Output() section: EventEmitter<any>;
  @Input() project: Project;


  constructor(private formBuilder: FormBuilder, private mainS: MainService) {
    this.section = new EventEmitter();
   }

  ngOnInit() {
    this.thirdForm = this.formBuilder.group({
      description: new FormControl(''),
      heading: new FormControl(''),
      image: new FormControl(''),
      buttons: this.formBuilder.array([])
    });
    this.buttons = this.thirdForm.get('buttons') as FormArray;
    this.fetchData();
    this.save();
  }

  createButton(str: string): FormGroup {
    return this.formBuilder.group({
      name: str,
    });
  }

  addButton() {
    if (this.buttons.controls.length < 2) {
      this.buttons.push(this.createButton(''));
      this.numberButtons = this.buttons.controls.length;
    }
  }

  removeButton(index) {
    this.buttons.removeAt(index);
  }

  get buttonsFormGroup() {
    return this.thirdForm.get('buttons') as FormArray;
  }

  fetchData() {
    this.dataThird = this.project.third;
    this.thirdForm.patchValue(this.dataThird);
    this.dataThird.valueBattons.forEach(val => {
      this.buttons.push(this.createButton(val));
    });
  }

  openFile(event) {
    const input = event.target;
    var reader = new FileReader();
    reader.onload = () => {
      this.imageURL = reader.result;
      this.save();
    };
    reader.readAsDataURL(input.files[0]);

  }

  save() {
    this.thirdForm.valueChanges.subscribe(val => {
      this.valueBattons = [];
      this.buttons.controls.forEach(button => {
        this.valueBattons.push(button.value.name);
      });
      this.mainS.setImage(this.imageURL);
      this.project.third = {
        description: val.description,
        heading: val.heading,
        image: val.image,
        numberButtons: this.numberButtons,
        valueBattons: this.valueBattons
      };
    });
  }

  next() {
    this.mainS.saveProject();
    this.section.emit('fourth');
  }
  back() {
    this.mainS.saveProject();
    this.section.emit('second');
  }
}
