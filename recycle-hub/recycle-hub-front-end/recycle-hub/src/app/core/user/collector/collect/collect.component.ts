import { Component } from '@angular/core';
import { Request, requestStatus } from '../../../shared/interface/contribute/request-interface';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CollectorService } from '../collector.service';

@Component({
  selector: 'app-collect',
  templateUrl: './collect.component.html',
  styleUrl: './collect.component.css'
})
export class CollectComponent {
  request: Request;
  collectForm: FormGroup;
  stepMax: number = 3;
  stepMin: number = 1;
  currentStep: number = this.stepMin;

  constructor(private acRoute: ActivatedRoute, private formBuilder: FormBuilder, private service: CollectorService) {
    this.request = this.acRoute.snapshot.data['request'];
    this.collectForm = this.formBuilder.group({
      correctWeight: ['', Validators.required],
      correctMaterial: ['', Validators.required],
      selectedStatus: ['', Validators.required]
    });
  }

  submit() {
    if (this.collectForm.valid) {
      const data = this.collectForm.get('selectedStatus')!.value;
      this.service.changeRequestStatus(data, Number(this.acRoute.snapshot.paramMap.get('id')!));
    }
  }

  getStatusString(status: number): string {
    const statusStr: string = requestStatus[status];
    return statusStr.charAt(0).toUpperCase() + statusStr.slice(1);
  }

  nextStep() {
    this.currentStep = (this.currentStep+1) % this.stepMax;
  }

  previousStep() {
    this.currentStep = (this.currentStep - 1 + this.stepMax) % this.stepMax;
  }
}
