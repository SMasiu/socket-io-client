import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-listener-event-output',
  templateUrl: './listener-event-output.component.html',
  styleUrls: ['./listener-event-output.component.scss'],
})
export class ListenerEventOutputComponent implements OnInit {
  @Input()
  content!: string;

  @Input()
  date!: Date;

  constructor() {}

  ngOnInit(): void {}
}
