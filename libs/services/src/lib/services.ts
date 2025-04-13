import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Login {
  username: string;
  password: string;
}

export interface Signup {
  username: string;
  password: string;
}

export interface AuthResponse {
  access_token: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly baseUrl = 'http://localhost:3000/api/auth';
  constructor(private http: HttpClient) {}

  login(data: Login): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.baseUrl}/login`, data);
  }

  signup(data: Signup): Observable<any> {
    return this.http.post(`${this.baseUrl}/signup`, data);
  }
}
