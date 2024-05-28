# **Ionic Storage**

_Última atualização do doc. 04.Mai.2024_

- [Ionic Storage](#ionic-storage)
- [Instalação dos pacotes necessários](#instalação-dos-pacotes-necessários)
- [Configurar a app](#configurar-a-app)
- [Configurar o _service_](#configurar-o-service)
- [Utilizar o _service_](#utilizar-o-service)
- [Consumir o service (na restante app)](#consumir-o-service-na-restante-app)

> _O código deste exemplo é uma adaptação do projeto de exemplo de Services. Foram feitas as adaptações necessárias (descritas abaixo), com o objetivo de conseguir a persitência da informação (no caso, das tarefas)_

# Ionic Storage

- Recurso, da framework Ionic, que permite armazenar e gerir dados armazenados localmente no dispositivo do utilizador;

- O armazenamento da informação tem como base chave/valor (key/value). Isto é, são armazenados objetos JSON (pares chave/valor);

- Os dados são armazenados com base numa chave;

- Os dados são lidos através da chave com a qual foram armazenados;

- Suporta vários tipos de armazenamento: 

    - LocalStorage
    - IndexedDB
    - SQLite

- Os vários tipos de armazenamento dependem da plataforma e do _browser_ onde a aplicação é executada;

- Tipicamente, o Ionic Storage, é utilizado com recurso aos serviços, possibilitando a injeção de dependência (abordado na matéria dos Services). Esta abordagem facilita gerir o armazenamento e leitura de dados de uma aplicação;

- O Ionic Storage faz a seleção de qual a _storage engine_ está disponível e seleciona a solução melhor possível, de forma autónoma.

> Note-se que o armazanamento local pode ser eliminado pelo sistema operativo de um dispositivo móvel.


# Instalação dos pacotes necessários

```bash
npm i @ionic/storage-angular
npm i cordova-sqlite-storage
npm i localforage-cordovasqlitedriver
```

1. O primeiro pacote diz respeito ao pacote do Ionic Storage;

2. Os restantes pacotes poderão ser necessários e utilizados quando a aplicação for executada num dispositivo físico;


# Configurar a app

1. Para o _storage_ ser utilizado, é necessária a importação do mesmo em `src\app\app.module.ts`.

    ```javascript
    import { IonicStorageModule } from '@ionic/storage-angular';
    import { Drivers } from '@ionic/storage';
    import * as CordovaSQLiteDriver from 'localforage-cordovasqlitedriver';
    ```

    O `app.module.ts` é o ponto de entrada e de configuração principal de uma aplicação Angular/Ionic. Organiza e faz a gestão de todos os recursos necessários para o correto funcionamento da aplicação.

1. Em `@NgModule`, é necessário adicionar o seguinte ao array `imports`:  
    > @NgModule é um decorador em Angular que é usado para definir um módulo de uma aplicação.

    ```javascript
    IonicStorageModule.forRoot({
        driverOrder: [
            CordovaSQLiteDriver._driver,
            Drivers.IndexedDB,
            Drivers.LocalStorage
        ],
        name: '_tarefas'
    }),
    ```

    O array `imports` ficará similar ao seguinte código:

    ```javascript
    imports: [
        BrowserModule,
        IonicModule.forRoot(),
        AppRoutingModule,
        IonicStorageModule.forRoot({
            driverOrder: [
                CordovaSQLiteDriver._driver,
                Drivers.IndexedDB,
                Drivers.LocalStorage
            ],
            name: '_tarefas'
        }),
    ],
    ```

Após a configurações/definições acima é possível a utilização do _Storage_, para o efeito é necessária a correta inicialização do mesmo antes de efetuar qualquer operação.

# Configurar o _service_

1. Fazer os _imports_ necessários em `\src\app\services\tarefas.service.ts`

    ```javascript
    import { Storage } from '@ionic/storage-angular';
    import * as CordovaSQLiteDriver from 'localforage-cordovasqlitedriver';
    ```

2. O código do _Service_ poderá, por exemplo, ser codificado da seguinte forma:

    ```javascript
    import { Injectable } from '@angular/core';
    import { Storage } from '@ionic/storage-angular';
    import * as CordovaSQLiteDriver from 'localforage-cordovasqlitedriver';

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

        constructor(private storage: Storage) {
            this.tarefas = [];
            this.init();
        }

        async init() {
            await this.storage.defineDriver(CordovaSQLiteDriver);
            const storage = await this.storage.create();
            const tarefas = await storage.get('tarefas');
            if (tarefas) {
                this.tarefas = tarefas;
            }
        }

        getTarefas(): Tarefa[] {
            return this.tarefas
        }

        async insertTarefa(tarefa: Tarefa) {
            if (!tarefa.id) {
                tarefa.id = Date.now();
            }
            this.tarefas.push(tarefa);
            await this.storage.set('tarefas', this.tarefas);
        }

        async updateTarefa(tarefa: Tarefa) {
            const index = this.tarefas.findIndex(t => t.id === tarefa.id);
            if (index >= 0) {
                this.tarefas[index] = tarefa;
                await this.storage.set('tarefas', this.tarefas);
            }
        }

        async deleteTarefa(id: number) {
            const index = this.tarefas.findIndex(t => t.id === id);
            if (index >= 0) {
                this.tarefas.splice(index, 1);
                await this.storage.set('tarefas', this.tarefas);
            }
        }

        getTarefasConcluidas() {
            const tarefasConcluidas = this.tarefas.filter(tarefa => tarefa.completed);
            return tarefasConcluidas;
        }
    }
    ```

    No método `init`, é criada uma instância do _Storage_ e recuperadas as tarefas armazenadas no dispositivo. No caso de haver tarefas armazenadas, estas são carregadas para o array `tarefas` do serviço.

# Utilizar o _service_

1. O ficheiro `\src\app\home\home.page.ts` deverá ficar semelhante ao código apresentado de seguida:

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

        async ngOnInit() {
            await this.tarefaService.init();
            this.tarefas = this.tarefaService.getTarefas();
        }

        async insertTarefa() {
            if (this.novaTarefa) {
                const tarefa: Tarefa = {
                    id: Date.now(),
                    title: this.novaTarefa,
                    completed: false,
                };
                await this.tarefaService.insertTarefa(tarefa);
                this.novaTarefa = '';
            }
        }

        async updateTarefa(tarefa: Tarefa) {
            await this.tarefaService.updateTarefa(tarefa);
        }

        async deleteTarefa(tarefa: Tarefa) {
            await this.tarefaService.deleteTarefa(tarefa.id);
        }

    }
    ```

    > A utilização do `async/await` é necessário para esperar pela conclusão das operações no Ionic Storage. O Storage é uma ferramenta assíncrona, ou seja, a operação de armazenamento pode não estar concluída imediatamente.

1. O ficheiro `\src\app\home\home.page.html` poderá, por exemplo, ficar o mesmo que é utilizado no projeto de exemplo de _Services_.

# Consumir o service (na restante app)

1. O ficheiro `\src\app\outra\outra.page.ts` poderá, por exemplo, ficar o mesmo que é utilizado no projeto de exemplo de _Services_.

1. O ficheiro `\src\app\outra\outra.page.html` poderá, por exemplo, ficar o mesmo que é utilizado no projeto de exemplo de _Services_.
    
---
_José Viana | josev@estg.ipvc.pt_