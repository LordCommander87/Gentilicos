import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';

import { Questoes } from '../../costas/questoes';
import { HomePage } from '../home/home';

@Component({
  selector: 'page-room',
  templateUrl: 'room.html',
})

export class Room {

  private questoes  : Questoes;
  private nome      : string;
  private pontos    : number;
  private pergunta  : String;
  private resCerta  : String;
  private itens     : Array<String>;
  private respostas : Array<String> = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController) {
    this.nome = navParams.get('nome').nome;
    console.log(this.nome);
    this.questoes = new Questoes();
    this.proximaPergunta();
    this.pontos = 0;
  }

  randomizarRespostas() : void {
    for (let i = this.respostas.length; i; i--) {
        let j = Math.floor(Math.random() * i);
        [this.respostas[i - 1], this.respostas[j]] = [this.respostas[j], this.respostas[i - 1]];
    }
  }

  verificarResposta(resposta) : void {
    if(resposta == this.resCerta) {
      this.pontos = this.pontos + 10;
      this.proximaPergunta();
    }else{
      this.gameover();
    }
  }

  proximaPergunta() : void {
    if(this.questoes.getFim()){
      this.gameover();
    }else{
      this.itens     = [];
      this.respostas = [];
      this.itens     = this.questoes.retornaQuestao();
      this.pergunta  = this.itens[0];
      this.resCerta  = this.itens[1];
      this.respostas.push(this.itens[1]);
      this.respostas.push(this.itens[2]);
      this.respostas.push(this.itens[3]);
      this.respostas.push(this.itens[4]);
      this.randomizarRespostas();
    }
  }

  gameover() : void {
    let alert = this.alertCtrl.create({
    title: 'Fim de Jogo',
    message: this.nome + ' você obteve ' + this.pontos + ' pontos!',
    buttons: [
      {
        text: 'OK',
        handler: () => {
          console.log('Voltando ao menu');
          //this.navCtrl.setRoot(HomePage);
        }
      }
    ]
    });
    alert.present();
    //this.atualizarBanco();
    alert.onDidDismiss(() => {
      this.navCtrl.setRoot(HomePage);
    });
      
  }

}
