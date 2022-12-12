import { Component } from '@angular/core';
import { Message } from 'primeng/components/common/api';
import { ContaService } from './conta.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  private dados: any = {}
  private mensagens: Message[] = [];

  constructor(private servico: ContaService) {
    this.limpar()
  }
  
  getConta1() {
    this.mensagens = []
    this.servico.getConta(this.dados.conta1).subscribe(response => {
      if (response.correntista) {
        this.dados.desc1 = response.correntista + " R$ " + response.saldo
      } else {
        this.limparDados1()
      }
    }, erros =>{
      this.limparDados1()
      this.mensagens.push({severity: 'error', summary: erros})
    })
  }

  getConta2() {
    this.mensagens = []
    this.servico.getConta(this.dados.conta2).subscribe(response => {
      if (response.correntista) {
        this.dados.desc2 = response.correntista + " R$ " + response.saldo
      } else {
        this.limparDados2()
      }
    }, erros =>{
      this.limparDados2()
      this.mensagens.push({severity: 'error', summary: erros})
    })
  }

  transferir() {
    this.mensagens = []
    this.servico.transferir(this.dados.conta1, this.dados.conta2, this.dados.valor).subscribe(response => {
      this.limpar()
      this.mensagens.push({severity: 'success', summary: "Transferência feita com sucesso!"})
    }, erros =>{
      this.mensagens.push({severity: 'error', summary: erros})
    })
  }

  // operações privadas

  private limpar() {
    this.dados = {'conta1': '', 'conta2': '', 'valor':'', "desc1":'', "desc2":''}
  }

  private limparDados1() {
    this.dados.conta1 = ''
    this.dados.desc1 = ''
  }

  private limparDados2() {
    this.dados.conta2 = ''
    this.dados.desc2 = ''
  }
}