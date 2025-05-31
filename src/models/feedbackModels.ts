export interface IFeedback {
    id: string;
    senderId: string; // Can be 'anonymous'
    recipientId: string | null;
    text: string;
    tags: string[];
    anonymous: boolean;
    timestamp: Date;
    _originalSenderId: string; // Internal use to track original sender even if anonymous

    toJSON(): object; // Method signature for serialization
}

export class Feedback implements IFeedback {
    public id: string;
    public senderId: string;
    public recipientId: string | null;
    public text: string;
    public tags: string[];
    public anonymous: boolean;
    public timestamp: Date;
    public _originalSenderId: string;

    constructor(senderId: string, text: string, tags: string[] = [], anonymous: boolean = false, recipientId: string | null = null) {
        this.id = Date.now().toString() + Math.random().toString(36).substring(2, 9); // Simple unique ID
        this._originalSenderId = senderId;
        this.senderId = anonymous ? 'anonymous' : senderId;
        this.recipientId = recipientId;
        this.text = text;
        this.tags = tags;
        this.anonymous = anonymous;
        this.timestamp = new Date();
    }

    // Method to return a representation suitable for API responses
    public toJSON(): object {
        return {
            id: this.id,
            senderId: this.senderId,
            recipientId: this.recipientId,
            text: this.text,
            tags: this.tags,
            anonymous: this.anonymous,
            timestamp: this.timestamp.toISOString(),
        };
    }
}