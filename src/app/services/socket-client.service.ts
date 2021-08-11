import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Subject } from 'rxjs';

export enum SocketStatus {
  CONNECTED = 'CONNECTED',
  DISCONNECTED = 'DISCONNECTED',
}

@Injectable({
  providedIn: 'root',
})
export class SocketClientService {
  socket: Socket | null = null;
  status: SocketStatus = SocketStatus.DISCONNECTED;
  statusChange: Subject<SocketStatus> = new Subject();
  host: string = '';

  constructor() {}

  setSocket(url: string) {
    this.host = url;

    if (this.socket) {
      this.socket.disconnect();
    }

    this.socket = new Socket({
      url,
      options: {
        transports: ['websocket'],
      },
    });

    this.socket.on('connect_error', (...args: any) => {
      this.setStatus(SocketStatus.DISCONNECTED);
      console.log(args);
    });

    this.socket.on('connect', () => {
      this.setStatus(SocketStatus.CONNECTED);
    });

    this.socket.on('disconnect', () => {
      this.setStatus(SocketStatus.DISCONNECTED);
    });
  }

  setStatus(status: SocketStatus): void {
    this.status = status;
    this.emitSocketStatus();
  }

  emitToSocket(eventName: string, payload: string): Promise<object> {
    return new Promise((resolve) => {
      if (this.isConnectionActive()) {
        this.socket?.emit(eventName, JSON.parse(payload), (res: object) => {
          return resolve(res);
        });
      }
    });
  }

  listenToSocket(eventName: string, cb: (res: object) => void) {
    if (this.isConnectionActive()) {
      this.socket?.on(eventName, (res: object) => cb(res));
    }
  }

  emitSocketStatus(): void {
    this.statusChange.next(this.status);
  }

  isConnectionActive(): boolean {
    return this.status === SocketStatus.CONNECTED;
  }
}
