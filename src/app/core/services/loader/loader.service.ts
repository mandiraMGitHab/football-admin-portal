import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  isLoading = new Subject<boolean>();

  show() {
    this.isLoading.next(true);
  }

  hide() {
    this.isLoading.next(false);
  }

  waitFor(sec: number): Promise<void> {
    this.show();
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
        this.hide();
      }, sec);
    });
  }
}
