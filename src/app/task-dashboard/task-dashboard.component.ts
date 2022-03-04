import { Component, OnInit, TemplateRef } from "@angular/core";
import { ApiService } from "src/shared/api.service";
import { Task } from "../../Model/task";
import { User } from "src/Model/user";
import { MatDialog } from "@angular/material";
import { ActivatedRoute } from "@angular/router";
import { AddEditTasksComponent } from "../add-edit-tasks/add-edit-tasks.component";
import { Location } from "@angular/common";
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from "@angular/material/snack-bar";

@Component({
  selector: "app-task-dashboard",
  templateUrl: "./task-dashboard.component.html",
  styleUrls: ["./task-dashboard.component.css"],
})
export class TaskDashboardComponent implements OnInit {
  constructor(
    private api: ApiService,
    private dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private _snackBar: MatSnackBar
  ) {}

  tasks: Task[];
  userId: number;
  userName: User;
  displayedColumns: string[] = ["Index", "Task", "Description", "Action"];
  horizontalPosition: MatSnackBarHorizontalPosition = "start";
  verticalPosition: MatSnackBarVerticalPosition = "bottom";

  ngOnInit() {
    this.userId = this.activatedRoute.snapshot.params["userId"];
    this.api.getUserName(this.userId).subscribe((user) => {
      this.userName = user[0].firstName;
    });
    this.getTask(this.userId);
  }

  getTask(userId: number) {
    this.api.getTask(userId).subscribe((res) => {
      this.tasks = res;
    });
  }

  addEditTask(element?: Task) {
    this.dialog
      .open(AddEditTasksComponent, {
        width: "30%",
        data: element ? element : { userid: this.userId },
      })
      .afterClosed()
      .subscribe((res) => {
        let reply: string;
        if (res === "edit") {
          reply = "Task edited successfully !";
        } else if (res === "save") {
          reply = "Task added successfully !";
        }
        if (res) {
          this.getTask(this.userId);
          this.openSnackBar(reply);
        }
      });
  }

  deleteTask(id: number, templateRef: TemplateRef<any>) {
    this.dialog
      .open(templateRef, {
        width: "30%",
      })
      .afterClosed()
      .subscribe((res) => {
        if (res === true) {
          this.api.deleteTask(id).subscribe(() => console.log("Task Deleted"));
          this.getTask(this.userId);
          this.openSnackBar("Task deleted successfully !");
        }
      });
  }

  goBack() {
    this.location.back();
  }

  openSnackBar(data: string) {
    this._snackBar.open(data, "X", {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 3000,
    });
  }
}
