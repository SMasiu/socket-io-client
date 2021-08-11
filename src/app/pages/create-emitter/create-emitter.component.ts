import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { SocketClientService } from '../../services/socket-client.service';
import { Emitter, StorageService } from '../../services/storage.service';
import { v4 as uuid } from 'uuid';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-create-emitter',
  templateUrl: './create-emitter.component.html',
  styleUrls: ['./create-emitter.component.scss'],
})
export class CreateEmitterComponent implements OnInit, OnDestroy {
  form!: FormGroup;
  responseData: string | null = null;
  emitter: Emitter | null = null;
  paramSub!: Subscription;

  constructor(
    private socket: SocketClientService,
    private storage: StorageService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.paramSub = this.route.paramMap.subscribe((params) => {
      const id = params.get('id');

      if (id) {
        this.emitter = this.storage.getEmitterById(id);
      }

      if (this.emitter) {
        this.emitter.payload = this.format(JSON.parse(this.emitter.payload));
      }

      this.form = new FormGroup({
        eventName: new FormControl(this.emitter?.eventName || ''),
        payload: new FormControl(this.emitter?.payload || ''),
      });
    });
  }

  formatPayload() {
    this.form.controls.payload.setValue(
      this.format(JSON.parse(this.form.value.payload))
    );
  }

  format(value: object) {
    return JSON.stringify(value, null, 2);
  }

  async run() {
    const { eventName, payload } = this.form.value;

    const res = await this.socket.emitToSocket(eventName, payload);
    this.responseData = this.format(res) || null;
  }

  save() {
    const { eventName, payload } = this.form.value;
    this.storage.addEmitter({ eventName, payload, id: uuid() });
  }

  update() {
    if (this.emitter) {
      const { eventName, payload } = this.form.value;
      const { id } = this.emitter;

      this.storage.updateEmitter({ eventName, payload, id });
    }
  }

  remove() {
    if (this.emitter) {
      this.storage.deleteEmitter(this.emitter);
      this.form.setValue({ eventName: '', payload: '' });

      this.snackBar.open('Listener have been removed successfully', 'Close');
    }
  }

  ngOnDestroy() {
    this.paramSub.unsubscribe();
  }
}
