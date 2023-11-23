export interface VotingItem {
  id: string;
  title: string;
  description: string;
  options: VotingOption[];
  finishDate: Date;
}


export interface VotingItem2 {
  id: string;
  title: string;
  description: string;
  options: VotingOption2[];
  finishDate: Date;
}


export interface VotingOption {
  optionId: string;
  label: string;
}


export interface VotingOption2 {
  optionId: string;
  label: string;
  votes: number;
}
