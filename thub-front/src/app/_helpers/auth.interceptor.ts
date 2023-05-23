import { HTTP_INTERCEPTORS, HttpEvent } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpHandler, HttpRequest } from "@angular/common/http";

import { TokenStorageService } from "../services/token-storage.service";
import { Observable } from "rxjs";

const TOKEN_HEADER_KEY = "Authorization"; // Header for spring API

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private token: TokenStorageService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log("intercepting...")
    let authReq = req;
    console.log(authReq);

    const token = this.token.getToken();
    console.log(token);
    if (token != null) {
      authReq = req.clone({ headers: req.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + token) });
      console.log(authReq);
    }
    return next.handle(authReq);
  }
}

export const authInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, userClass: AuthInterceptor, multi: true}
];
