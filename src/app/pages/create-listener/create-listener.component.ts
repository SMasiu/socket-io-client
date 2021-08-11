import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { StorageService } from '../../services/storage.service';
import { v4 as uuid } from 'uuid';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-listener',
  templateUrl: './create-listener.component.html',
  styleUrls: ['./create-listener.component.scss'],
})
export class CreateListenerComponent implements OnInit {
  form!: FormGroup;

  constructor(private storage: StorageService, private router: Router) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      eventName: new FormControl(''),
    });
  }

  onSubmit() {
    const { eventName } = this.form.value;

    const id = uuid();
    this.storage.addListener({ eventName, data: [], id });

    this.router.navigateByUrl(`/listener/${id}`);
  }
}
