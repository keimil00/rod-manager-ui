export interface VotingItem {
  id: number;
  title: string;
  description: string;
  options: VotingOption[];
  end_date: Date;
}


// export interface VotingItem2 {
//   id: number;
//   title: string;
//   description: string;
//   options: VotingOption2[];
//   finishDate: Date;
// }


export interface VotingOption {
  option_id: number;
  label: string;
  vote_count: number;
}


// export interface VotingOption2 {
//   optionId: number;
//   label: string;
//   votes: number;
// }
