export class NotificactionResponse {
  id!: string;
  description!: string;
}

export class NotificationRequest {
  constructor(private description: string) {}
}
