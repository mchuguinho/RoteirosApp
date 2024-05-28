# **Capacitor - Criar / Preparar / Testar / Distribuir uma app**

_Última atualização do doc. 11.Mai.2024_

- [Capacitor](#capacitor)
- [Criar app](#criar-app)  
  _Preparada para dispositivo físico ou emulador_
- [Preparar app](#preparar-a-app)  
  _Dispositivo físico ou emulador_
- [Debug de uma app](#debug-de-uma-app)
- [apk (Distribuição)](#apk-distribuição)

> Este guião tem como requisito a instalação/configuração prévia do Android Studio. O Android Studio está atualmente na versão _**Jellyfish**_ e pode ser obtido em https://developer.android.com/studio ( ~1.1GB )

# Capacitor

Plataforma de desenvolvimento de aplicações móveis híbridas.

- Possibilita o desenvolvimento de aplicações nativas para dispositivos móveis através da utilização das tecnologias da web: HTML, CSS e JavaScript/TypeScript. 
- Permite acesso às APIs nativas do dispositivo
- Possibilita o desenvolvimento de aplicações com capacidade de trabalhar offline
- Suporta várias plataformas: iOS, Android e web.  

  > Em contexto do Ionic, o Capacitor é o que possibilita que os projetos desenvolvidos com a framework possam ser instalados e executados em dispositivos móveis.

# Criar app
## Preparada para dispositivo físico ou emulador

- Criar uma nova app  
`ionic start exemplo blank --type=angular`

  > De notar que, durante o processo de instalação/configuração da app, é instalada o Capacitor. Logo, não é necessária a sua instalação que é efetuada durante o processo de configuração com o seguinte comando:  
  `npm.cmd i --save -E @capacitor/core@latest`

- Ver configurações do Capacitor `capacitor.config.ts`: 

  ```js
  import type { CapacitorConfig } from '@capacitor/cli';

  const config: CapacitorConfig = {
    appId: 'io.ionic.starter',
    appName: 'exemplo',
    webDir: 'www'
  };

  export default config;
  ```

- (Opcional - Recomendado) Definir configurações do Capacitor (definição do Package ID)  
  > **Este passo impede que, quando é feito o _deploy_ para o dispositivo físico, as apps sejam sobrepostas.**
  
 (Re)definir
  - `appName` representa o nome da app
  - `appId` é o identificador de domínio da app

  **Notas:**

  > **Package ID**  
  Referido pela Apple como Bundle ID.  
  Referido pela Google (Android) como Application ID.

  > O Package ID é utilizado para a identificação das apps para a App Store ou Play Store.
  É uma string formatada na notação reverse-DNS.

  Mais informação:  
  https://ionicframework.com/docs/reference/glossary#package-id

  No Ionic, inicialmente, o `capacitor.config.ts` é criado da seguinte forma:

  ```js
  import type { CapacitorConfig } from '@capacitor/cli';

  const config: CapacitorConfig = {
    appId: 'io.ionic.starter',
    appName: 'exemplo',
    webDir: 'www'
  };

  export default config;
  ```
  Após nova configuração o ficheiro `capacitor.config.ts` ficará, por exemplo, como abaixo:

  ```js
  import type { CapacitorConfig } from '@capacitor/cli';

  const config: CapacitorConfig = {
    appId: 'pt.jviana.aminhaapp',
    appName: 'A minha app',
    webDir: 'www'
  };

  export default config;
  ```

  Alternativamente, a alteração do id da aplicação pode ser feita na pasta android, no ficheiro
  `build.gradle` (`/android/app/build.gradle`) e alterar o `applicationId` para o desejado

Mais informação:  
https://developer.android.com/studio/build/application-id

> O Capacitor nunca faz alterações nos projetos (no caso, os projetos Ionic). Sendo assim appId e o appName apenas é utilizado na primeira vez que é adicionada uma plataforma ao projeto (Android ou iOS). Após o projeto nativo ser gerado, as alterações da configuração da app não produzem efeito no projeto nativo.

> No caso de ser necessário fazer alguma reconfiguração, a pasta android/ios pode ser apagada e o projeto nativo gerado de novo. Alternativamente, se for necessária a alteração do _app name_, a operação pode ser feita diretamente no projeto nativo.

# Preparar a app
## Para dispositivo físico ou emulador

1. Preparar a app para qualquer plataforma de destino (Build web assets):

    ```bash
    ionic build 
    ```

    > Este comando cria a pasta `www`  
    (não necessária na distribuição da app, por exemplo, para upload para o Moodle)

1. Adicionar uma plataforma nativa ao projeto Ionic (cópia do _template_ da plataforma):
    ```bash
    ionic capacitor add android
    ```

   ou, de forma abrevida 

    ```bash
    ionic cap add android
    ```

    > Este comando cria a pasta `android`
    (não necessária na distribuição da app, por exemplo, para upload para o Moodle)  

    ou, no caso de _ios_
    ```bash
    ionic cap add ios
    ```
  
  Mais informação:
  https://capacitorjs.com/docs/basics/workflow

- Abrir o projeto Ionic/Capacitor no Android Studio:
  > Não é necessário ter o telemóvel ligado
  ```
  ionic cap open android 
  ```

  _Poderá, durante o processo surgir a questão "Trust and Open Project 'android'?". Neste caso deverá ser respondido "Trust Project"_

  Após o carregamento estar completo clicar, na barra de ferramentas, no botão _Run 'app'_.

- Executar a app num dispositivo físico ou num emulador  

  Ligar o telemóvel, por USB, ao computador. O telemóvel deverá ter ativo o "Modo de depuração com USB".
  - Esta opção estará disponível, tipicamente, na opção _Opções do Programador_, nas definições (a localização/ativação difere entre dispositivos/sistemas diferentes).

  - Ou, em Definições » Definições adicionais » Opções do programador

  E executar o seguinte comando:  
  ```
  ionic capacitor run android
  ```
  ou
  ```
  ionic cap run android
  ```

- No caso de aparecer aparecer esta mensagem no telemóvel deve ser dada a respetiva permissão:

  - Permitir depuração USB?  
  A impressão digital da chave RSA do computador é:  
  XX:XX:XX...  

  - [v] Permitir sempre a partir deste computador   
  [PERMITIR]

  - De seguida, na consola, à questão  
  _Which device would you like to target?_ 
  deverá ser selecionado o dispositivo físico ligado ao computador.

  - Pode haver a necessidade de configurações/autorizações adicionais no telemóvel. No caso de insucesso, no processo, devem ser lidos os erros e retificadas as respetivas configurações.

# Debug de uma App

No caso da passagem da app para um dispositivo físico podem ocorrer erros e/ou a app não funcionar. Nesse caso
deverá fazer-se o "Remote debug".

Os passos abaixo (para o Chrome) descrevem o processo para iniciar o "Remote debug" (com dispositivo ligado ao PC)

1. Na barra de endereço do browser executar:  
    ```
    chrome://inspect/#devices
    ```

2. Para inspecionar os eventuais problemas, clicar em _Inspect_ na app pretendida de entre as listadas (caso haja mais do que uma listada).

3. Os eventuais erros poderão ser visualizados na _Consola_ do browser (como é feito, normalmente, no desenvolvimento de páginas web).


# apk (Distribuição)

1. Para o efeito, deve ser feito, em primeiro lugar, a cópia e/ou a atualização de todo o projeto:

    ```bash
    ionic capacitor sync android
    ```

    O comando "sync" encarrega-se de copiar e atualizar o projeto Ionic, através das seguintes ações:  

    - Executar um "ionic build", preparando a app para a plataforma de destino;

    - Copiar tudo o que necessita (web assets) para a plataforma nativa de destino;

    - Atualizar o Capacitor de acordo com a plataforma de destino e todas as suas dependências;

    - Instalar todos os plugins do Capacitor que existam no projeto.

    ## Quando fazer o sync de um projeto?

    Poderá haver a necessidade de fazer o _sync_ (sincronizar) a app com o projeto nativo nas seguintes circunstâncias:

    - Quando é necessária a cópia de (novos) _assets_ para o projeto nativo.

    - Antes de executar o projeto usando um IDE Nativo.

    - Depois de instalar um novo plugin do Capacitor.

    - Depois de clonar o projeto.

    - Quando é necessário configurar ou reconfigurar o projeto nativo para o Capacitor.

    - Quando são instaladas dependências nativas.


    Mais informação:  
    https://ionicframework.com/docs/cli/commands/capacitor-sync

2. Abrir o projeto Ionic/Capacitor no Android Studio:
(não é necessário ter o telemóvel ligado)

    ```
    ionic cap open android 
    ```
    
3. Após a abertura do Android Studio, deixar que todos os processos terminem.

4. Gerar o APK acedendo ao menu do Android Studio "Build":
Build » Build Bundle(s) / APK(s) » Build APK(s)

5. Quando o processo é terminado surgirá a seguinte notificação:

    > Build APK(s)  
    APK(s) generated successfully for 1 module:  
    Module 'android.app': locate or analyze the APK.

6. Clicar em `locate` (na mensagem que aparece em 5.)

    ou, alternativamente, abrir a localização do projeto na pasta 
    `android\app\build\outputs\apk\debug`  
    ou seja, em  
    `C:\<localizacao_do_projeto>\<nome_da_app>\android\app\build\outputs\apk\debug`

7. Copiar o ficheiro `app-debug.apk` para o dispositivo.

    > O ficheiro pode ser renomeado.

8. Localizar o ficheiro no dispositivo e executá-lo para que seja efetuada a instalação da app. 

    > No caso da existência de uma outra versão da app no dispositivo, não há a necessidade da sua prévia remoção. O sistema deteta a versão anterior e informa o seguinte:
    "Pretende instalar uma atualização para esta aplicação existente? Os seus dados existentes não serão perdidos."

---
_José Viana | josev@estg.ipvc.pt_