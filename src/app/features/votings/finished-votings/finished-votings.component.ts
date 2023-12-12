import {Component, ElementRef, QueryList, ViewChildren} from '@angular/core';
import * as ApexCharts from 'apexcharts';
import {VotedItem, VotingItem} from "../voting-item.model";
import {VotingsService} from "../votings.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-finished-votings',
  templateUrl: './finished-votings.component.html',
  styleUrls: ['./finished-votings.component.scss']
})
export class FinishedVotingsComponent {

  // @ts-ignore
  finishedVotes: VotedItem[]
  // @ts-ignore
  @ViewChildren('chart') chartElements: QueryList<ElementRef>;

  constructor(
    private votingService: VotingsService,
    private toastr: ToastrService,) {
  }

  ngOnInit() {
    this.scheduleMidnightRefresh();
    this.getFinishedVotes();
  }

  ngAfterViewInit() {
    // TODO - this is a workaround for a bug in ApexCharts
    this.tryGenerateCharts()
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
    if (stop === 200) {
      console.log("Failed to regenerate charts")
      this.toastr.error('Nie udało się wygenerować wykresów', 'Błąd');
    }

    // We have all the data, generate the charts
    this.generateCharts();
  }

  getFinishedVotes() {
    this.votingService.getFinishedVotes().subscribe((votes: VotedItem[]) => {
      this.finishedVotes = votes;
    });
  }

  // Teoretycznie to powinno odwieżać głosowania po północy, ale nie testowałem tego XD
  scheduleMidnightRefresh() {
    const now = new Date();
    const currentHour = now.getHours();

    // Oblicz czas do północy
    const midnight = new Date(now); // Tworzymy kopię obecnego czasu
    midnight.setHours(24, 0, 0, 0); // Ustawiamy na północ kolejnego dnia

    const timeUntilMidnight = midnight.getTime() - now.getTime();

    // Ustawienie timera na pobranie danych po północy
    setTimeout(() => {
      this.tryGenerateChartsAfterMidnight();
      this.scheduleMidnightRefresh(); // Zaplanowanie kolejnego pobrania danych po północy
    }, timeUntilMidnight);
  }

  tryGenerateChartsAfterMidnight() {
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
    if (stop === 200) {
      console.log("Failed to regenerate charts")
      this.toastr.error('Nie udało się wygenerować wykresów', 'Błąd');
    }
  }

  getVote(vote: VotedItem, optionId: number) {
    return vote.options.find(option => option.option_id === optionId)?.label;
  }


  generateCharts() {
    this.chartElements.forEach((element, index) => {
      const vote = this.finishedVotes[index];
      const totalVotes = vote.options.reduce((acc: number, option: {
        vote_count: number
      }) => acc + option.vote_count, 0);

      if (totalVotes > 0) {
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
      } else {
        const noVotesText = document.createElement('p');
        noVotesText.textContent = "Nie oddano żadnego głosu.";
        element.nativeElement.appendChild(noVotesText);
        const optionText = document.createElement('p');
        optionText.textContent = "Dostępne opcje:";
        element.nativeElement.appendChild(optionText);

        const optionsList = document.createElement('ul');
        vote.options.forEach((option: { label: string }) => {
          const optionItem = document.createElement('li');
          optionItem.textContent = option.label;
          optionsList.appendChild(optionItem);
        });
        element.nativeElement.appendChild(optionsList);
      }
    });
  }
}
