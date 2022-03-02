import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { User } from "src/app/user-dashboard/user";
import { Task } from "src/app/task-dashboard/task";
@Injectable({
  providedIn: "root",
})
export class ApiService {
  constructor(private http: HttpClient) {}
  //User requests
  getUser() {
    return this.http.get("http://localhost:3000/user");
  }
  getUserName(id: number) {
    return this.http.get("http://localhost:3000/user?id=" + id);
  }
  addUser(user: User) {
    return this.http.post("http://localhost:3000/user", user);
  }
  editUser(user: any, id: number) {
    return this.http.put("http://localhost:3000/user/" + id, user);
  }
  deleteUser(id: number) {
    return this.http.delete("http://localhost:3000/user/" + id);
  }

  //Task Requests
  getTask(id: number) {
    return this.http.get("http://localhost:3000/todo?userid=" + id);
  }

  addTask(task: Task) {
    return this.http.post("http://localhost:3000/todo", task);
  }
  editTask(task: any, id: number) {
    return this.http.put("http://localhost:3000/todo/" + id, task);
  }
  deleteTask(id: number) {
    return this.http.delete("http://localhost:3000/todo/" + id);
  }
}
