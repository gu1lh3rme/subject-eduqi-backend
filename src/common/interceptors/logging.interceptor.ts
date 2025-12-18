import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();
    const { method, url } = request;

    const now = Date.now();

    return next.handle().pipe(
      tap(() => {
        const { statusCode } = response;
        const responseTime = Date.now() - now;
        console.log(`[${new Date().toISOString()}] ${method} ${url} - Status: ${statusCode} - ${responseTime}ms`);
      }),
      catchError((error) => {
        const responseTime = Date.now() - now;
        const { statusCode } = response;
        console.error(`[${new Date().toISOString()}] ${method} ${url} - ERROR: ${error.status || statusCode || 500} - ${responseTime}ms`);
        console.error(`Error details:`, error.message || error);
        console.error("Response error:", error.response?.message || response.statusMessage || 'Unknown error');
        return throwError(() => error);
      }),
    );
  }
}