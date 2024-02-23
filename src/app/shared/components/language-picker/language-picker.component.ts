import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

/**
 * This component allows users to pick a language from a select dropdown.
 */
@Component({
  selector: 'app-language-picker',
  template: `
    <ion-item lines="none">
      <ion-icon name="globe" slot="start"></ion-icon>
      <ion-select
        [(ngModel)]="selected"
        (ionChange)="changeLanguage($event)"
        interface="popover"
      >
        <ion-select-option value="en">English</ion-select-option>
        <ion-select-option value="fr">Français</ion-select-option>
      </ion-select>
    </ion-item>
  `,
})
export class LanguagePickerComponent {
  selected: string;

  /**
   * Initializes the component and sets the default selected language.
   * @param translate Service used to handle translation switching.
   */
  constructor(private translate: TranslateService) {
    // Get the saved language from local storage or default to 'en'
    this.selected = localStorage.getItem('language') || this.translate.getDefaultLang();
    this.translate.use(this.selected);
  }

  /**
   * Changes the language of the app and updates the selected language.
   * @param event The selection change event containing the new value.
   */
  changeLanguage(event: any) {
    const lang = event.detail.value;
    this.translate.use(lang);
    this.selected = lang;
    localStorage.setItem('language', lang);
  }
}
