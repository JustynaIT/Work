import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Project } from './project';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  token: string;
  headers: HttpHeaders;
  projectID: number;

  constructor(private http: HttpClient) {
    this.token = localStorage.getItem('token');
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.token
    });

  }

  index() {
    const userId = localStorage.getItem('userId');
    return this.http.get('http://localhost:3000/projects', { headers: this.headers, params: { userId } });
  }

  get(id) {
    this.projectID = id;
    return this.http.get(`http://localhost:3000/projects/${id}`, { headers: this.headers });
  }

  getProjectID() {
    return this.projectID;
  }

  create() {
    const userId = localStorage.getItem('userId');
    return this.http.post('http://localhost:3000/projects', { name: 'Project', userId }, { headers: this.headers });
  }

  update(project) {
    return this.http.put(`http://localhost:3000/projects/${this.projectID}`, { project }, { headers: this.headers });
  }

  delete(id) {
    return this.http.delete(`http://localhost:3000/projects/${id}`, { headers: this.headers });
  }
}
