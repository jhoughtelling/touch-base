import * as SMS from "expo-sms";
import { SMSAttachment } from "expo-sms";
import { Contact } from "../models/Contact";
import { Message } from "../models/Message";

class SMSProxy {
  public async isSmSAvailableAsync() {
    return await SMS.isAvailableAsync();
  }

  public async sendMessageAsync(contact: Contact, message: Message) {
    const text = this.updateMessageParams(message.text, contact);
    const attachments = new Array<SMSAttachment>();
    for (let i = 0; i < message.images.length; i++) {
      let uri = message.images[i];
      let filename = uri.substring(uri.lastIndexOf("/") + 1);
      let mimeType = `image/${filename.substring(filename.lastIndexOf(".") + 1)}`;
      attachments.push({ uri, filename, mimeType });
    }
    await SMS.sendSMSAsync(contact.phone, text, { attachments });
  }

  private updateMessageParams(message: Readonly<string>, contact: Contact) {
    return message
      .replaceAll("@firstName", contact.firstName ?? "")
      .replaceAll("@lastName", contact.lastName ?? "")
      .replaceAll("@nickName", contact.nickName ?? "");
  }
}

export default SMSProxy;
