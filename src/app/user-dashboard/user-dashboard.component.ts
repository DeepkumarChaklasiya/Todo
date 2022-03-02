import { Component, OnInit, Inject, TemplateRef } from "@angular/core";
import { ApiService } from "shared/api.service";
import { User } from "./user";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { DialogComponent } from "../dialog/dialog.component";
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from "@angular/material/snack-bar";
@Component({
  selector: "app-user-dashboard",
  templateUrl: "./user-dashboard.component.html",
  styleUrls: ["./user-dashboard.component.css"],
})
export class UserDashboardComponent {
  constructor(
    private api: ApiService,
    private dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) {
    this.getAllUser();
  }
  users!: any;
  dataSource!: any;
  displayedColumns: string[] = [
    "Index",
    "FirstName",
    "LastName",
    "Email",
    "Action",
  ];
  horizontalPosition: MatSnackBarHorizontalPosition = "start";
  verticalPosition: MatSnackBarVerticalPosition = "bottom";

  ngOnInit() {}

  getAllUser() {
    this.api.getUser().subscribe((res) => {
      this.users = res;
      this.dataSource = res;
    });
  }

  addUser() {
    this.dialog
      .open(DialogComponent, {
        width: "30%",
      })
      .afterClosed()
      .subscribe((res) => {
        if (res === "save") {
          this.getAllUser();
          this.openSnackBar("User added successfully !");
        }
      });
  }
  editUser(element?: User) {
    this.dialog
      .open(DialogComponent, {
        width: "30%",
        data: element,
      })
      .afterClosed()
      .subscribe((res) => {
        if (res === "edit") {
          this.getAllUser();
          this.openSnackBar("User edited successfully !");
        }
      });
  }
  deleteUser(id: number, templateRef: TemplateRef<any>) {
    this.api.getTask(id).subscribe((res: any) => {
      if (res.length > 0) {
        this.dialog.open(templateRef, {
          width: "35%",
        });
      } else {
        this.api.deleteUser(id).subscribe(() => {
          this.getAllUser();
          this.openSnackBar("User deleted successfully !");
        });
      }
    });
  }
  openSnackBar(data: any) {
    this._snackBar.open(data, "X", {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 3000,
    });
  }
}
