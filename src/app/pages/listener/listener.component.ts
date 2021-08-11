import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Listener, StorageService } from '../../services/storage.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-listener',
  templateUrl: './listener.component.html',
  styleUrls: ['./listener.component.scss'],
})
export class ListenerComponent implements OnInit {
  listener!: Listener;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private storage: StorageService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        const listener = this.storage.getListenerById(id);
        if (listener) {
          this.listener = listener;
        }
      }
    });
  }

  deleteListener() {
    this.storage.deleteListener(this.listener);
    this.router.navigateByUrl('/create-listener');

    this.snackBar.open('Listener have been removed successfully', 'Close');
  }
}
