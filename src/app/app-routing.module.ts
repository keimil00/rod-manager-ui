import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthService} from "./auth.service";
import {HttpClient} from "@angular/common/http";

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthService, HttpClient]
})
export class AppRoutingModule { }
