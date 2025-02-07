import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getAppStatus(baseUrl: string): string {
    return 'Server is running, your IP is from ' + baseUrl;
  }
}
