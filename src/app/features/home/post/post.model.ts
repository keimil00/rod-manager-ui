export class Post {
  title!: string;
  content!: string;
  tags!: string[];
}

export class Tag {
  name!: string;
  selected!: boolean;
}

export class TagDto {
    name!: string;
    times_used!: number;
}
