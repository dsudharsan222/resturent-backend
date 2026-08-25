import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Response<T> {
  settings: {
    success: number;
    message: string;
  };
  data: T;
}

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const method = request.method;

    return next.handle().pipe(
      map((data) => {
        // If the service already returned a formatted Response like { settings: { success, message }, data }
        if (data && typeof data === 'object' && data.settings && typeof data.settings.success !== 'undefined') {
          return data;
        }

        let message = '';
        
        // Generate automatic default messages for mutations
        if (method === 'POST') message = 'Successfully created';
        else if (method === 'PUT' || method === 'PATCH') message = 'Successfully updated';
        else if (method === 'DELETE') message = 'Successfully deleted';

        let actualData = data;

        if (data && typeof data === 'object' && !Array.isArray(data)) {
          // Clone the object to avoid mutating the original reference
          const clonedData = { ...data };
          
          // Allow services to override the default message by returning a 'message' property
          if ('message' in clonedData) {
            message = clonedData.message;
            delete clonedData.message;
          }
          if ('success' in clonedData) {
            delete clonedData.success;
          }
          
          if (Object.keys(clonedData).length === 1 && clonedData.data !== undefined) {
             actualData = clonedData.data;
          } else if (Object.keys(clonedData).length === 0) {
             actualData = {};
          } else {
             actualData = clonedData;
          }
        }

        return {
          settings: {
            success: 1,
            message: message,
          },
          data: actualData ?? {},
        };
      }),
    );
  }
}
