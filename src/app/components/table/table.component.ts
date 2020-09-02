import { Component, OnInit } from '@angular/core';
import { MatTab } from '@angular/material/tabs';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  tabUpdated: MatTab;

  constructor() { }

  ngOnInit(): void {
  }

  onTabUpdated($event: MatTab) {
    this.tabUpdated = $event;
  }

}
