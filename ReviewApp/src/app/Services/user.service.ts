import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { User } from '../Models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  selectedUser: User = {
    name: '',
    email: '',
    password: ''
  };

  noAuthHeader = {headers: new HttpHeaders({'NoAuth': 'true'})};

  constructor(private http: HttpClient) { }

  /// Http methods
  postUser(user: User){
    return this.http.post(environment.apiBaseUrl+'/users/register', user, this.noAuthHeader)
  }

  /// Calls the authenticate method in server
  login(authCredentials: any){
    return this.http.post(environment.apiBaseUrl+'/users/authenticate', authCredentials, this.noAuthHeader);
  }

  ///Retrieves logged in user email
  getUserEmail(){
    return this.http.get(environment.apiBaseUrl+'/users/profile');
  }

  /// Helper methods

  /// Returns token saved in localStorage
  getToken(){
    return localStorage.getItem('token');
  }

  /// Saves the jwt token in local storage after successful authentication
  setToken(token: string){
    localStorage.setItem('token', token);
  }

  /// Deletes the jwt token in local storage after logout
  deleteToken(){
    localStorage.removeItem('token');
  }

  /// Gets payload from token
  getUserDetails(){
    var token = this.getToken();

    if(token){
      var userPayload = atob(token.split('.')[1]);
      return JSON.parse(userPayload);
    }
    else
      return null;
  }

  isLoggedIn(){
    var userPayload = this.getUserDetails();

    if(userPayload)
      return userPayload.exp > Date.now() / 1000;
    else
      return false;
  }


}
