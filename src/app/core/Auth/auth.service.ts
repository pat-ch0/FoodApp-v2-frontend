import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';

/**
 * Service responsible for handling authentication-related functionality.
 */
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private static TOKEN_KEY = '';

  /**
   * Sets the authentication token.
   * @param token - The authentication token to be set.
   * @throws Error if the token is null, undefined, or has a length less than 10.
   */
  async setToken(token: string): Promise<void> {
    if (token === undefined || token === null || token.length < 10) throw new Error('Le token ne peut pas être null');
    await Preferences.set({
      key: AuthService.TOKEN_KEY,
      value: token,
    });
  }

  /**
   * Retrieves the authentication token.
   * @returns The authentication token, or null if it does not exist.
   */
  async getToken(): Promise<string | null> {
    const ret = await Preferences.get({ key: AuthService.TOKEN_KEY });
    return ret.value;
  }

  /**
   * Checks if the user is logged in.
   * @returns True if the user is logged in, false otherwise.
   */
  async isUserLoggedIn(): Promise<boolean> {
    const token = await this.getToken();
    return token !== null && token.length > 10;
  }

  /**
   * Logs out the user by removing the authentication token.
   */
  async logout(): Promise<void> {
    await Preferences.remove({ key: AuthService.TOKEN_KEY });
  }
}
