import { Component, OnInit, Input } from '@angular/core';
import { Feature } from './feature';

@Component({
  selector: 'app-feature',
  templateUrl: './feature.component.html',
  styleUrls: ['./feature.component.scss'],
})
export class FeatureComponent implements OnInit {

  @Input() feature: Feature;

  constructor() { }

  ngOnInit(): void {
  }

}
