# **Capacitor - Screen Orientation**

_Última atualização do doc. 11.Mai.2024_         

- [_Screen Orientation_ com o Capacitor](#screen-orientation-com-o-capacitor)
- [Exemplo para fazer o _lock_ no modo paisagem](#exemplo-para-fazer-o-lock-no-modo-paisagem)
- [Testar em dispositivo físico](#testar-em-dispositivo-físico)
- [Lifecycle Events](#lifecycle-events) 
- [OrientationLockOptions](#orientationlockoptions) 
- [Resolução de problemas](#resolução-de-problemas) 

## Histórico de versões do Capacitor
- Capacitor 6 » 15.Abril.2024 » [Announcing Capacitor 6.0](https://ionic.io/blog/announcing-capacitor-6-0)
- Capacitor 5 » 03.Maio.2023 » [Announcing Capacitor 5.0](https://ionic.io/blog/announcing-capacitor-5)
- Capacitor 4 » 29.Julho.2022 » [Announcing Capacitor 4.0](https://ionic.io/blog/announcing-capacitor-4-0)
- Capacitor 3 » 19.Maio.2021 » [Announcing Capacitor 3.0](https://ionic.io/blog/announcing-capacitor-3-0)
- Capacitor 2 » 08.Abril.2020 » [Announcing Capacitor 2.0](https://ionic.io/blog/announcing-capacitor-2-0)
- Capacitor 1 » 22.Maio.2019 » [Announcing Capacitor 1.0](https://ionic.io/blog/announcing-capacitor-1-0)

# _Screen Orientation_ com o Capacitor

Este plugin permite fazer o lock/unlock da orientação do ecrã.
O sensor envolvido nesta função é o **acelerómetro**.

## Native APIs:
https://ionicframework.com/docs/native

As Native APIs adicionam funcionalidades nativas dos dispositivos a qualquer app Ionic com o Capacitor.

## Capacitor plugins
https://capacitorjs.com/docs/plugins

## Orientação do ecrã numa App com o Capacitor:
https://capacitorjs.com/docs/apis/screen-orientation

No caso de uma app de Ionic, criada sem o Capacitor, é possível, posteriormente, adicionar o capacitor através do comando (não aplicável na atual versão do Ionic):  
```
ionic integrations enable capacitor
```

## Instalação do plugin

1. `npm install @capacitor/screen-orientation`  
**Executar o ponto 2. apenas no caso de já estar adicionada, ao projeto, um projeto nativo (iOS ou Android)**. 
2. `ionic cap sync`  
 
**NOTAS:**  

- Para adicionar um plugin:  
`npm i nome_do_plugin`
- Para remover um plugin  
`npm uninstall nome_do_plugin`:

# Exemplo para fazer o _lock_ no modo paisagem

1. Em `home.page.ts`, ou em qualquer outro(s) componente(s) da app, importar os packages `ScreenOrientation` e as `OrientationLockOptions`

    ```js
    import { ScreenOrientation, OrientationLockOptions } from '@capacitor/screen-orientation';
    ```

2. Utilizar o _lifecycle event_ adequado para que o _lock_ ocorra no momento certo. No caso, antes antes da página ser exibida (ver notas teóricas abaixo).

    ```js
    import { ViewWillEnter } from '@ionic/angular';

    (...)

    export class HomePage implements ViewWillEnter { 
    ```

3. Desenvolver o método `ionViewWillEnter()`

    ```js
    ionViewWillEnter(): void {
        const options: OrientationLockOptions = { orientation: 'landscape' };
        ScreenOrientation.lock(options);
    }
    ```


# Testar em dispositivo físico

1. Definição do Package ID (opcional, mas **recomendado**):  
    
    Configurar o `capacitor.config.ts` que ficará, por exemplo, como abaixo:

    ```js
    import type { CapacitorConfig } from '@capacitor/cli';

    const config: CapacitorConfig = {
        appId: 'pt.jviana.exemplolandscape',
        appName: 'Teste Screen Orientation',
        webDir: 'www'
    };

    export default config;
    ```

2. Preparar a app para qualquer plataforma de destino (Build web assets):  
    `ionic build`

    _(cria a pasta `www`)_

3. Adicionar uma plataforma nativa ao projeto Ionic:  
    `ionic cap add android`

    _(cria a pasta `android`)_

4. Executar a app num dispositivo físico ou num emulador:  
    `ionic cap run android`

    _Imediatamente antes do processo terminar poderá ser necessária a "autorização", no dispositivo, para que a app seja instalada. Caso contrário é gerado um erro._

Mais informação sobre "Using Capacitor with Ionic":  
https://capacitorjs.com/docs/getting-started/with-ionic


# Lifecycle Events

**ionViewWillEnter**  
É um evento do ciclo de vida dos componentes do Ionic. É executado antes do componente entrar na visualização ativa (ou seja, antes da página ser exibida). Este evento é acionado sempre que o utilizador entra numa página. É feito o recurso a este evento sempre que há a necessidade de execução de operações sempre que a página é visitada, como por exemplo a atualização de dados a exibir ou a recuperação de dados armazenados.

**ionViewDidEnter**  
É um evento do ciclo de vida dos componentes do Ionic. É acionado quando a página é totalmente visualizada e é adicionada à pilha de navegação, isto é, quando a página se torna a página ativa. É feito o recurso a este evento sempre que há a necessidade de execução de código quando a página está completamente carregada e exibida, como por exemplo iniciar animações ou dar início ao carregamento de informações provenientes de uma API.

> Mais informação: [Ionic Page Life Cycle](https://ionicframework.com/docs/angular/lifecycle)


# OrientationLockOptions

### portrait

- portrait: orientação do dispositivo no modo retrato (vertical).

- portrait-primary: orientação do dispositivo no modo retrato (vertical), dependendo da orientação primária do dispositivo.

- portrait-secondary: orientação do dispositivo no modo retrato (vertical), quando girado 180 graus. É a orientação secundária do modo retrato.

### landscape

- landscape: orientação do dispositivo no modo paisagem (horizontal).

- landscape-primary: orientação do dispositivo no modo paisagem (horizontal), dependendo da orientação primária do dispositivo.

- landscape-secondary: orientação do dispositivo no modo paisagen (horizontal), quando girado 180 graus. É a orientação secundária do modo paisagem.


# Resolução de problemas

## 1. JAVA_HOME
No caso de ao executar o comando `ionic cap run android` surgir o seguinte erro:

>  ERROR: JAVA_HOME is not set and no 'java' command could be found in your PATH.  
Please set the JAVA_HOME variable in your environment to match the
location of your Java installation.

Devem de ser seguidos os passos abaixo:

1. Verificar se o JDK está instalado no computador, através do comando abaixo: 

    ```
    java -version
    ```

    No caso de estar instalado aparecerá a seguinte mensagem (exemplo) - Neste caso, não será necessário fazer os pontos **2.** e **3.**:

    ```
    java version "20.0.1" 2023-04-18
    Java(TM) SE Runtime Environment (build 20.0.1+9-29)
    Java HotSpot(TM) 64-Bit Server VM (build 20.0.1+9-29, mixed mode, sharing)
    ```

2. No caso de o JDK não estar instalado, deve ser feito o download do mesmo em: https://www.oracle.com/java/technologies/javase-downloads.html

3. Instalar o JDK

4. Definir a variável de ambiente JAVA_HOME para apontar para a pasta de instalação do JDK, através dos seguintes passos:

    - Aceder a "Editar as variáveis de ambiente do sistema".

    - Selecionar "Avançadas".
    
    - No separador "Avançadas", clicar em "Variáveis de ambiente...".
    
    - Em "Variáveis do sistema", clicar em "Novo".  
    Digitar `JAVA_HOME` no campo "Nome da variável".
    
    - No campo "Valor da variável", inserir o caminho para a pasta de instalação do JDK (por exemplo, `C:\Program Files\Java\jdk-20`).

    - Nas "Variáveis do sistema", localizar a variável "Path" e clicar em "Editar...".
    
    - Clicar em "Novo" e inserir o caminho para a pasta `bin` do JDK  
    (por exemplo, `C:\Program Files\Java\jdk-20\bin`).
    
    - Clicar em OK em todas as janelas abertas.

    > No caso de haver alguma janela de terminal aberta (a do Visual Studio Code, por exemplo) deve ser reiniciado (fechar e voltar a abrir) para que as variáveis de ambiente sejam atualizadas.

## 2. ANDROID_HOME
No caso de ao executar o comando `ionic cap run android` surgir o seguinte erro:

>  SDK location not found. Define a valid SDK location with an ANDROID_HOME environment variable

Devem de ser seguidos os passos abaixo:

1. Aceder a **Sistema** (Acerca de)
2. Aceder a **Definições avançadas do sistema**
3. Clicar no botão **Variáveis de ambiente**
4. Clicar no botão **Novo...**
5. Em **Nome da variável** inserir ANDROID_HOME
6. Em **Valor da variável** inserir o caminho para o diretório do SDK do Android (por exemplo, `C:\Users\<nome_do_utilizador>\AppData\Local\Android\Sdk`)
7. Clicar no botão **OK** para guardar as alterações
8. Reiniciar o sistema operativo 


---
_José Viana | josev@estg.ipvc.pt_