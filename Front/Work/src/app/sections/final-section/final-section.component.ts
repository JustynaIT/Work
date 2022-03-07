import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MainService } from 'src/app/main.service';
import { FileSaverService } from 'ngx-filesaver';
import * as JSZip from 'jszip';
import { zip } from 'rxjs';
import { Project } from 'src/app/project';

@Component({
  selector: 'app-final-section',
  templateUrl: './final-section.component.html',
  styleUrls: ['./final-section.component.css']
})
export class FinalSectionComponent implements OnInit {

  image: object;
  @Input() project: Project;
  @Output() section: EventEmitter<any>;
  constructor(private mainS: MainService, private _FileSaverService: FileSaverService) {
    this.section = new EventEmitter();
   }

  ngOnInit() {
  }

  save() {
    this.mainS.getFile(this.project).subscribe((res) => {
      const blob = new Blob([res['text']], { type: 'text/plain;charset=utf-8' });
      const jszip = new JSZip();
      jszip.file('index.html', blob);
      //const img = jszip.folder('images');
      //img.file(this.project.third.image, this.image['home'].slice(22), {base64: true});
      jszip.generateAsync({ type: 'blob' })
        .then((c) => {
          this._FileSaverService.save((c), this.project.name + '.zip');
        });
    });
  }

  back() {
    this.mainS.saveProject();
    this.section.emit('fourth');
  }
}
