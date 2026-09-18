export interface CreateMessageInput {
  content: string;
}

export interface MessageRecord {
  id: string;
  ticketId: string;
  authorId: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateMessageData {
  ticketId: string;
  authorId: string;
  content: string;
}
