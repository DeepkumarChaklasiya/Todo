import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { UserDashboardComponent } from "./user-dashboard/user-dashboard.component";
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatTableModule } from "@angular/material/table";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule } from "@angular/material/dialog";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatIconModule } from "@angular/material/icon";
import { MatToolbarModule } from "@angular/material/toolbar";
import { TaskDashboardComponent } from "./task-dashboard/task-dashboard.component";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { AddEditUsersComponent } from "./add-edit-users/add-edit-users.component";
import { AddEditTasksComponent } from "./add-edit-tasks/add-edit-tasks.component";

@NgModule({
  declarations: [
    AppComponent,
    UserDashboardComponent,
    TaskDashboardComponent,
    AddEditUsersComponent,
    AddEditTasksComponent,
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatButtonModule,
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
    MatToolbarModule,
    MatSnackBarModule,
  ],

  providers: [],

  entryComponents: [
    AppComponent,
    UserDashboardComponent,
    TaskDashboardComponent,
    AddEditUsersComponent,
    AddEditTasksComponent,
  ],

  bootstrap: [AppComponent],
})
export class AppModule {}
