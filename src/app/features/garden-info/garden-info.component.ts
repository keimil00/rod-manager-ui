import {Component} from '@angular/core';
import {Employer} from "./employer.model";
import {Role} from "../register/user.model";
import {BreakpointObserver} from "@angular/cdk/layout";
import {Router} from "@angular/router";

@Component({
  selector: 'app-garden-info',
  templateUrl: './garden-info.component.html',
  styleUrls: ['./garden-info.component.scss']
})
export class GardenInfoComponent {
  isMobile: boolean = false;

  constructor(private breakpointObserver: BreakpointObserver,private router: Router) {
    this.router = router
  }

  ngOnInit() {
    this.breakpointObserver.observe([
      '(max-width: 550px)'  // Dostosuj wartość do preferowanej szerokości ekranu
    ]).subscribe(result => {
      this.isMobile = result.matches;
    });
  }

  openWorkersList() {
    this.router.navigate(['/workers-list']);
  }

  protected readonly Role = Role;
  protected readonly employers = employers;
}

export function updateEmployer(newEmployer:Employer, employers:Employer[]){
  for (let i = 0; i < employers.length; i++) {
    if (employers[i].id === newEmployer.id) {
      employers[i] = newEmployer;
      break;
    }
  }
}
export function addEmployer(newEmployer:Employer, employers:Employer[]){
  employers.push(newEmployer)
}

export let employers: Employer[] = [
  {
    id:'1',
    position: 'Manager',
    name: 'John Doe',
    phoneNumber: '123-456-7890',
    email: 'john.doe@example.com'
  },
  {
    id:'2',
    position: 'Developer',
    name: 'Jane Smith',
    phoneNumber: '987-654-3210',
    email: 'jane.smith@example.com'
  },
  {
    id:'3',
    position: 'Designer',
    name: 'Mike Johnson',
    phoneNumber: '555-555-5555',
    email: 'mike.johnson@example.com'
  }
];
