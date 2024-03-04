import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private static TOKEN_KEY = '';

  // Sauvegarde le token JWT dans le stockage sécurisé
  async setToken(token: string): Promise<void> {
    if (token === undefined || token === null || token.length < 10) throw new Error('Le token ne peut pas être null');
    await Preferences.set({
      key: AuthService.TOKEN_KEY,
      value: token,
    });
    // console.log('Token sauvegardé ' + token);
  }

  // Récupère le token JWT du stockage
  async getToken(): Promise<string | null> {
    const ret = await Preferences.get({ key: AuthService.TOKEN_KEY });
    // console.log(' getToken ' + ret.value);
    return ret.value;
  }

  // Vérifie si l'utilisateur est connecté
  async isUserLoggedIn(): Promise<boolean> {
    const token = await this.getToken();
    return token !== null && token.length > 10;
  }

  // Efface le token JWT du stockage, déconnectant ainsi l'utilisateur
  async logout(): Promise<void> {
    await Preferences.remove({ key: AuthService.TOKEN_KEY });
  }
}
