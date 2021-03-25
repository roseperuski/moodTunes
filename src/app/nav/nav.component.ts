import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  menuOpen: boolean=false;
  constructor() { }

  ngOnInit(): void {
  }
  closeMenu() {
    this.menuOpen=false;
  }
}