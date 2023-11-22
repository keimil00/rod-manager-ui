export interface VotingItem {
  id: string;
  title: string;
  description: string;
  options: VotingOption[];
}

export interface VotingOption {
  label: string;
  optionId: string;
}
