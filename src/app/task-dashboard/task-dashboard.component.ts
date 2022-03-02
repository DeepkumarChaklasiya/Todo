import { Component, OnInit, TemplateRef } from "@angular/core";
import { ApiService } from "shared/api.service";
import { Task } from "./task";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { ActivatedRoute } from "@angular/router";
import { DialogTodoComponent } from "../dialog-todo/dialog-todo.component";
import { DialogConfirmationComponent } from "../dialog-confirmation/dialog-confirmation.component";
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
  tasks!: any;
  dataSource!: any;
  userId!: any;
  userName!: any;
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
  getTask(userId: any) {
    this.api.getTask(userId).subscribe((res) => {
      this.tasks = res;
      this.dataSource = res;
    });
  }
  addTask() {
    this.dialog
      .open(DialogTodoComponent, {
        width: "30%",
        data: { userid: this.userId },
      })
      .afterClosed()
      .subscribe((res) => {
        if (res === "save") {
          this.getTask(this.userId);
          this.openSnackBar("Task added successfully !");
        }
      });
  }
  editTask(element: Task) {
    this.dialog
      .open(DialogTodoComponent, {
        width: "30%",
        data: element,
      })
      .afterClosed()
      .subscribe((res) => {
        if (res === "edit") {
          this.getTask(this.userId);
          this.openSnackBar("Task edited successfully !");
        }
      });
  }
  deleteTask(id: number) {
    this.dialog
      .open(DialogConfirmationComponent, {
        width: "30%",
        data: { id: id },
      })
      .afterClosed()
      .subscribe((res) => {
        if (res === "delete") {
          this.getTask(this.userId);
          this.openSnackBar("Task deleted successfully !");
        }
      });
  }
  goBack() {
    this.location.back();
  }
  openSnackBar(data: any) {
    this._snackBar.open(data, "X", {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 3000,
    });
  }
}
