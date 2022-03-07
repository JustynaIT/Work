import { Component, OnInit, Input } from '@angular/core';
import { MainService } from '../main.service';
import { Project } from '../project';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.css']
})
export class PreviewComponent implements OnInit {

  image: string;
  @Input() project: Project;

  constructor(private mainS: MainService) { }

  ngOnInit() {
    this.image = this.mainS.getImage();
  }

}
