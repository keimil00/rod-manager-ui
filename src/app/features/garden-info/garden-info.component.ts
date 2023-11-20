import {Component} from '@angular/core';
import {Employer} from "./employer.model";
import {Role} from "../register/user.model";
import {BreakpointObserver} from "@angular/cdk/layout";
import {Router} from "@angular/router";
import {GardenInfoService} from "./garden-info.service";

@Component({
  selector: 'app-garden-info',
  templateUrl: './garden-info.component.html',
  styleUrls: ['./garden-info.component.scss']
})
export class GardenInfoComponent {
  isMobile: boolean = false;

  protected readonly Role = Role;
  // @ts-ignore
  protected employers: Employer[];

  constructor(private breakpointObserver: BreakpointObserver, private router: Router, private gardenInfoService: GardenInfoService) {
    this.router = router
    this.initData()
  }

  initData() {
    this.employers = this.gardenInfoService.getEmployers()
  }

  ngOnInit() {
    this.breakpointObserver.observe([
      '(max-width: 550px)'
    ]).subscribe(result => {
      this.isMobile = result.matches;
    });
  }

  openWorkersList() {
    this.router.navigate(['/workers-list']);
  }
}
