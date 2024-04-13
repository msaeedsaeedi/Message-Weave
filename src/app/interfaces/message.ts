export interface Message {
    id: string,
    message: string,
    sentby: string
}

export interface OMessage extends Message {
    operation: MessageOperation
}

export enum MessageOperation {
    Sent,
    Deleted
}