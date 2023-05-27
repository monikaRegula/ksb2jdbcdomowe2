import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {News} from "../model/news";

const httpOptions = {
  headers: new HttpHeaders({
    'Content_Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  private baseUrl = "http://localhost:8080/news";

  constructor(private http: HttpClient) {
  }

  getNews(): Observable<Array<News>> {
    return this.http.get<Array<News>>(`${this.baseUrl}`, httpOptions);
  }

  updateVehicle(id: number, data: any): Observable<News> {
    return this.http.put(`${this.baseUrl}/id/${id}`, data);
  }

}
