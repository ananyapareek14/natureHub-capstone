// import { Injectable } from '@angular/core';
// import {
//   HttpRequest,
//   HttpHandler,
//   HttpEvent,
//   HttpInterceptor,
// } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { AuthService } from './auth.service';

// @Injectable({
//   providedIn: 'root',
// })
// export class JwtInterceptor implements HttpInterceptor {
//   constructor(private auth: AuthService) {}

//   intercept(
//     request: HttpRequest<any>,
//     next: HttpHandler
//   ): Observable<HttpEvent<any>> {
//     const token = this.auth.getToken();

//     if (token) {
//       request = request.clone({
//         setHeaders: {
//           // Authorization: `${token}`,
//           Authorization: `Bearer ${token}`,
//         },
//       });
//     }

//     return next.handle(request);
//   }
// }

import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class JwtInterceptor implements HttpInterceptor {
  constructor(private auth: AuthService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = this.auth.getToken();
    console.log('🔍 Interceptor - Retrieved Token:', token); // Debugging log

    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `${token}`,
        },
      });

      console.log('✅ Interceptor - Request Headers:', request.headers);
    } else {
      console.warn(
        '⚠️ No token found in interceptor. Request sent without Authorization header.'
      );
    }

    return next.handle(request);
  }
}
