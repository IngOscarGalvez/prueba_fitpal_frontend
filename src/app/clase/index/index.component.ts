import { Component, OnInit } from '@angular/core';

import { ClaseService } from '../clase.service';


@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  clases: any;
  datos: any[] = [];
  currentPage = 1;
  totalPages = 1;
  links: any[] = [];
  filteredLinks: any[];

  constructor(public claseService: ClaseService) { }

  ngOnInit(): void {
    this.obtenerDatosPaginados(this.currentPage);
  }

  deleteClase(id: any){
    if (confirm('¿Estás seguro de que deseas eliminar esta clase?')) {
      this.claseService.delete(id).subscribe(res => {
        this.obtenerDatosPaginados(this.currentPage);
      })
    }

  }

  obtenerDatosPaginados(page: number): void {
    this.claseService.obtenerDatosPaginados(page)
      .subscribe(response => {
        this.datos = response.result.data;
        this.currentPage = response.result.current_page;
        this.totalPages = response.result.last_page;
        this.links = response.result.links;
        this.filterLinks(this.links);
      });
  }

  cambiarPagina(page: number): void {
    this.obtenerDatosPaginados(page);
  }

  filterLinks(links: any[]) {
    this.filteredLinks = links.filter(link => {
      return link.label !== 'Next &raquo;' && link.label !== '&laquo; Previous';
    });
  }

}
