import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { TaskDashboardComponent } from "./task-dashboard/task-dashboard.component";
import { UserDashboardComponent } from "./user-dashboard/user-dashboard.component";
const routes: Routes = [
  {
    path: "",
    component: UserDashboardComponent,
  },
  {
    path: ":userId",
    component: TaskDashboardComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
