import { Component } from '@angular/core';
import { Request } from '../../shared/interface/contribute/request-interface';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-collector',
  templateUrl: './collector.component.html',
  styleUrl: './collector.component.css'
})
export class CollectorComponent {
  requests: Request[] = [];

  constructor(private acRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.requests = this.acRoute.snapshot.data['requests'];
  }

}
