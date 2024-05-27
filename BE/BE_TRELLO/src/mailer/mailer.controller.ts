import { Body, Controller, Post } from '@nestjs/common';
import { MailerService } from './mailer.service';
import { SendEmailDto } from './mail.interface';


@Controller('mailer')
export class MailerController {
  constructor(private readonly mailerService: MailerService) {}
  @Post("/send-email")
  async sendMail(){
  }
}

