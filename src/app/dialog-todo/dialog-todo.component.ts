import { Component, OnInit, Inject } from "@angular/core";
import { FormGroup, FormBuilder, Validators, Form } from "@angular/forms";
import { ApiService } from "shared/api.service";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { DialogDeleteUserComponent } from "../dialog-delete-user/dialog-delete-user.component";
@Component({
  selector: "app-dialog-todo",
  templateUrl: "./dialog-todo.component.html",
  styleUrls: ["./dialog-todo.component.css"],
})
export class DialogTodoComponent implements OnInit {
  toDoForm!: FormGroup;
  btnName: string = "Add";
  constructor(
    private api: ApiService,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialogRef: MatDialogRef<DialogTodoComponent>,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.toDoForm = this.formBuilder.group({
      task: ["", Validators.required],
      description: ["", Validators.required],
    });

    if (this.editData.id) {
      this.btnName = "Edit";
      this.toDoForm.controls["task"].setValue(this.editData.task);
      this.toDoForm.controls["description"].setValue(this.editData.description);
    }
  }
  addTask() {
    this.toDoForm.value.userid = this.editData.userid;
    if (!this.editData.id) {
      if (this.toDoForm.valid) {
        this.api
          .addTask(this.toDoForm.value)
          .subscribe((data) => console.log(data));
        this.toDoForm.reset();
        this.dialogRef.close("save");
      } else {
        this.dialog.open(DialogDeleteUserComponent, {
          width: "30%",
          data: {
            msg: "Plz fill correct information",
          },
        });
      }
    } else {
      this.toDoForm.value.userid = this.editData.userid;
      this.editTask();
    }
  }
  editTask() {
    if (this.toDoForm.valid) {
      this.api
        .editTask(this.toDoForm.value, this.editData.id)
        .subscribe((data) => console.log(data));
      this.toDoForm.reset();
      this.dialogRef.close("edit");
    } else {
      this.dialog.open(DialogDeleteUserComponent, {
        width: "30%",
        data: {
          msg: "Plz fill correct information",
        },
      });
    }
  }
}
