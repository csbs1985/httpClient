import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'httpClient';
  resultados = '';

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    // HttpClient: recupera dados da API via
    // UserResponde: a interface tipa a resposta
    this.http.get<UserResponse>('https://api.github.com/users/seeschweiler').subscribe(
      data => {
        console.log('login: ', data.login);
      },
      // verifica possiveis erros
      (erro: HttpErrorResponse) => {
        if (erro.error instanceof Error) { 
          console.log("Erro no client");
        } else {
          console.log("Erro no servidor")
        }
      }
    )

    // inclui dados na API
    const req = this.http.post('http://jsonplaceholder.typicode.com/posts', {
      title: 'Charles',
      body: 'Santos',
      userId: 1
    }).subscribe(
      res => { console.log(res); },
      err => { console.log("Erro desconhecido"); }
    );
  }
}

interface UserResponse {
  login: string;
  bio: string;
  company: string;
}