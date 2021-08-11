import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import {
  Emitter,
  Listener,
  StorageService,
} from 'src/app/services/storage.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent implements OnInit, OnDestroy {
  panelOpenState: boolean = false;
  emitterSub!: Subscription;
  emitters!: Emitter[];

  listenersSub!: Subscription;
  listeners!: Listener[];

  constructor(private storage: StorageService, private router: Router) {}

  ngOnInit(): void {
    this.emitterSub = this.storage.emitterChanges.subscribe((emitters) => {
      this.emitters = emitters;
    });

    this.listenersSub = this.storage.listenerChanges.subscribe((listeners) => {
      this.listeners = listeners;
    });

    this.emitters = this.storage.getEmitters();
    this.listeners = this.storage.getListeners();
  }

  ngOnDestroy() {
    this.listenersSub.unsubscribe();
    this.emitterSub.unsubscribe();
  }

  handleEmitterClick(emitter: Emitter) {
    this.router.navigateByUrl(`/create-emitter/${emitter.id}`);
  }

  handleListerClick(listener: Listener) {
    this.router.navigateByUrl(`listener/${listener.id}`);
  }
}
