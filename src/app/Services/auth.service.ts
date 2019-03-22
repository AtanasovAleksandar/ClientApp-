import { Injectable } from '@angular/core';
import { UserManager, User, WebStorageStateStore, Log } from 'oidc-client';
import { Constants } from '../constants';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { AuthContext } from '../models/auth-context';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _userManager: UserManager;
  private _user: User;
  authContext: AuthContext;
  role: any;

  constructor(private httpClient: HttpClient) {
    var config = {
      authority: Constants.stsAuthority,

      client_id: Constants.clientId,

      redirect_uri: 'http://localhost:33117/signin-oidc',

      scope: 'openid sensorsapi profile',

      response_type: 'id_token token',

      post_logout_redirect_uri: 'http://localhost:33117/signout-callback-oidc',

      userStore: new WebStorageStateStore({ store: window.localStorage }),

      automaticSilentRenew: true,

      silent_redirect_uri: `${Constants.clientRoot}assets/silent-redirect.html`,

      //more configuration
      issuer: "http://localhost:33124",
      authorization_endpoint: "http://localhost:33124/connect/authorize",
      userinfo_endpoint: "http://localhost:33124/connect/userinfo",
      end_session_endpoint: "http://localhost:33124/connect/endsession",
      jwks_uri: "http://localhost:33124/.well-known/openid-configuration/jwks",
    };
    this._userManager = new UserManager(config);
    this._userManager.getUser().then(user => {
      if (user && !user.expired) {
        this._user = user;
        console.log(this._user)
        this.getUserRole();
        // this.loadSecurityContext();
      }
    });
    this._userManager.events.addUserLoaded(args => {
      this._userManager.getUser().then(user => {
        this._user = user;
        // this.loadSecurityContext();
      });
    });
  }

  getUserRole() {
    this._userManager.getUser().then(user => {
      this.role = this._user.profile.role
      //late subscribe
      console.log(this._user.profile.role)
      // var subject = new Rx.Subject();
    });
  }

  login(): Promise<any> {
    return this._userManager.signinRedirect();
  }

  logout(): Promise<any> {
    return this._userManager.signoutRedirect();
  }

  isLoggedIn(): boolean {
    // console.log(this._user , this._user.access_token && !this._user.expired)
    return this._user && this._user.access_token && !this._user.expired;
  }

  getAccessToken(): string {
    return this._user ? this._user.access_token : '';
  }

  signoutRedirectCallback(): Promise<any> {
    return this._userManager.signoutRedirectCallback();
  }

  // loadSecurityContext() {
  //   this.httpClient.get<AuthContext>(`${Constants.apiRoot}Account/AuthContext`).subscribe(context => {
  //     this.authContext = context;
  //     console.log(this.authContext);
  //     console.log(this.authContext.claims);
  //     console.log(this.authContext.userProfile);
  //   }, error => 
  //   console.error(error))
  //   // console.error(Utils.formatError(error)));

  // }

}
