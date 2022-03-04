import { Component, TemplateRef } from "@angular/core";
import { ApiService } from "src/shared/api.service";
import { User } from "../../Model/user";
import { MatDialog } from "@angular/material";
import { AddEditUsersComponent } from "../add-edit-users/add-edit-users.component";
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
  ) {}

  users: User[];
  displayedColumns: string[] = [
    "Index",
    "FirstName",
    "LastName",
    "Email",
    "Action",
  ];
  horizontalPositionSnackbar: MatSnackBarHorizontalPosition = "start";
  verticalPositionSnackbar: MatSnackBarVerticalPosition = "bottom";

  ngOnInit() {
    this.getAllUser();
  }

  getAllUser() {
    this.api.getUser().subscribe((res) => {
      this.users = res;
    });
  }

  addEditUser(element?: User) {
    this.dialog
      .open(AddEditUsersComponent, {
        width: "30%",
        data: element ? element : null,
      })
      .afterClosed()
      .subscribe((res) => {
        let reply: string;
        if (res === "edit") {
          reply = "User edited successfully !";
        } else if (res === "save") {
          reply = "User added successfully !";
        }
        if (res) {
          this.openSnackBar(reply);
          this.getAllUser();
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

  openSnackBar(data: string) {
    this._snackBar.open(data, "X", {
      horizontalPosition: this.horizontalPositionSnackbar,
      verticalPosition: this.verticalPositionSnackbar,
      duration: 3000,
    });
  }
}
