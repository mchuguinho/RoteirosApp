# **Dados JSON**

_Última atualização do doc. 04.Mai.2024_

- [Enquadramento](#enquadramento)
- [Carregamento de informação](#carregamento-de-informação)
    - [Ficheiro JSON local](#ficheiro-json-local)
    - [Ficheiro JSON remoto](#ficheiro-json-remoto)
- [Apontamentos teóricos](#apontamentos-teóricos)

Outra matéria abordada no exemplo/aula:

- Avatars - ion-avatar: 
  https://ionicframework.com/docs/api/avatar
- Alinhamentos de texto (CSS Utilities): https://ionicframework.com/docs/layout/css-utilities
- Grid: https://ionicframework.com/docs/api/grid
- ngOnInit
- Fetch API

# Enquadramento

- Projeto desenvolvido com o template "tabs"  
`ionic start <nomeDaApp> tabs --type=angular`  
(`ionic start exemplojson tabs --type=angular`, por exemplo)

- Deverá ser observada a estrutura da app na pasta `src/app`, onde existem quatro pastas:  
  - `tab1` (para a página visualizada no _tab1_)  
  - `tab2` (para a página visualizada no _tab2_)  
  - `tab3` (para a página visualizada no _tab3_)  
  - `tabs` (para controlo da estrutura de tabs criada)  

- O _tab1_ poderá ter um qualquer conteúdo (o nome da app, por exemplo).

- O _tab2_ servirá para a demonstração de um pedido a um ficheiro .json localmente armazenado na app.

- O _tab3_ servirá para a demonstração de um pedido a uma API externa (que devolve uma resposta em JSON).


# Carregamento de informação
## Ficheiro JSON local

1. Na pasta `src/assets` criar a pasta `data` (_data_ = dados/informação) - poderia ser outro nome qualquer

2. Na pasta criada anteriormente criar o ficheiro com os dados em formato JSON (ver exemplo JSON abaixo em [Apontamentos teóricos](#apontamentos-teóricos)).
O ficheiro deverá ter a extensão ".json". Poderá ser, por exemplo, `movies.json` (com informação de filmes).

3. Em `tab2.page.ts`:

  - Importar o interface `OnInit` do Angular:  
    ```javascript
    import { Component, OnInit } from '@angular/core';
    ```
  
  - Indicar que a class "Tab2Page" implementa o interface anteriormente importado:   

    ```javascript
    export class Tab2Page implements OnInit {
    ```

  - Definir o _interface_ para os filmes. Esta definição deve estar após o(s) import(s) e antes do _decorator_ `@Component`. Ver exemplo abaixo:

    ```javascript
    import { Component, OnInit } from '@angular/core';

    interface Movies {
      [key: string]: {
        id: string;
        title: string;
        imdb_rating: string;
        release_year: string;
        img: string;
      };
    };

    @Component({
      selector: 'app-tab2',
      templateUrl: 'tab2.page.html',
      styleUrls: ['tab2.page.scss']
    })
    ```

    Neste caso, a `interface` definida fornece um modelo para o objeto dos filmes (armazenado no JSON), definindo os requisitos a cumprir.  
    Os `[]` em `[key: string]` são usados para definir um índice ou chave de um objeto.

  - Definir a propriedade que, posteriormente, armazenará a informação proveniente do JSON (imediatamente antes do _constructor_):

    ```javascript
    public dataMovies: Movies;
    ```

  - Inicializar no `constructor` a propriedade `dataMovies`
   
    ```javascript
    constructor() {
      this.dataMovies = {}
    }
    ```

  - Desenvolver o método ngOnInit
    ```javascript
    ngOnInit() {
      fetch('./assets/data/movies.json')
        .then(res => res.json())
        .then(json => {
          this.dataMovies = json;
        });
    }
    ```

    Por definição, o método `ngOnInit` é invocado depois do construtor.
    Neste caso efetua o carregamento de um ficheiro .json local.

    A função `fetch` do Javascript é utilizada, neste caso, para ir buscar os dados ao ficheiro JSON local.

4. Em `tab2.page.html`, dentro de `<ion-content></ion-content>`, construir a grid, com recurso ao *ngFor para iterar sobre os dados:

  - Apagar o elemento `app-explore-container`

  - No local onde foi apagado o elemento anterior, colocar o seguinte código código, por exemplo:

    ```HTML
    <ion-grid>
      <ion-row *ngFor="let movie of dataMovies | keyvalue" class="ion-margin">
        <ion-col size="10"><ion-text color="primary">{{ movie.value.release_year }}</ion-text></ion-col>
        <ion-col size="2"><ion-text color="medium" class="ion-float-right"><small>{{ movie.value.imdb_rating }}</small></ion-text></ion-col>
        <ion-col size="12"> {{ movie.value.title }}</ion-col>
      </ion-row>
    </ion-grid>
    ```

## Ficheiro JSON remoto
### **consumo de uma API**

1. Em `app.module.ts`:

  - Importar o HttpClientModule para o ficheiro "app.module.ts" (em src/app):
    ```javascript
    import { HttpClientModule } from '@angular/common/http';
    ```

  - Introduzir nova entrada `HttpClientModule` no array `imports` dentro do decorator `@NgModule`. O referido array ficará semelhante ao seguinte:
    ```javascript
    imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule],
    ```

2. Em `tab3.page.ts`:

  - Importar o interface `OnInit` do Angular:  
    ```javascript
    import { Component, OnInit } from '@angular/core';
    ```
  
  - Indicar que a class "Tab3Page" implementa o interface anteriormente importado:   

    ```javascript
    export class Tab3Page implements OnInit {
    ```

  - Definir o _interface_ para os realizadores. Esta definição deve estar após o(s) import(s) e antes do _decorator_ `@Component`. Ver exemplo abaixo:

    ```javascript
    import { Component, OnInit } from '@angular/core';

    interface Realizador {
      name: {
        first: string;
        last: string;
      };
      location: {
        country: string;
      };
      email: string;
      picture: {
        medium: string;
      };
    }

    @Component({
      selector: 'app-tab3',
      templateUrl: 'tab3.page.html',
      styleUrls: ['tab3.page.scss']
    })
    ```

    > NOTA: neste caso particular a resposta da API devolve mais propriedades do que as definidas no `interface`. Quando isso acontece, o TypeScript não gera erros, desde que as propriedades definidas no `interface` estejam presentes na resposta da API.

  - Importar a classe HttpClient:

    ```javascript
    import { HttpClient } from '@angular/common/http';
    ``` 

  - Criar uma referência ao objeto recorrendo ao construtor

    ```javascript
    constructor (public http: HttpClient) {}
    ```

  > `HttpClient` disponibiliza as funções `get()` e `post()` para efetuar pedidos _get_ (pedido de informação) e _post_ (envio de informação).

  - Definir a propriedade que, posteriormente, armazenará a informação proveniente da API:
    ```javascript
    public realizadores: Realizador[];
    ```

  - Inicializar no `constructor` a propriedade `realizadores`
   
    ```javascript
    constructor(public http: HttpClient) {
      this.realizadores = [];
    }
    ```

  - Desenvolver o método ngOnInit que efetua o "HTTP get request" (pedido HTTP através do método get)
    ```javascript
    ngOnInit(): void {
      this.http.get<any>('https://randomuser.me/api/?results=30').subscribe(data => {
          this.realizadores = data.results;
      })
    }
    ```

    No código acima pode ser invocado qualquer URL que devolva dados JSON, tendo em atenção que na linha `this.realizadores=data['results'];` o índice `results` diz respeito à estrutura do JSON devolvido, isto é, terá sempre de ser analisada e considerada a estrutura JSON devolvida.

    No caso de haver a necessidade da passagem de parametros o código acima, por exemplo, seria alterado para o seguinte:
    ```javascript
    this.http.get<any>('https://randomuser.me/api/?results=30', { params: { exemplo1: 'id1234', exemplo2: '9' } }).subscribe(data => {
        this.realizadores=data["results"];
    })
    ```

    No caso em concreto podemos alterar para:
    ```javascript
    this.http.get<any>('https://randomuser.me/api/', { params: { results: '30' } }).subscribe(data => {
        this.realizadores = data["results"];
    })
    ```


3. Em `tab3.page.html`:

Após o passo 2, no HTML do _tab3_, teremos disponível/acessível a propriedade `realizadores`. O seguinte código é um exemplo de como percorrer essa informação, mostrando-a organizada numa lista:

```HTML
<ion-list>
  <ion-list-header color="tertiary">
    <ion-label>Realizadores</ion-label>
  </ion-list-header>
  <ion-item *ngFor="let realizador of realizadores">
    <ion-avatar class="ion-margin">
      <img [src]="realizador.picture.large">
    </ion-avatar>
    <ion-label>
      <h3>{{realizador.name.first}} {{realizador.name.last}}</h3>
      <p>{{realizador.email}}</p>
      <p>{{realizador.location.country}}</p>
    </ion-label>
  </ion-item>
</ion-list>
```



# Apontamentos teóricos

## Fetch API

A Fetch API é um recurso nativo (built-in feature), no Javascript. Torna o trabalho com pedidos e respostas (requests and responses) mais simples.

O fetch() permite fazer pedidos de rede (network requests) similar ao XMLHttpRequest (XHR). A diferença principal é que a Fetch API utiliza _Promises_, que permite uma API mais simples e mais limpa, evitando alguns problemas de retorno de dados como acontece com o XMLHttpRequest, que poderão ser complexos de resolver.

## Exemplo do conteúdo de um ficheiro JSON com filmes:

```javascript
{
  "jumanji": {
    "id": "1",
    "title": "Jumanji",
    "imdb_rating": "7.0",
    "release_year": "1995",
    "img": "jumanji.jpg"
  },
  "jumanjiw": {
    "id": "2",
    "title": "Jumanji: Welcome to the Jungle",
    "imdb_rating": "6.9",
    "release_year": "2017",
    "img": "jumanjiw.jpg"
  },
  "themazerunner": {
    "id": "3",
    "title": "The Maze Runner",
    "imdb_rating": "6.8",
    "release_year": "2014",
    "img": "themazerunner.jpg"
  },
  "themartian": {
    "id": "4",
    "title": "The Martian",
    "imdb_rating": "8.0",
    "release_year": "2015",
    "img": "themartian.jpg"
  },
  "coco": {
    "id": "5",
    "title": "Coco",
    "imdb_rating": "8.4",
    "release_year": "2017",
    "img": "coco.jpg"
  },
  "knowing": {
    "id": "6",
    "title": "Knowing",
    "imdb_rating": "6.2",
    "release_year": "2009",
    "img": "knowing.jpg"
  },
  "thevillage": {
    "id": "7",
    "title": "The Village",
    "imdb_rating": "6.5",
    "release_year": "2004",
    "img": "thevillage.jpg"
  },
  "alien": {
    "id": "8",
    "title": "Alien",
    "imdb_rating": "8.4",
    "release_year": "1979",
    "img": "alien.jpg"
  }
}
```

---
_José Viana | josev@estg.ipvc.pt_
