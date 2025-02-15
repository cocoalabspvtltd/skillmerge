
// src/app/services/refresh.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RefreshService {
  private readonly refreshKey = 'pageRefreshed';

  constructor() {
    this.checkAndRefresh();
  }

  private checkAndRefresh(): void {
    if (!localStorage.getItem(this.refreshKey)) {
      // Page has not been refreshed yet
      localStorage.setItem(this.refreshKey, 'true');
      // Refresh the page
      window.location.reload();
    } else {
      // Page has already been refreshed
      localStorage.removeItem(this.refreshKey);
    }
  }
}