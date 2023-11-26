export interface VotingItem {
  id: number;
  title: string;
  description: string;
  options: VotingOption[];
  finishDate: Date;
}


export interface VotingItem2 {
  id: number;
  title: string;
  description: string;
  options: VotingOption2[];
  finishDate: Date;
}


export interface VotingOption {
  optionId: number;
  label: string;
}


export interface VotingOption2 {
  optionId: number;
  label: string;
  votes: number;
}
