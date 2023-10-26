import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { faHouse } from '@fortawesome/free-solid-svg-icons';
import { faSection } from '@fortawesome/free-solid-svg-icons';
import { faFish } from '@fortawesome/free-solid-svg-icons';
import { faShrimp } from '@fortawesome/free-solid-svg-icons';
import { faFrog } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {

  house = faHouse;
  category = faSection;
  fish = faFish;
  apple = faFrog;
  shrimp = faShrimp;

  constructor() {}

  ngOnInit(): void {

  }
}
