import { Component, OnInit, Inject } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ApiService } from "src/shared/api.service";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";

@Component({
  selector: "app-add-edit-tasks",
  templateUrl: "./add-edit-tasks.component.html",
  styleUrls: ["./add-edit-tasks.component.css"],
})
export class AddEditTasksComponent implements OnInit {
  constructor(
    private api: ApiService,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<AddEditTasksComponent>,
    @Inject(MAT_DIALOG_DATA) public editData: any
  ) {}

  toDoForm: FormGroup;
  btnName: string = "Add";

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
      this.api
        .addTask(this.toDoForm.value)
        .subscribe((data) => console.log(data));
      this.toDoForm.reset();
      this.dialogRef.close("save");
    } else {
      this.toDoForm.value.userid = this.editData.userid;
      this.editTask();
    }
  }

  editTask() {
    this.api
      .editTask(this.toDoForm.value, this.editData.id)
      .subscribe((data) => console.log(data));
    this.toDoForm.reset();
    this.dialogRef.close("edit");
  }
}
