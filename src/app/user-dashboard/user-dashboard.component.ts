import { Component, OnInit, Inject } from "@angular/core";
import { ApiService } from "shared/api.service";
import { User } from "./user";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { DialogComponent } from "../dialog/dialog.component";
import { DialogDeleteUserComponent } from "../dialog-delete-user/dialog-delete-user.component";

@Component({
  selector: "app-user-dashboard",
  templateUrl: "./user-dashboard.component.html",
  styleUrls: ["./user-dashboard.component.css"],
})
export class UserDashboardComponent {
  constructor(private api: ApiService, private dialog: MatDialog) {
    this.getAllUser();
  }
  users!: any;
  dataSource!: any;
  displayedColumns: string[] = [
    "Id",
    "FirstName",
    "LastName",
    "Email",
    "Action",
  ];
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
        if (res === "save") this.getAllUser();
      });
  }
  editUser(element: User) {
    this.dialog
      .open(DialogComponent, {
        width: "30%",
        data: element,
      })
      .afterClosed()
      .subscribe((res) => {
        if (res === "edit") this.getAllUser();
      });
  }
  deleteUser(id: number) {
    this.api.getTask(id).subscribe((res) => {
      if (res[0]) {
        this.dialog.open(DialogDeleteUserComponent, {
          width: "35%",
          data: {
            msg: "You can't delete this User because This User has some tasks!",
          },
        });
      } else {
        this.api.deleteUser(id).subscribe(() => console.log("User Deleted"));
        this.getAllUser();
      }
    });
  }
}
