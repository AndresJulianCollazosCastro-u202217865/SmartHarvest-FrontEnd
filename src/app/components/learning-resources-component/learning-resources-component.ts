import {Component, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LearningResourcesService} from '../../services/learning-resource-service';
import {LearningResourceReport} from '../../model/learning-resource-report';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-learning-resources',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './learning-resources-component.html',
  styleUrl: './learning-resources-component.css'
})
export class LearningResourcesComponent {

  service = inject(LearningResourcesService);
  categoriaSeleccionada = 'explicativo';
  recursos: LearningResourceReport[] = [];

  ngOnInit(): void {
    this.cargarRecursos();
  }

  cargarRecursos() {
    this.service.getByCategoria(this.categoriaSeleccionada).subscribe(data => {
      this.recursos = data;
    });
  }

  onCategoriaChange() {
    this.cargarRecursos();
  }

  verVideo(link: string) {
    if (link) {
      window.open(link, '_blank');
    }
  }

  getYoutubeThumbnail(link: string): string {
    if (!link) return '';

    const regex = /(?:youtube\.com.*(?:\?|&)v=|youtu\.be\/)([^&]+)/;
    const match = link.match(regex);
    const videoId = match ? match[1] : null;

    return videoId
      ? `https://img.youtube.com/vi/${videoId}/0.jpg`
      : 'https://via.placeholder.com/400x200';
  }

}
