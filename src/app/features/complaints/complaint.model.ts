export class ComplaintInfo {
  id!: number;
  title!: string;
  state!: string;
}

export class ComplaintWithMessages {
  id!: number;
  title!: string;
  state!: string;
  messages!: Message[];
  submitter?: string;
}

export class Message {
  id!: number;
  author!: 'USER' | 'MANAGER';
  content!: string;
  creation_date!: Date;
}
