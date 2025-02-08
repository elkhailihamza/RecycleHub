import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { request } from '../../shared/interface/contribute/request-interface';
import { ContributeService } from '../contribute.service';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrl: './request.component.css'
})
export class RequestComponent {
  requestForm: FormGroup;
  private availableTimeSlots: Map<string, boolean> = new Map([]);

  constructor(private formBuilder: FormBuilder, private service: ContributeService) {
    this.requestForm = this.formBuilder.group({
      recycleMaterial: ['', Validators.required],
      recyclingPictures: [''],
      estimatedWeight: ['', Validators.required],
      addressCollect: ['', Validators.required],
      dateCollect: ['', [Validators.required, Validators.pattern(/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/)]],
      timeCollect: ['', Validators.required],
      extraNotes: ['']
    });
  }

  ngOnInit(): void {
    this.getRequestDate?.valueChanges.subscribe((value: string) => {
      if (this.requestForm.get('dateCollect')?.valid) {
        const matchingItems = this.service.getAllRequestsWithSameDetail(value) as request[];
        const excludedTimes: string[] = [];
        matchingItems.forEach(item => {
          excludedTimes.push(item.timeCollect);
        });

        this.populateTimeSlots(excludedTimes);
      }
    });
  }

  populateTimeSlots(excludedTimes: string[]): void {
    const startHour = 9;
    const endHour = 18;

    // this const takes time string and takenTime boolean as key, value
    const timeSlots: Map<string, boolean> = new Map([]);

    for (let hour = startHour; hour <= endHour; hour++) {
      const time = `${hour.toString().padStart(2, '0')}:00 ${hour > 12 ? 'PM' : 'AM'}`;
      timeSlots.set(time, excludedTimes.includes(time));
      if (hour >= 9 && hour < 18) {
        const halfTime = `${hour.toString().padStart(2, '0')}:30 ${hour > 12 ? 'PM' : 'AM'}`
        timeSlots.set(halfTime, excludedTimes.includes(halfTime));
      }
    }

    this.availableTimeSlots = timeSlots;
  }

  get getAvailableTimeSlots(): Map<string, boolean> {
    return this.availableTimeSlots;
  }

  onSubmit(): void {
    if (this.requestForm.valid) {
      const data = this.requestForm.value as request;
      this.service.storeRequest(data);
    }
  }

  get getRequestDate() {
    return this.requestForm.get("dateCollect");
  }
}
