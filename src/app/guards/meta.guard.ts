import { CanActivateFn } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
import { inject } from '@angular/core';

export const metaGuard: CanActivateFn = (route, state) => {
  const metaService = inject(Meta);
  const titleService = inject(Title);

  // Extract title and meta tags from route data
  const title = route.data['title'] || 'Default Title';
  const description = route.data['description'] || 'Default Description';

  // Set the page title
  titleService.setTitle(title);

  // Set meta tags
  metaService.updateTag({ name: 'description', content: description });

  // Return true to allow route activation
  return true;
};
