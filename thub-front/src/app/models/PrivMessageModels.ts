export interface Sender{
    id: number;
}

export interface PrivMessage {
    content: string;
    timestamp: string;
    sender: Sender;
}