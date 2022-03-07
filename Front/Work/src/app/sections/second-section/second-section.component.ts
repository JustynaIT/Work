import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { MainService } from 'src/app/main.service';
import { FileSaverService } from 'ngx-filesaver';
import { Second } from 'src/app/second';
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { Project } from 'src/app/project';

@Component({
  selector: 'app-second-section',
  templateUrl: './second-section.component.html',
  styleUrls: ['./second-section.component.css']
})
export class SecondSectionComponent implements OnInit {

  private dataSecond: Second;
  private secondForm: FormGroup;
  private itemsMenu = new FormArray([]);
  private numberItemsMenu: number;
  private valueItemsMenu: Array<string>;


  @Output() section: EventEmitter<any>;
  @Input() project: Project;

  constructor(private formBuilder: FormBuilder, private mainS: MainService) {
    this.section = new EventEmitter();
  }

  ngOnInit() {
    this.secondForm = this.formBuilder.group({
      theme: new FormControl(''),
      color: new FormControl(''),
      number: new FormControl(''),
      itemsMenu: this.formBuilder.array([])
    });
    this.itemsMenu = this.secondForm.get('itemsMenu') as FormArray;
    this.fetchData();
    this.save();
    //this.menu();
  }

  createButton(str: string): FormGroup {
    return this.formBuilder.group({
      name: str,
    });
  }

  addButton() {
    if (this.itemsMenu.controls.length < 4) {
      this.itemsMenu.push(this.createButton(''));
      /*this.numberButtons = this.itemsMenu.controls.length;*/
      for (let e in this.project.second.tab)
        this.project.fourth.push({ id: null });
    }
  }

  removeButton(index) {
    this.itemsMenu.removeAt(index);
    for (let e in this.project.second.tab)
        this.project.fourth.push({ id: null });
  }

  get buttonsFormGroup() {
    return this.secondForm.get('itemsMenu') as FormArray;
  }

  fetchData() {
    this.dataSecond = this.project.second;
    this.secondForm.patchValue(this.dataSecond);
    this.dataSecond.tab.forEach(val => {
      this.itemsMenu.push(this.createButton(val));
    });
  }
  // menu() {
  //   this.tab = [];
  //   for (let i = 0; i < this.number; i++) {
  //     this.tab.push('');
  //     console.log(this.tab);
  //   }
  //   if (this.tab2 !== undefined) {
  //     if (this.tab2.length > this.tab.length) {
  //       console.log(this.tab.length);
  //       console.log(this.tab2.length);

  //       this.tab2 = [];
  //     }
  //   }

  //   console.log(this.tab2);
  // }
  save() {
    this.secondForm.valueChanges.subscribe(val => {
      this.valueItemsMenu = [];
      // TODO: dodać by funkcja wywoływała sie po określonym czasie
      this.itemsMenu.controls.forEach(item => {
        this.valueItemsMenu.push(item.value.name);
      });
      this.project.second = { theme: val.theme, color: val.color, number: val.number, tab: this.valueItemsMenu };

    });
  }
  // final() {
  //   console.log('dow')
  //   console.log(this.mainS.getProject());
  //   this.mainS.getFile().subscribe((res) => {
  //     let blob = new Blob([res['text']], {type: 'text/plain;charset=utf-8'});
  //     this._FileSaverService.save((blob), 'cos.html');
  //    // var ha = URL.createObjectURL(res);
  //   // console.log(ha);
  //    // window.open(ha);
  //     console.log(res);
  //   });
  // }

  next() {
    this.mainS.saveProject();
    this.section.emit('third');
  }

  back() {
    this.mainS.saveProject();
    this.section.emit('first');
  }
}
