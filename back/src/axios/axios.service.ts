import * as config from 'config';
import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { MyLogger } from 'src/logger/logger.service';
import { catchError, firstValueFrom, map } from 'rxjs';
import { AxiosError } from 'axios';

const flaskConfig = config.get('flask');

@Injectable()
export class AxiosService {
  constructor(
    private readonly httpService: HttpService,
    private logger: MyLogger,
  ) {
    this.logger.setContext(AxiosService.name);
  }

  private bytesToBase64(bytes: Uint8Array): string {
    const binString = String.fromCodePoint(...bytes);
    return btoa(binString);
  }

  async FlaskRequest(body: { content: string }): Promise<any> {
    // flask 서버로 요청 보낼 body 내용
    const apiUrl =
      `http://127.0.0.1` + ':' + `${flaskConfig.port}` + `/summary`;

    this.logger.log(`http://${apiUrl}로 Post 요청!`);

    const username = process.env.FLASK_USER_NAME || flaskConfig.username;
    const password = process.env.FLASK_PASSWORD || flaskConfig.password;

    const encodedUsername = this.bytesToBase64(
      new TextEncoder().encode(username),
    );
    const encodedPassword = this.bytesToBase64(
      new TextEncoder().encode(password),
    );

    const requestHeader = {
      'Content-Type': 'application/json',
      Authorization: `Basic ${encodedUsername}:${encodedPassword}`,
    };

    const flaskRequest = await firstValueFrom(
      this.httpService
        .post(apiUrl, body, { headers: requestHeader })
        .pipe(map((res) => res.data[0].summary_text))
        .pipe(
          catchError((error: AxiosError) => {
            console.error('Axios Error::', error);
            throw 'Flask Server 에러 발생!';
          }),
        ),
    );
    console.log('데이터 : ', flaskRequest);
    return flaskRequest;
  }
}
