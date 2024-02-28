import { Component, OnInit, ViewChild } from '@angular/core';
import { BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';
import { Router } from '@angular/router';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { Message } from '@type/message.type';
import { AiService } from '@service/ai/ai.service';


@Component({
  selector: 'app-search-tab',
  templateUrl: './search-tab.page.html',
  styleUrls: ['./search-tab.page.scss'],
})


export class SearchTabPage implements OnInit {

  @ViewChild(IonModal)

  modal!: IonModal;
  messages: Message[] = [];
  messageRef: string = '';
  nothing!: string;
  isAvailable = true;
  prompt: string = this.messageRef;
  msgLoading: boolean = false

  constructor(private router: Router, private aiService: AiService) { }

  ngOnInit() {
    // -----------------------BAR CODE -----------------
    BarcodeScanner.isSupported().then(async (result) => {
      const isSupported = result.supported;
      const isCameraAvailable = await this._requestCameraPermission();
      const hasUserGavePermission = await this._requestUserPermissions();
      this.isAvailable = isSupported && isCameraAvailable;

      const isModuleAvailable = await this._requestModule();
      if (!isModuleAvailable) {
        await this._installModule();
        BarcodeScanner.addListener(
          'googleBarcodeScannerModuleInstallProgress',
          (event) => {
            event.progress;
            event.state;
          }
        );
      }
    });
    //-----------------------------------------

  }




  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  //------------------------ CHAT BOT -------------------
  async sendMessage() {

    if (this.messageRef.trim() !== '') {
      this.messages.push({
        content: this.messageRef,
        isUser: true,
      });
      this.messageRef = ''; // Réinitialisez le champ de saisie après l'envoi du message
    
    const response = await this.aiService.postAiMessage(this.messages)

    this.messages.push(
      JSON.parse(response.data)
    )
    console.log(response)
    }
  }
  //------------------------------------------------

  searchProduct(event: any) {
    const barcode = event.detail.value;
    console.log(`Search input changed: ${barcode}`);

    // Navigate to product-detail with the barcode
    this.router.navigate([`product-detail/${barcode}`])
  }

  async scan(): Promise<void> {
    if (this.isAvailable) {
      const { barcodes } = await BarcodeScanner.scan();
      const barcode = barcodes[0].rawValue;
      console.log('Scanned barcode:', barcode);

      // Navigate to product-detail with the barcode
      this.router.navigate([`product-detail/${barcode}`]);
    }
  }

  private async _requestCameraPermission(): Promise<boolean> {
    const { camera } = await BarcodeScanner.checkPermissions();
    return camera === 'granted' || camera === 'limited';
  }

  private async _requestUserPermissions(): Promise<void> {
    const permissions = await BarcodeScanner.requestPermissions();
  }

  private async _requestModule(): Promise<boolean> {
    const { available } = await BarcodeScanner.isGoogleBarcodeScannerModuleAvailable();
    return available;
  }

  private async _installModule(): Promise<void> {
    await BarcodeScanner.installGoogleBarcodeScannerModule();
  }
}


