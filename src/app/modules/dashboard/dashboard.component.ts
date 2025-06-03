import { Component, OnInit } from '@angular/core';
import { LoaderService } from 'src/app/core/services/loader/loader.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  constructor(private loader: LoaderService) {}

  username: string = '';
  password: string = '';
  isAuthenticated: boolean = false;
  jsonData: any[] = [
    {
      id: 1,
      name: 'John Doe',
      role: 'Admin',
      email: 'john.doe@example.com',
      status: 'Active',
    },
    {
      id: 2,
      name: 'Jane Smith',
      role: 'Supervisor',
      email: 'jane.smith@example.com',
      status: 'Active',
    },
    {
      id: 3,
      name: 'Steve Doe',
      role: 'Senior Editor',
      email: 'Steve.doe@example.com',
      status: 'Active',
    },
    {
      id: 4,
      name: 'Steve Smith',
      role: 'Senior Editor',
      email: 'Steve.smith@example.com',
      status: 'Active',
    },
    {
      id: 5,
      name: 'Michael Doe',
      role: 'Senior Editor',
      email: 'Michael.doe@example.com',
      status: 'Active',
    },
    {
      id: 6,
      name: 'Michael Smith',
      role: 'Senior Editor',
      email: 'Michael.smith@example.com',
      status: 'Active',
    },
    {
      id: 7,
      name: 'David Doe',
      role: 'Editor',
      email: 'David.doe@example.com',
      status: 'Active',
    },
    {
      id: 8,
      name: 'David Smith',
      role: 'Editor',
      email: 'David.smith@example.com',
      status: 'Inactive',
    },
    {
      id: 9,
      name: 'Lionel Doe',
      role: 'Editor',
      email: 'Lionel.doe@example.com',
      status: 'Active',
    },
    {
      id: 10,
      name: 'Lionel Smith',
      role: 'Editor',
      email: 'Lionel.smith@example.com',
      status: 'Active',
    },
    {
      id: 11,
      name: 'Diego Doe',
      role: 'Editor',
      email: 'Diego.doe@example.com',
      status: 'Active',
    },
    {
      id: 12,
      name: 'Diego Smith',
      role: 'Editor',
      email: 'Diego.smith@example.com',
      status: 'Active',
    },
    {
      id: 13,
      name: 'Pep Doe',
      role: 'Junior Editor',
      email: 'Pep.doe@example.com',
      status: 'Active',
    },
    {
      id: 14,
      name: 'Pep Smith',
      role: 'Junior Editor',
      email: 'Pep.smith@example.com',
      status: 'Inactive',
    },
    {
      id: 15,
      name: 'Iker Doe',
      role: 'Junior Editor',
      email: 'Iker.doe@example.com',
      status: 'Active',
    },
    {
      id: 16,
      name: 'Iker Smith',
      role: 'Junior Editor',
      email: 'Iker.smith@example.com',
      status: 'Active',
    },
    {
      id: 17,
      name: 'Harry Doe',
      role: 'Junior Editor',
      email: 'Harry.doe@example.com',
      status: 'Active',
    },
    {
      id: 18,
      name: 'Harry Smith',
      role: 'Junior Editor',
      email: 'Harry.smith@example.com',
      status: 'Inactive',
    },
    // Add more data as needed
  ];

  ngOnInit(): void {
    this.isAuthenticated =
      localStorage.getItem('isAuthenticated')?.toLowerCase() === 'true';
  }

  async onSubmit() {
    // Handle form submission logic here
    await this.loader.waitFor(2000);
    if (this.username === 'admin' && this.password === 'admin123') {
      this.isAuthenticated = true;
      localStorage.setItem('isAuthenticated', this.isAuthenticated.toString());
    }
  }
}
