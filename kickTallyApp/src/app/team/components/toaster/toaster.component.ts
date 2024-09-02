import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-toaster',
  templateUrl: './toaster.component.html',
  styleUrls: ['./toaster.component.scss']
})
export class ToasterComponent implements OnInit, OnChanges {

  constructor() { }

  ngOnInit(): void {
  }

  @Input() message: string | null = null;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['message'] && this.message) {
      setTimeout(() => this.message = null, 3000); // Hide message after 3 seconds
    }
  }

}
