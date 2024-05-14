import { MailDataRequired } from "@sendgrid/helpers/classes/mail";
import SendGrid from "@sendgrid/mail";

import { config } from "../configs/config";
import { emailTemplateConstant } from "../constants/email-template.constant";
import { EmailTypeEnum } from "../enums/email-type.enum";
import { EmailTypeToPayloadType } from "../types/email-type-to-payload.type";

class SendGridService {
  constructor() {
    SendGrid.setApiKey(config.SENDGRID_API_KEY);
  }
  private async send(email: MailDataRequired): Promise<void> {
    try {
      SendGrid.send(email);
    } catch (error) {
      console.log("Error email: ", error);
    }
  }
  public async sendByType<T extends EmailTypeEnum>(
    to: string,
    type: T,
    dynamicTemplateData: EmailTypeToPayloadType[T],
  ): Promise<void> {
    try {
      const templateId = emailTemplateConstant[type].templateId;
      await this.send({
        from: config.SENDGRID_FROM_EMAIL,
        to: to,
        templateId,
        dynamicTemplateData,
      });
    } catch (error) {
      console.log("Error email: ", error);
    }
  }
}

export const sendGridService = new SendGridService();
