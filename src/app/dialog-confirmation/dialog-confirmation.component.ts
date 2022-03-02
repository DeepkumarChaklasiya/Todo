import { Component, OnInit, Inject } from "@angular/core";
import { ApiService } from "shared/api.service";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
@Component({
  selector: "app-dialog-confirmation",
  templateUrl: "./dialog-confirmation.component.html",
  styleUrls: ["./dialog-confirmation.component.css"],
})
export class DialogConfirmationComponent implements OnInit {
  constructor(
    private api: ApiService,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialogRef: MatDialogRef<DialogConfirmationComponent>
  ) {}

  ngOnInit() {}
  deleteTask() {
    this.api
      .deleteTask(this.editData.id)
      .subscribe(() => console.log("Task Deleted"));
    this.dialogRef.close("delete");
  }
}
