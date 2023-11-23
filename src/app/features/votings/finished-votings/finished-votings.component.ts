import {AfterViewInit, Component, ElementRef, QueryList, ViewChildren} from '@angular/core';
import * as ApexCharts from 'apexcharts';
import {VotingItem, VotingItem2} from "../voting-item.model";
import {VotingsService} from "../votings.service";

@Component({
    selector: 'app-finished-votings',
    templateUrl: './finished-votings.component.html',
    styleUrls: ['./finished-votings.component.scss']
})
export class FinishedVotingsComponent implements AfterViewInit {

    // @ts-ignore
    finishedVotes: VotingItem2[]
    // @ts-ignore
    @ViewChildren('chart') chartElements: QueryList<ElementRef>;

    constructor(private votingService: VotingsService) {
    }

    ngOnInit() {
        this.getFinishedVotes();
    }

    getFinishedVotes() {
        this.votingService.getFinishedVotes().subscribe((votes: VotingItem2[]) => {
            this.finishedVotes = votes;
        });
    }

    ngAfterViewInit() {
        this.generateCharts();
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
