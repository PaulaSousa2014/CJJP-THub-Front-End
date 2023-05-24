import { Component } from '@angular/core';
import { PartiesService } from 'src/app/services/parties.service';

@Component({
  selector: 'app-parties',
  templateUrl: './parties.component.html',
  styleUrls: ['./parties.component.css']
})
export class PartiesComponent {
  parties: any[] = [];
  filteredParties: any[] = []; // Nuevo arreglo para almacenar las parties filtradas
  selectedPartyType: string = ''; // Variable para almacenar el tipo de party seleccionado

  constructor(private partiesService: PartiesService) {}

  ngOnInit() {
    this.getAllParties();
  }

  getAllParties() {
    this.partiesService.getParties().subscribe({
      next: (data: any) => {
        this.parties = data;
        this.filteredParties = this.parties; // Inicialmente, mostrar todas las parties sin filtrar
        console.log(this.parties);
      },
      error: (error: any) => {
        console.log("Cannot get parties", error);
      }
    });
  }

  filterPartiesByType(partyType: string) {
    this.selectedPartyType = partyType;

    if (partyType === 'all') {
      this.filteredParties = this.parties; // Mostrar todas las parties sin filtrar
    } else {
      this.filteredParties = this.parties.filter(party => party[partyType] !== null); // Filtrar las parties según el tipo seleccionado
    }
  }
}
