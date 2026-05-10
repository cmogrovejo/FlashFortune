import { Component, ElementRef, ViewChild, signal } from '@angular/core';
import { RouterModule } from '@angular/router';

interface LogEntry {
  time: string;
  tag: 'INFO' | 'SUCCESS' | 'WARN';
  message: string;
}

const MOCK_LOGS: LogEntry[] = [
  { time: '10:00:01', tag: 'INFO',    message: 'HanfireWorker initialized.' },
  { time: '10:00:02', tag: 'INFO',    message: 'Canal SignalR establecido...' },
  { time: '10:00:03', tag: 'SUCCESS', message: 'Archivo recibido: clientes_abril.csv' },
  { time: '10:00:05', tag: 'INFO',    message: 'Iniciando validación de cabeceras...' },
  { time: '10:00:08', tag: 'INFO',    message: '250,000 registros procesados...' },
  { time: '10:00:12', tag: 'INFO',    message: '500,000 registros procesados...' },
  { time: '10:00:15', tag: 'WARN',    message: 'Duplicado detectado en línea 1,540,234' },
  { time: '10:00:18', tag: 'INFO',    message: '750,000 registros procesados...' },
  { time: '10:00:20', tag: 'INFO',    message: '>_ Awaiting final signature verification...' },
];

@Component({
  selector: 'app-data-loader',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './data-loader.component.html',
})
export class DataLoaderComponent {
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  currentStep = signal<1 | 2 | 3>(1);
  isDragOver = signal(false);
  selectedFile = signal<File | null>(null);
  uploadProgress = signal(74);
  logEntries = signal<LogEntry[]>(MOCK_LOGS);

  onDragOver(event: DragEvent) {
    event.preventDefault();
    this.isDragOver.set(true);
  }

  onDragLeave() {
    this.isDragOver.set(false);
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    this.isDragOver.set(false);
    const file = event.dataTransfer?.files[0];
    if (file) this.handleFile(file);
  }

  onBrowse() {
    this.fileInput.nativeElement.click();
  }

  onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) this.handleFile(file);
  }

  private handleFile(file: File) {
    this.selectedFile.set(file);
    this.currentStep.set(2);
  }
}
