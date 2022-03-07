import { Injectable } from '@angular/core';
import { Project } from './project';
import { First } from './first';
import { Second } from './second';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Third } from './third';
import { stringify } from 'querystring';
import { ProjectService } from './project.service';

@Injectable({
  providedIn: 'root'
})
export class MainService {
//{type: 'image/bmp'}
  image: any;
  project: Project;
  constructor(private http: HttpClient, private projectS: ProjectService) {
    this.project = {
      name: '',
      creator: '',
      _id: '',
      __v: 0,
      first: {
        title: '',
        keywords: '',
        language: ''
      },
      second: {
        theme: '',
        color: '',
        number: 0,
        tab: []
      },
      third: {
        description: '',
        heading: '',
        image: '',
        numberButtons: null,
        valueBattons: []
      },
      fourth: []
    };
    this.image = {
      home: ''
    };
  }

  setProject(project: Project) {
    this.project = project;
  }

  setSecond(item: Second) {
    this.project.second = item;
  }
  getSecond() {
    return this.project.second;
  }
  setFirst(item: First) {
    this.project.first = item;
  }
  getFirst() {
    return this.project.first;
  }
  setThird(item: Third) {
    this.project.third = item;
  }
  getThird() {
    return this.project.third;
  }
  getProject() {
    return this.project;
  }

  getImage() {
    return this.image;
  }

  setImage(item: string) {
    //this.image = new Blob (item, {type: 'image/bmp'});
    this.image.home = item;
  }

  saveProject() {
    this.projectS.update(this.project).subscribe();
  }

  getFile(project) {
    return this.http.post('http://localhost:3000/download', project);
  }
}
