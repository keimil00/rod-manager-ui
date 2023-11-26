import {AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChildren} from '@angular/core';
import * as ApexCharts from 'apexcharts';
import {VotingItem} from "../voting-item.model";
import {VotingsService} from "../votings.service";
import {Subject} from "rxjs";

@Component({
  selector: 'app-finished-votings',
  templateUrl: './finished-votings.component.html',
  styleUrls: ['./finished-votings.component.scss']
})
export class FinishedVotingsComponent {

  // @ts-ignore
  finishedVotes: VotingItem[]
  // @ts-ignore
  @ViewChildren('chart') chartElements: QueryList<ElementRef>;

  constructor(private votingService: VotingsService) {
  }

  ngOnInit() {
    this.getFinishedVotes();
  }

  ngAfterViewInit() {
    // TODO - this is a workaround for a bug in ApexCharts
    this.tryGenerateCharts()
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

  getFinishedVotes() {
    this.votingService.getFinishedVotes().subscribe((votes: VotingItem[]) => {
      this.finishedVotes = votes;
    });
  }


  generateCharts() {
    this.chartElements.forEach((element, index) => {
      const vote = this.finishedVotes[index];

      const chartOptions: ApexCharts.ApexOptions = {
        theme: {
          mode: 'light',
          palette: 'palette4',
        },
        series: vote.options.map((option: { votes: any; }) => option.votes),
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
