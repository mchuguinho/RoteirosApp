# **Service**

_Última atualização do doc. 30.Abr.2024_

- [Service](#service)
- [Criar um service](#criar-um-service)
- [Consumir um service](#consumir-um-service)
- [Consumir um service (na restante app)](#consumir-um-service-na-restante-app)

# Service

- Classe que pode ser injetada noutras classes/componentes (injeção de dependência);
- Permite o desenvolvimento de funcionalidades específicas e reutilizáveis em toda a aplicação;
- Separam a lógica de negócio da lógica de apresentação (_interface_ do utilizador) e consequentemente tornam o código mais organizado e de fácil manutenção;

## Exemplos de utilização
- Operar sobre dados (manipulação de uma base de dados);
- Efetuar cálculos;
- Consumir APIs externas.


# Criar um service
 
> Para este exemplo será criado um Service para a gestão de tarefas (uma _to-do list_)

1. O serviço deve ser gerado numa app existente ou criar uma app para o efeito, por exemplo:

    ```bash
    ionic start exemploservice blank --type=angular
    ```

1. Gerar o serviço

    Executar, dentro da pasta do projeto, o seguinte comando:

    ```bash
    ionic g service services/tarefas
    ```

    O comando acima gera um _Service_ dentro da pasta `services` com o nome `tarefas`. Se a pasta `services` não existir é criada. Esta definição da pasta é opcional, porém, por uma questão de organização, deve ser especificada uma pasta (esta ou outra qualquer).

1. No ficheiro `src\app\services\tarefas.service.ts` colocar o seguinte código:

    ```javascript
    import { Injectable } from '@angular/core';

    export interface Tarefa {
        id: number;
        title: string;
        completed: boolean;
    }

    @Injectable({
        providedIn: 'root'
    })

    export class TarefasService {
        private tarefas: Tarefa[];

        constructor() {
            this.tarefas = [];
        }

        getTarefas(): Tarefa[] {
            return this.tarefas;
        }

        insertTarefa(tarefa: Tarefa) {
            this.tarefas.push(tarefa);
        }

        updateTarefa(tarefa: Tarefa) {
            const index = this.tarefas.findIndex(t => t.id === tarefa.id);
            if (index >= 0) {
                this.tarefas[index] = tarefa;
            }
        }

        deleteTarefa(id: number) {
            const index = this.tarefas.findIndex(t => t.id === id);
            if (index >= 0) {
                this.tarefas.splice(index, 1);
            }
        }

        getTarefasConcluidas() {
            const tarefasConcluidas = this.tarefas.filter(tarefa => tarefa.completed);
            return tarefasConcluidas;
        }

    }
    ```

    - O serviço, definido acima, contém um array de tarefas, que pode ser inicializado com alguns valores de exemplo. O serviço tem quatro métodos para a gestão das tarefas que permitem obter todas as tarefas, adicionar uma nova tarefa, atualizar uma tarefa existente e remover uma tarefa existente. Deve ser complementado com os métodos que forem necessários (no caso tem um método que devolve apenas as tarefas concluídas).

    - A linha de código `import { Injectable } from '@angular/core'` é usada para importar o decorador `Injectable` do módulo `@angular/core` do Angular. O `Injectable` é um decorador que indica que **a classe pode ser injetada com dependências, tornando-a um serviço**. Isso permite que outras classes ou componentes da aplicação possam utilizar as funcionalidades oferecidas por este serviço.

    - Ao marcar a classe `TarefasService` com o decorador` @Injectable({ providedIn: 'root' })`, estamos a registar o serviço no fornecedor de injeção de dependência do Angular (_Angular Dependency Injection Provider_). Isso significa que o Angular criará uma única instância do serviço para toda a aplicação e injetará essa instância em qualquer componente ou outro serviço que solicite o serviço `TarefasService`.

    **Outros apontamentos sobre o código**:
    - `export interface Tarefa`  
    Definição da interface Tarefa (objeto Tarefa). A Tarefa tem 3 propriedades (id, title e completed) com os tipos de dados especificados. Na prática está a ser criado um novo tipo de dados "Tarefa".

    - `filter`  
    Retorna um novo array contendo apenas as `tarefas` com o campo _completed_ igual a `true`. Genericamente, o método cria um novo array com todos os elementos do array original que respeitam determinada condição - função especificada.

    - `push()`  
    Adiciona uma `tarefa` ao final do array `tarefas`. Genericamente adicionar um ou mais elementos ao final de um array.

    - `findIndex()`  
    Retorna o índice do primeiro elemento do array que satisfaz uma função de teste (callback). Se nenhum elemento passar no "teste", o método retorna -1.

    - `splice()`  
    Considerando a tarefa que está em determinado índice (index), remove _n_ tarefas a partir desse índice (no caso 1 - uma tarefa). Genericamente, adiciona ou remove elementos de um array. Altera o array original e retorna os elementos removidos, se houver algum.


# Consumir um service

1. O ficheiro `\src\app\home\home.page.ts` deverá ficar semelhante ao código apresentado de seguida (de notar a injeção do Serviço):

    ```javascript
    import { Component } from '@angular/core';
    import { TarefasService, Tarefa } from '../services/tarefas.service';

    @Component({
        selector: 'app-home',
        templateUrl: 'home.page.html',
        styleUrls: ['home.page.scss'],
    })

    export class HomePage {

        public tarefas: Tarefa[] = [];
        public novaTarefa: string = '';

        constructor(private tarefaService: TarefasService) {}

        ngOnInit() {
            this.tarefas = this.tarefaService.getTarefas();
        }

        insertTarefa() {
            if (this.novaTarefa) {
                const tarefa: Tarefa = {
                    id: Date.now(),
                    title: this.novaTarefa,
                    completed: false,
                };
                this.tarefaService.insertTarefa(tarefa);
                this.novaTarefa = '';
            }
        }

        updateTarefa(tarefa: Tarefa) {
            this.tarefaService.updateTarefa(tarefa);
        }

        deleteTarefa(tarefa: Tarefa) {
            this.tarefaService.deleteTarefa(tarefa.id);
        }


    }
    ```

1. O ficheiro `\src\app\home\home.page.html` poderá, por exemplo, ficar semelhante ao código apresentado de seguida:

    ```html
    <ion-header [translucent]="true">
        <ion-toolbar>
            <ion-title>
            As minhas tarefas de IHM
            </ion-title>
        </ion-toolbar>
    </ion-header>

    <ion-content [fullscreen]="true">
        <ion-header collapse="condense">
            <ion-toolbar>
                <ion-title size="large">As minhas tarefas de IHM</ion-title>
            </ion-toolbar>
        </ion-header>
        
        <ion-list>

            <ion-item lines="full" *ngFor="let tarefa of tarefas">
                <ion-checkbox justify="start" labelPlacement="end" [(ngModel)]="tarefa.completed" (ionChange)="updateTarefa(tarefa)">{{ tarefa.title }}</ion-checkbox>
                <ion-button (click)="deleteTarefa(tarefa)" slot="end" fill="clear" size="small" color="danger">
                    <ion-icon slot="icon-only" name="trash"></ion-icon>
                </ion-button>
            </ion-item>
        </ion-list>

        <ion-item lines="full">
            <ion-input placeholder="Nova Tarefa" [(ngModel)]="novaTarefa"></ion-input>
            <ion-button (click)="insertTarefa()" slot="end" fill="clear" size="small">
                <ion-icon slot="icon-only" name="add"></ion-icon>
            </ion-button>
        </ion-item>

        <ion-button class="ion-margin big-button" expand="block" fill="outline" color="primary" size="small" routerLink="/outra">
            <ion-icon slot="start" name="checkbox"></ion-icon>
            Ver tarefas concluídas
        </ion-button>
    </ion-content>
    ```

    **Outros apontamentos sobre o código**:
    - `[(ngModel)]`  
    É uma diretiva do Angular que permite criar uma ligação bidirecional (_two-way binding_) entre uma propriedade de um elemento HTML e uma propriedade da classe do componente. Possibilita que os dados inseridos num formulário sejam automaticamente atualizados na classe do componente e vice-versa.  
    Por outras palavras, estabelece uma comunicação bidirecional entre a view (template HTML) e a classe do componente. O uso do `[()]` é equivalente a utilizar o `[ngModel]` para fazer a ligação de dados a partir do componente para a view e o `(ngModelChange)` para fazer a ligação da view para o componente.

# Consumir um service (na restante app)

Uma das principais vantagens da utilização de _Services_ reside no facto de poder ser injetado em vários componentes e páginas diferentes, permitindo que esses componentes **partilhem funcionalidades e dados comuns**. Esta particularidade torna o código mais modular e reutilizável, além de ajudar a evitar a duplicação de código e a garantir a consistência dos dados em toda a aplicação.

1. O ficheiro `\src\app\outra\outra.page.ts` deverá ficar semelhante ao código apresentado de seguida (de notar a injeção do Serviço):

    ```javascript
    import { Component, OnInit } from '@angular/core';
    import { Tarefa, TarefasService } from '../services/tarefas.service';

    @Component({
        selector: 'app-outra',
        templateUrl: './outra.page.html',
        styleUrls: ['./outra.page.scss'],
    })

    export class OutraPage implements OnInit {
        tarefas: Tarefa[];

        constructor(private tarefasService: TarefasService) {
            this.tarefas = [];
        }

        ngOnInit() {
            this.tarefas = this.tarefasService.getTarefasConcluidas();
        }
    }
    ```

1. O ficheiro `\src\app\outra\outra.page.html` poderá, por exemplo, ficar semelhante ao código apresentado de seguida:

    ```html
    <ion-header>
        <ion-toolbar>
            <ion-buttons slot="start">
                <ion-back-button></ion-back-button>
            </ion-buttons>
            <ion-title>IHM: Tarefas concluídas</ion-title>
        </ion-toolbar>
    </ion-header>

    <ion-content>
        <ion-list>
            <ion-item lines="full">
                <ion-label>Tarefas concluídas: </ion-label>
                <ion-badge color="success">{{ tarefas.length }}</ion-badge>
            </ion-item>
        </ion-list>

        <ion-list *ngIf="tarefas.length > 0; else listaVazia" class="ion-no-padding">
            <ion-item lines="full" *ngFor="let tarefa of tarefas">
                <ion-label>
                    {{ tarefa.title }}
                </ion-label>
            </ion-item>
        </ion-list>

        <ng-template #listaVazia>
            <div class="ion-text-center ion-margin"><ion-text color="medium">Lista vazia</ion-text></div>
        </ng-template>
    
    </ion-content>
    ```

---
_José Viana | josev@estg.ipvc.pt_