import {ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {MatCheckbox} from "@angular/material/checkbox";
import {MatButton, MatFabButton, MatIconButton, MatMiniFabButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatToolbar} from "@angular/material/toolbar";
import {MatInput} from "@angular/material/input";
import {NgIf, NgStyle} from "@angular/common";
import {MatOption} from "@angular/material/core";
import {MatSelect} from "@angular/material/select";
import {MatTooltip} from "@angular/material/tooltip";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-teleprompter',
  standalone: true,
  imports: [
    FormsModule,
    MatCheckbox,
    MatButton,
    MatIcon,
    MatLabel,
    MatFormField,
    MatIconButton,
    MatToolbar,
    MatInput,
    NgStyle,
    NgIf,
    MatMiniFabButton,
    MatFabButton,
    MatOption,
    MatSelect,
    MatTooltip,
    RouterLink
  ],
  templateUrl: './teleprompter.component.html',
  styleUrl: './teleprompter.component.scss'
})
export class TeleprompterComponent implements OnInit {
  @ViewChild('scrollContainer') scrollContainer!: ElementRef;
  @ViewChild('videoPreview', {static: false}) videoPreview?: ElementRef<HTMLVideoElement>;

  isPlaying = false;
  speed = 30; // px/s
  fontSize = 70; // px
  recordAudio = false;
  recordVideo = false;
  elapsedTime = 0;
  totalTime = 0;

  text = '';

  private startTime = 0;
  private interval: any;
  private mediaRecorder?: MediaRecorder;
  stream?: MediaStream;

  private audioContext?: AudioContext;
  private analyser?: AnalyserNode;
  private dataArray?: Uint8Array;
  private sourceNode?: MediaStreamAudioSourceNode;
  private speakingInterval?: any;
  isSpeaking = false;
  private currentVolume = 0;

  constructor(private cdr: ChangeDetectorRef) {
  }


  ngOnInit() {
    this.text = localStorage.getItem('teleprompter_text') || this.text;
    this.calculateTotalTime();
  }

  calculateTotalTime() {
    setTimeout(() => {
      if (!this.scrollContainer) return;
      const container = this.scrollContainer.nativeElement;
      const scrollHeight = container.scrollHeight;
      const clientHeight = container.clientHeight;
      const totalScrollable = scrollHeight - clientHeight;
      this.totalTime = Math.ceil(totalScrollable / this.speed);
    }, 0);
  }

  formatTime(seconds: number): string {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  }

  async togglePlay() {
    this.isPlaying = !this.isPlaying;
    if (this.isPlaying) {
      this.startScrolling();
      if (this.recordAudio || this.recordVideo) {
        await this.startRecording();
      }
    } else {
      this.stopScrolling();
      this.pauseRecording();
    }
  }

  stop() {
    this.isPlaying = false;
    this.elapsedTime = 0;
    this.scrollContainer.nativeElement.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    this.stopScrolling();
    this.stopRecording();
    this.startPreviewStream().then();
  }

  private animationFrameId: number | null = null;

  startScrolling() {
    const container = this.scrollContainer.nativeElement;
    const startTime = performance.now();
    const scrollSpeed = this.speed; // px/s
    const initialScrollTop = container.scrollTop;
    this.videoHidden = true;

    const animate = (now: number) => {
      const elapsedMs = now - startTime;
      const newScrollTop = initialScrollTop + (scrollSpeed * elapsedMs / 1000);
      container.scrollTop = newScrollTop;
      this.elapsedTime = Math.floor(elapsedMs / 1000);
      if (this.isPlaying) {
        this.animationFrameId = requestAnimationFrame(animate);
      }
    };

    this.animationFrameId = requestAnimationFrame(animate);
  }

  stopScrolling() {
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
    this.videoHidden = false;
  }

  async startRecording() {
    this.stream = await navigator.mediaDevices.getUserMedia({
      audio: this.recordAudio,
      video: this.recordVideo
    });

    if (this.recordVideo && this.videoPreview) {
      // this.videoPreview.nativeElement.srcObject = this.stream;
      this.cdr.detectChanges();
      this.videoPreview.nativeElement.srcObject = this.stream;
      await this.videoPreview.nativeElement.play();
    }

    if (this.recordAudio) {
      this.setupAudioDetection(this.stream);
    }

    this.mediaRecorder = new MediaRecorder(this.stream);
    const chunks: Blob[] = [];

    this.mediaRecorder.ondataavailable = (e) => chunks.push(e.data);

    this.mediaRecorder.onstop = () => {
      const blob = new Blob(chunks, {type: this.recordVideo ? 'video/webm' : 'audio/webm'});
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = this.recordVideo ? 'video.webm' : 'audio.webm';
      a.click();
    };

    this.mediaRecorder.start();
  }

  pauseRecording() {
    if (this.mediaRecorder && this.mediaRecorder.state === 'recording') {
      this.mediaRecorder.pause();
    }
  }

  setupAudioDetection(stream: MediaStream) {
    this.audioContext = new AudioContext();
    this.analyser = this.audioContext.createAnalyser();
    this.sourceNode = this.audioContext.createMediaStreamSource(stream);
    this.sourceNode.connect(this.analyser);
    this.analyser.fftSize = 512;

    const bufferLength = this.analyser.frequencyBinCount;
    this.dataArray = new Uint8Array(bufferLength);

    this.speakingInterval = setInterval(() => {
      this.analyser!.getByteFrequencyData(this.dataArray!);
      const volume = this.dataArray!.reduce((a, b) => a + b) / bufferLength;
      this.currentVolume = volume;
      this.isSpeaking = volume > 10;
    }, 100);
  }

  stopRecording() {
    if (this.mediaRecorder && this.mediaRecorder.state !== 'inactive') {
      this.mediaRecorder.stop();
    }
    this.stream?.getTracks().forEach(t => t.stop());
    if (this.videoPreview && this.videoPreview.nativeElement.srcObject) {
      this.videoPreview.nativeElement.srcObject = null;
    }

    clearInterval(this.speakingInterval);
    this.isSpeaking = false;
  }

  toggleFullscreen() {
    const el = document.documentElement;
    if (!document.fullscreenElement) {
      el.requestFullscreen().then(() => {
        // Fullscreen mode activated
        this.scrollContainer.nativeElement.style.height = '100vh';
      });
    } else {
      document.exitFullscreen().then(() => {
        // Fullscreen mode exited
        this.scrollContainer.nativeElement.style.height = 'auto';
      });
    }
  }

  async startPreviewStream() {
    // Si ya hay un stream, detenerlo y limpiarlo para obtener uno nuevo
    this.stream?.getTracks().forEach(track => track.stop());
    this.stream = undefined;
    if (this.audioContext) {
      this.audioContext.close();
      this.audioContext = undefined;
    }
    clearInterval(this.speakingInterval);
    this.isSpeaking = false;

    // Solo pedir stream si se necesita grabar audio o video
    if (this.recordAudio || this.recordVideo) {
      try {
        this.stream = await navigator.mediaDevices.getUserMedia({
          audio: this.recordAudio,
          video: this.recordVideo
        });

        if (this.videoPreview && this.recordVideo) {
          this.cdr.detectChanges(); // Asegura que el DOM esté listo
          this.videoPreview.nativeElement.srcObject = this.stream;
          // Intentar reproducir, pero puede fallar si no es muted o por políticas del navegador
          try {
            await this.videoPreview.nativeElement.play();
          } catch (err) {
            console.warn('Playback of video preview failed, likely due to autoplay policies:', err);
          }
        } else if (this.videoPreview) {
          // Si no se graba video, pero la preview existe, limpiar el srcObject
          this.videoPreview.nativeElement.srcObject = null;
        }

        if (this.recordAudio) {
          this.setupAudioDetection(this.stream);
        }

      } catch (err) {
        console.error('Error al obtener el stream de medios para previsualización:', err);
        alert('No se pudieron obtener permisos de cámara/micrófono. Asegúrate de permitirlos.');
        this.recordAudio = false; // Desactivar si falla
        this.recordVideo = false; // Desactivar si falla
        this.stream = undefined; // Asegurarse de que el stream es null
      }
    } else if (this.videoPreview) {
      this.videoPreview.nativeElement.srcObject = null;
    }
  }

  async toggleRecordAudio() {
    this.recordAudio = !this.recordAudio;
    await this.startPreviewStream();
    if (this.videoPreview && this.videoPreview.nativeElement) {
      this.videoPreview.nativeElement.muted = true;
    }
  }

  async toggleRecordVideo() {
    this.recordVideo = !this.recordVideo;
    await this.startPreviewStream();
    if (this.videoPreview && this.videoPreview.nativeElement) {
      this.videoPreview.nativeElement.muted = true;
    }
  }

  onChangeReadingMode(event: any) {
    const mode = event.value;
    localStorage.setItem('teleprompter_reading_mode', mode);

    if (mode === 'fast') {
      this.speed = 300; // px/s
      this.fontSize = 150; // px
    } else if (mode === 'standard') {
      this.speed = 120; // px/s
      this.fontSize = 100; // px
    } else if (mode === 'slow') {
      this.speed = 30; // px/s
      this.fontSize = 70; // px
    }

    this.calculateTotalTime();
  }

  videoHidden = false;

  toggleVideoPosition() {
    this.videoHidden = !this.videoHidden;
  }

}
