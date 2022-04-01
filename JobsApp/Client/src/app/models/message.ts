export class Message{
    id: number;
    senderId: number;
    senderUsername: string;
    senderPhotoUrl?: string;
    recipientId: number;
    recipientUsername: string;
    recipientPhotoUrl?: string;
    content: string;
    dateRead: Date;
    messageSent: Date;
    senderKnownAs: string;
    recipientKnownAs: string;

    ///recipient
    employerOrEmployee : string;
}