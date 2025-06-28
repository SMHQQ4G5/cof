import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layouts',
  imports: [RouterLink, RouterOutlet],
  templateUrl: './layouts.component.html',
  styleUrl: './layouts.component.scss'
})
export class LayoutsComponent {
  navMenus = [
    {
      name: "Home",
      path: '/home'
    },
    {
      name: "Games",
      path: '/games'
    },
  ];
}
