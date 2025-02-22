import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { User } from 'src/users/user.entity';

@Injectable()
export class MailProvider {
  constructor(
    // inject the mailer services
    private readonly mailerService: MailerService,
  ) {}

  public async welcomeEmail(user: User): Promise<void> {
    await this.mailerService.sendMail({
      to: user.email,
      from: `<helpdesk@codeland.com>`,
      subject: `welcome to  a day in the life of Aliyu Ahmad`,
      template: './welcome',
      context: {
        name: user.firstName,
        email: user.email,
        loginUrl: 'http://localhost:3000/',
      },
    });
  }
}
