import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import {
  SocketClientService,
  SocketStatus,
} from 'src/app/services/socket-client.service';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  hostControl!: FormControl;
  hostSub!: Subscription;
  socketStatusSub!: Subscription;
  socketStatusMessage!: string;

  constructor(private socket: SocketClientService) {}

  ngOnInit(): void {
    this.hostControl = new FormControl(this.socket.host || '');
    this.hostSub = this.hostControl.valueChanges
      .pipe(debounceTime(500))
      .subscribe((hostUrl: string) => {
        this.socket.setSocket(hostUrl);
      });

    this.setSocketStatusMessage(this.socket.status);
    this.socketStatusSub = this.socket.statusChange.subscribe(
      (status: SocketStatus) => {
        this.setSocketStatusMessage(status);
      }
    );

    if (this.hostControl.value) {
      this.socket.setSocket(this.hostControl.value);
    }
  }

  setSocketStatusMessage(status: SocketStatus) {
    this.socketStatusMessage =
      status === SocketStatus.CONNECTED ? 'Connected' : 'Disconnected';
  }

  ngOnDestroy() {
    this.hostSub.unsubscribe();
    this.socketStatusSub.unsubscribe();
  }
}
