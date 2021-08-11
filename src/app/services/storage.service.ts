import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { SocketClientService, SocketStatus } from './socket-client.service';

export interface Emitter {
  id: string;
  eventName: string;
  payload: string;
}

export interface ListenerData {
  date: Date;
  payload: string;
}

export interface Listener {
  id: string;
  eventName: string;
  data: ListenerData[];
}

@Injectable({
  providedIn: 'root',
})
export class StorageService implements OnDestroy {
  emitters: Emitter[] = [];
  emitterChanges: Subject<Emitter[]> = new Subject();

  listeners: Listener[] = [];
  listenerChanges: Subject<Listener[]> = new Subject();

  socketStatusSub!: Subscription;
  initialized: boolean = false;

  constructor(private socket: SocketClientService) {
    this.load();

    this.socketStatusSub = this.socket.statusChange
      .pipe(filter((status) => status === SocketStatus.CONNECTED))
      .subscribe(() => {
        this.addListenerHandlers();
      });
  }

  addEmitter(emitter: Emitter) {
    this.emitters.push(emitter);
    this.save();

    this.emitEmitters();
  }

  updateEmitter(emitter: Emitter) {
    this.emitters.splice(
      this.emitters.findIndex((e) => e.id === emitter.id),
      1,
      emitter
    );

    this.emitEmitters();
    this.save();
  }

  deleteEmitter(emitter: Emitter) {
    this.emitters.splice(
      this.emitters.findIndex((e) => e.id === emitter.id),
      1
    );

    this.emitEmitters();
    this.save();
  }

  emitEmitters() {
    this.emitterChanges.next(this.getEmitters());
  }

  getEmitters(): Emitter[] {
    return [...this.emitters];
  }

  getEmitterById(id: string): Emitter | null {
    return this.emitters.find((e) => e.id === id) || null;
  }

  addListener(listener: Listener) {
    this.listeners.push(listener);
    this.initListener(listener);
    this.save();

    this.emitListeners();
  }

  initListener(listener: Listener) {
    this.socket.listenToSocket(listener.eventName, (res) => {
      listener.data.push({ payload: JSON.stringify(res), date: new Date() });
    });
  }

  emitListeners() {
    this.listenerChanges.next(this.getListeners());
  }

  getListeners() {
    return [...this.listeners];
  }

  getListenerById(id: string): Listener | null {
    return this.listeners.find((e) => e.id === id) || null;
  }

  deleteListener(listener: Listener) {
    this.socket.socket?.removeListener(listener.eventName);
    this.listeners.splice(
      this.listeners.findIndex((l) => l.id === listener.id),
      1
    );

    this.save();
    this.emitListeners();
  }

  save() {
    const data = JSON.stringify({
      host: this.socket.host,
      emitters: this.emitters,
      listeners: this.listeners.map((l) => ({ ...l, data: [] })),
    });

    localStorage.setItem('storage', data);
  }

  load() {
    const data = localStorage.getItem('storage');

    if (data) {
      const { emitters, listeners, host } = JSON.parse(data);

      this.socket.setSocket(host);

      this.emitters = emitters;
      this.listeners = listeners;

      this.addListenerHandlers();

      this.emitEmitters();
      this.emitListeners();
    }
  }

  addListenerHandlers() {
    if (!this.initialized && this.socket.status === SocketStatus.CONNECTED) {
      for (const listener of this.listeners) {
        this.initListener(listener);
      }

      this.initialized = true;
    }
  }

  ngOnDestroy() {
    this.socketStatusSub.unsubscribe();
  }
}
