import {Component, ElementRef, QueryList, ViewChildren} from '@angular/core';
import * as ApexCharts from 'apexcharts';
import {VotedItem, VotingItem} from "../voting-item.model";
import {VotingsService} from "../votings.service";
import {Subscription} from "rxjs";
import {ToastrService} from "ngx-toastr";

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

  constructor(
    private votingService: VotingsService,
    private toastr: ToastrService,
  ) {
  }

  ngOnInit() {
    this.scheduleMidnightRefresh();
    this.getVotedVotes();
    this.addVoteFinishedSubscription = this.votingService.addVoteFinished$.subscribe({
      next: () => {
        this.votingService.getVotedVoting().subscribe((votes: VotedItem[]) => {
          this.finishedVotes = votes;
          this.tryReGenerateCharts();
        });
      }, error: err => {
        console.error(err);
        this.toastr.error('Nie udało się dodać głosu', 'Błąd');
      }
    });
  }

  ngOnDestroy() {
    this.addVoteFinishedSubscription.unsubscribe();
  }

  ngAfterViewInit() {
    // TODO - this is a workaround for a bug in ApexCharts
    this.tryGenerateCharts()
  }

  // Teoretycznie to powinno odświeżać głosowania po północy, ale nie testowałem tego
  scheduleMidnightRefresh() {
    const now = new Date();
    const currentHour = now.getHours();

    // Oblicz czas do północy
    const midnight = new Date(now); // Tworzymy kopię obecnego czasu
    midnight.setHours(24, 0, 0, 0); // Ustawiamy na północ kolejnego dnia

    const timeUntilMidnight = midnight.getTime() - now.getTime();

    // Ustawienie timera na pobranie danych po północy
    setTimeout(() => {
      this.tryReGenerateCharts();
      this.scheduleMidnightRefresh(); // Zaplanowanie kolejnego pobrania danych po północy
    }, timeUntilMidnight);
  }

  tryReGenerateCharts() {
    let stop = 0
    while (stop < 200) {
      setTimeout(() => {
        console.log("Trying to regenerate charts")
        this.generateCharts();
        stop++;
        if (this.chartElements) {
          stop = 1000
        }
      }, 100);
      return;
    }
    if(stop === 200) {
      console.log("Failed to regenerate charts")
      this.toastr.error('Nie udało się wygenerować wykresów', 'Błąd');
    }
  }


  tryGenerateCharts() {
    // Check if we have all the necessary data
    let stop = 0
    if (!this.chartElements || !this.finishedVotes || stop > 200) {
      setTimeout(() => {
        this.tryGenerateCharts(); // Try generating charts again after a short interval
        console.log("Trying to generate charts")
        stop++;
      }, 100); // Wait for 100ms before the next attempt
      return;
    }
    if(stop === 200) {
      console.log("Failed to generate charts")
      this.toastr.error('Nie udało się wygenerować wykresów', 'Błąd');
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
