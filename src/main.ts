import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';


// @todo add HttpClientModule to the provider list in the application bootstrap logic

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
