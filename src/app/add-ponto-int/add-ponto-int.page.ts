import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-ponto-int',
  templateUrl: './add-ponto-int.page.html',
  styleUrls: ['./add-ponto-int.page.scss'],
})
export class AddPontoIntPage implements OnInit {

  selectedFileName: string = "Carregue a sua fotografia";
  iconName : string = "camera";
  iconColor : string = "primary";
  custo: number = 0;

  constructor() { }

  formataNumero(e: any, separador: string = '.', decimais: number = 2) {
    let a:any = e.value.split('');
    let ns:string = '';
    a.forEach((c:any) => { if (!isNaN(c)) ns = ns + c; });
    ns = parseInt(ns).toString();
    if (ns.length < (decimais+1)) { ns = ('0'.repeat(decimais+1) + ns); ns = ns.slice((decimais+1)*-1); }
    let ans = ns.split('');
    let r = '';
    for (let i=0; i < ans.length; i++) if (i == ans.length - decimais) r = r + separador + ans[i]; else r = r + ans[i];
    e.value = r;
  }

  onFileSelected(event : Event): void {
    const input = event.target as HTMLInputElement;
    if(input.files && input.files.length > 0) {
      const file = input.files[0];
      this.carregarFicheiro(file);
    }
  }

  carregarFicheiro(file: File): void {
    setTimeout(() => {
      console.log('Upload feito com sucesso:', file);
      this.iconName = "checkmark-circle";
      this.iconColor = "success";
      this.selectedFileName = 'Fotografia carregada com sucesso!';
    }, 1000); 
  }

  ngOnInit() {
  }

}
