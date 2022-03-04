import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { TaskDashboardComponent } from "./task-dashboard/task-dashboard.component";
import { UserDashboardComponent } from "./user-dashboard/user-dashboard.component";

const routes: Routes = [
  {
    path: "",
    redirectTo: "users",
    pathMatch: "full",
  },
  {
    path: "users",
    component: UserDashboardComponent,
  },
  {
    path: "users/:userId/task",
    component: TaskDashboardComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
