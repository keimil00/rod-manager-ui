import {Component, ElementRef, QueryList, ViewChildren} from '@angular/core';
import * as ApexCharts from 'apexcharts';
import {VotedItem, VotingItem} from "../voting-item.model";
import {VotingsService} from "../votings.service";
import {Subscription} from "rxjs";
@Component({
  selector: 'app-voted-votings',
  templateUrl: './voted-votings.component.html',
  styleUrls: ['./voted-votings.component.scss']
})
export class VotedVotingsComponent {

  // @ts-ignore
  finishedVotes: VotedItem[]
  // @ts-ignore
  @ViewChildren('chart') chartElements: QueryList<ElementRef>;

  // @ts-ignore
  private addVoteFinishedSubscription: Subscription;

  constructor(private votingService: VotingsService) {
  }

  ngOnInit() {
    this.getVotedVotes();
    this.addVoteFinishedSubscription = this.votingService.addVoteFinished$.subscribe(() => {
      this.votingService.getVotedVoting().subscribe((votes: VotedItem[]) => {
        this.finishedVotes = votes;
        this.tryGenerateCharts2();
      });
    });
  }

  ngOnDestroy() {
    this.addVoteFinishedSubscription.unsubscribe();
  }

  ngAfterViewInit() {
    // TODO - this is a workaround for a bug in ApexCharts
    this.tryGenerateCharts()
  }

  tryGenerateCharts2() {
    // Check if we have all the necessary data
    let stop =0
    while (stop<10) {
      setTimeout(() => {
        console.log("Trying to regenerate charts")
        this.generateCharts();
        stop++;
        if(this.chartElements){stop=1000}
      }, 100); // Wait for 100ms before the next attempt
      return;
    }

    // We have all the data, generate the charts

  }


  tryGenerateCharts() {
    // Check if we have all the necessary data
    if (!this.chartElements || !this.finishedVotes) {
      setTimeout(() => {
        this.tryGenerateCharts(); // Try generating charts again after a short interval
        console.log("Trying to generate charts")
      }, 100); // Wait for 100ms before the next attempt
      return;
    }

    // We have all the data, generate the charts
    this.generateCharts();
  }

  getVotedVotes() {
    this.votingService.getVotedVoting().subscribe((votes: VotedItem[]) => {
      this.finishedVotes = votes;
    });
  }

  getVote(vote: VotedItem, optionId: number) {
    return vote.options.find(option => option.option_id === optionId)?.label;
  }


  generateCharts() {
    this.chartElements.forEach((element, index) => {
      const vote = this.finishedVotes[index];

      const chartOptions: ApexCharts.ApexOptions = {
        theme: {
          mode: 'light',
          palette: 'palette4',
        },
        series: vote.options.map((option: { vote_count: any; }) => option.vote_count),
        chart: {
          type: 'donut',
          width: 550
        },
        dataLabels: {
          enabled: true
        },
        fill: {
          type: "gradient"
        },
        labels: vote.options.map((option: { label: any; }) => option.label),
        legend: {
          position: "bottom",
          horizontalAlign: 'center',
          fontSize: '14px',
        },
        responsive: [
          {
            breakpoint: 600,
            options: {
              chart: {
                type: 'pie',
                width: '100%' // Ustawienie szerokości na 70% dla ekranów o szerokości poniżej 480px
              },
              legend: {
                position: "bottom",
                horizontalAlign: 'center',
              },
              dataLabels: {
                enabled: true
              },
            }
          },
        ]
      };
      const chart = new ApexCharts(element.nativeElement, chartOptions);
      chart.render();
    });
  }
}
