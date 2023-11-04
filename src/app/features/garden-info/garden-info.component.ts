import {Component} from '@angular/core';
import {Employer} from "./employer.model";

@Component({
  selector: 'app-garden-info',
  templateUrl: './garden-info.component.html',
  styleUrls: ['./garden-info.component.scss']
})
export class GardenInfoComponent {
  employers: Employer[] = [
    {
      position: 'Manager',
      name: 'John Doe',
      phoneNumber: '123-456-7890',
      email: 'john.doe@example.com'
    },
    {
      position: 'Developer',
      name: 'Jane Smith',
      phoneNumber: '987-654-3210',
      email: 'jane.smith@example.com'
    },
    {
      position: 'Designer',
      name: 'Mike Johnson',
      phoneNumber: '555-555-5555',
      email: 'mike.johnson@example.com'
    }
    // Dodaj więcej pracodawców według potrzeb
  ];
}
