import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { User } from "src/Model/user";
import { Task } from "src/Model/task";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ApiService {
  constructor(private http: HttpClient) {}

  //************************************    User requests  *********************************************************

  getUser(): Observable<User[]> {
    return this.http.get<User[]>("http://localhost:3000/user");
  }

  getUserName(id: number): Observable<User> {
    return this.http.get<User>("http://localhost:3000/user?id=" + id);
  }

  addUser(user: User): Observable<User> {
    return this.http.post<User>("http://localhost:3000/user", user);
  }

  editUser(user: User, id: number): Observable<User> {
    return this.http.put<User>("http://localhost:3000/user/" + id, user);
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete<any>("http://localhost:3000/user/" + id);
  }

  //************************************    Task requests  *********************************************************

  getTask(id: number): Observable<Task[]> {
    return this.http.get<Task[]>("http://localhost:3000/todo?userid=" + id);
  }

  addTask(task: Task): Observable<Task> {
    return this.http.post<Task>("http://localhost:3000/todo", task);
  }

  editTask(task: any, id: number): Observable<Task> {
    return this.http.put<Task>("http://localhost:3000/todo/" + id, task);
  }

  deleteTask(id: number): Observable<any> {
    return this.http.delete<any>("http://localhost:3000/todo/" + id);
  }
}
