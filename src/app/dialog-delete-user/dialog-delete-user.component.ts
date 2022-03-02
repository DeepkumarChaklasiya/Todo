import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
@Component({
  selector: "app-dialog-delete-user",
  templateUrl: "./dialog-delete-user.component.html",
  styleUrls: ["./dialog-delete-user.component.css"],
})
export class DialogDeleteUserComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialogRef: MatDialogRef<DialogDeleteUserComponent>
  ) {}

  ngOnInit() {}
}
