import { Component, OnInit } from '@angular/core';
import { HorarioService } from '../horario.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  datos: any[] = [];
  currentPage = 1;
  totalPages = 1;
  links: any[] = [];
  filteredLinks: any[];
  historico = 1;

  constructor(public horarioService: HorarioService) { }

  ngOnInit(): void {
    this.obtenerDatosPaginados(this.currentPage,this.historico);
  }

  deleteHorario(id: any){
    if (confirm('¿Estás seguro de que deseas eliminar este horario?')) {
      this.horarioService.delete(id).subscribe(res => {
        this.obtenerDatosPaginados(this.currentPage,this.historico);
      })
    }

  }

  obtenerDatosPaginados(page: number,historico : number): void {
    this.horarioService.obtenerDatosPaginados(page,historico)
      .subscribe(response => {
        this.datos = response.result.data;
        this.currentPage = response.result.current_page;
        this.totalPages = response.result.last_page;
        this.links = response.result.links;
        this.filterLinks(this.links);
      });
  }

  cambiarPagina(page: number,historico : number): void {
    this.obtenerDatosPaginados(page, historico);
  }

  filterLinks(links: any[]) {
    this.filteredLinks = links.filter(link => {
      return link.label !== 'Next &raquo;' && link.label !== '&laquo; Previous';
    });
  }

  cambiarEstadoHistorico(historico : number){
    this.historico = historico;
    this.obtenerDatosPaginados(this.currentPage,this.historico);
  }

}

