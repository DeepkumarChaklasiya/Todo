import { Component, Inject, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ApiService } from "src/shared/api.service";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";

@Component({
  selector: "app-add-edit-users",
  templateUrl: "./add-edit-users.component.html",
  styleUrls: ["./add-edit-users.component.css"],
})
export class AddEditUsersComponent implements OnInit {
  constructor(
    private api: ApiService,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<AddEditUsersComponent>,
    @Inject(MAT_DIALOG_DATA) public editData: any
  ) {}

  userForm: FormGroup;
  btnName: string = "Add";

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
    });
    if (this.editData) {
      this.btnName = "Edit";
      this.userForm.controls["firstName"].setValue(this.editData.firstName);
      this.userForm.controls["lastName"].setValue(this.editData.lastName);
      this.userForm.controls["email"].setValue(this.editData.email);
    }
  }

  addUser() {
    if (!this.editData) {
      this.api
        .addUser(this.userForm.value)
        .subscribe((user) => console.log(user));
      this.userForm.reset();
      this.dialogRef.close("save");
    } else {
      this.editUser();
    }
  }

  editUser() {
    this.api
      .editUser(this.userForm.value, this.editData.id)
      .subscribe((user) => console.log(user));
    this.userForm.reset();
    this.dialogRef.close("edit");
  }

  getErrorMessage() {
    return this.userForm.get("email").hasError("required")
      ? "You must enter a value"
      : this.userForm.get("email").hasError("email")
      ? "Not a valid email"
      : "";
  }
}
