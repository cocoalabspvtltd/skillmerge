import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class MetaTagsService {

  constructor(private meta: Meta, private title: Title) {}

  setMeta(route: ActivatedRouteSnapshot) {
    const title = route.data['title'] || 'Default Title';
    const description = route.data['description'] || 'Default Description';
    
    this.title.setTitle(title);
    this.meta.updateTag({ name: 'description', content: description });
  }
}
