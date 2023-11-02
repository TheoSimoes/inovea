import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

export type Model = {
  author: string;
  date: string;
  description: string;
  id: string;
  modelName: string;
  polygons: number;
}

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private httpClient: HttpClient) { }

  getModels(): Observable<Model[]>{
    return this.httpClient.get<Model[]>("http://localhost:3333/api/models");
  }

  addModel(model: Model): Observable<Model>{
    return this.httpClient.post<Model>("http://localhost:3333/api/models", model);
  }
}
