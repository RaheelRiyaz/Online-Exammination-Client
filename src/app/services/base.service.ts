import { Injectable } from '@angular/core';
import { ApiResponse } from '../models/apiResponse';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../Environment/environment';

@Injectable({
  providedIn: 'root',
})
export class BaseService {
  constructor(private httpClient: HttpClient) {}

  // Common Function for posting to database
  Post<ReqT, ResT>(model: ReqT, url: string): Observable<ApiResponse<ResT>> {
    return this.httpClient.post<ApiResponse<ResT>>(
      environment.apiBaseUrl + url,
      model
    );
  }

  // Common Function for retrieving data from database
  Fetch<ResT>(url: string): Observable<ApiResponse<ResT>> {
    return this.httpClient.get<ApiResponse<ResT>>(environment.apiBaseUrl + url);
  }

  // Common Function for delete data from database
  Delete<ResT>(url: string): Observable<ApiResponse<ResT>> {
    return this.httpClient.delete<ApiResponse<ResT>>(
      environment.apiBaseUrl + url
    );
  }

  // Common Function for updating data into database
  Update<ReqT, ResT>(model: ReqT, url: string): Observable<ApiResponse<ResT>> {
    return this.httpClient.put<ApiResponse<ResT>>(
      environment.apiBaseUrl + url,
      model
    );
  }

  // Common Function for retrieving specific item from database
  Find<ResT>(url: string): Observable<ApiResponse<ResT>> {
    return this.httpClient.get<ApiResponse<ResT>>(environment.apiBaseUrl + url);
  }
  // It checks username
  Check(userName: string): Observable<boolean> {
    return this.httpClient.get<boolean>(
      environment.apiBaseUrl + 'users/check/' + userName
    );
  }
}
