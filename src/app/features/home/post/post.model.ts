export class Post {
  id!: number;
  title!: string;
  body!: string;
  tags!: string[];
  date!: Date;
}

export class Tag {
  name!: string;
  selected!: boolean;
}

export class TagDto {
    name!: string;
    times_used!: number;
}
