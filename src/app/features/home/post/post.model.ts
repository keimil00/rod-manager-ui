export class Post {
  id!: number;
  title!: string;
  body!: string;
  tags!: string[];
  event?: PostEvent;
}

export class Tag {
  name!: string;
  selected!: boolean;
}

export class TagDto {
    name!: string;
    times_used!: number;
}

export class PostEvent {
  date!: Date;
  name!: string;
}
