# **Reactive Forms**

_Última atualização do doc. 18.Mai.2024_    

- [Introdução teórica](#introdução-teórica)
- [Configuração de dependências](#configuração-de-dependências)
- [Configuração do componente](#configuração-do-componente)
- [Criação do formulário](#criação-do-formulário)
- [Validators disponíveis (alguns)](#validators-disponíveis-alguns)

# Introdução Teórica

Os _Reactive Forms_ são uma abordagem reativa para trabalhar com formulários em aplicações Angular. Disponibilizam uma forma de criar e manipular formulários de maneira programática, permitindo uma gestão eficiente do estado do formulário e da validação dos dados.

Com os _Reactive Forms_ é possível criar e manipular os _form control objects_ diretamente no _Component_. A classe acede à estrutura do formulário e ao modelo de dados. É possível manipular/colocar informação no formulário e ler os valores alterados pelo utilizador. O _component_ tem a capacidade de observar alterações no estado do formulário (_form control state_) e reagir a essas alterações, por exemplo para mostrar uma mensagem de validação.

## FormBuilder

O `FormBuilder` é um serviço Angular que fornece métodos para a criação de instâncias de `FormGroup` e `FormControl`. Constitui uma simplificação da criação de formulários reativos.

## FormGroup

O `FormGroup` é uma coleção de controlos (`FormControl`), organizados hierarquicamente para representar um formulário. Tem a capacidade de verificação do estado e respetiva validação de um conjunto de controlos.

## FormControl

Classe do package @angular/forms que representa um único elemento do formulário e o valor a ele associado. Utilizado para observar o valor e o estado de validação de um determinado elemento de um formulário. Através dele são definidos _validadores_ (validators) personalizados e tem a capacidade de reagir a alterações no valor do elemento do formulário.

## Validators

`Validators` é uma classe Angular que fornece um conjunto de _validadores_ pré-definidos utilizados para validação de dados em formulários reativos. Estes validadores podem ser aplicados aos controlos individuais ou ao `FormGroup` como um todo.

# Configuração de dependências

Em `home.module.ts` é necessária a preparação adequada para a utilização dos Reactive Forms.

Na linha onde está importado `FormsModule` (suporte para formulários Angular)...

```js
import { FormsModule } from '@angular/forms';
```

deverá ser complementada para suportar os Reactive Forms, através do `ReactiveFormsModule`:
```js
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
```

Após a importação do novo módulo é necessária a sua referência no array `imports`:

```js
imports: [
  CommonModule,
  FormsModule,
  IonicModule,
  HomePageRoutingModule,
  ReactiveFormsModule
],
```

# Configuração do componente

Em `home.page.ts`
_(ver comentários no código)_

```typescript
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  
  public contactForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.contactForm = this.formBuilder.group({
      name: ['', [Validators.required,  Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, this.numericValidator]]
    });
  }

  onSubmit() {
    // enviar os dados do formulário para um servidor ou realizar outra qualquer ação (escrever no IonicStorage, por exemplo)
    // neste caso, para efeito de teste, os valores são enviados para a consola
    if (this.contactForm.valid) {
      console.log(this.contactForm.value);
    } else {
      // marcar todos os campos como tocados para exibição das mensagens de erro
      Object.values(this.contactForm.controls).forEach(control => {
        control.markAsTouched();
      });
    }
  }

  private numericValidator(control: AbstractControl): {[key: string]: boolean} | null {
    const valid = /^[0-9]+$/.test(control.value);
    return valid ? null : { 'numeric': true };
  }
}

```

### Algumas notas:
- O método onSubmit tem a função de processar os dados do formulário quando este é submetido.

- O método `numericValidator` é um método desenvolvido para uma situação particular/personalizada - outra das possibilidades quando o que é pretendido algo que não é fornecido pelos `Validators`. No caso em particular, o método é utilizado para validar se o valor do campo do formulário contém apenas números.

  1. **Parâmetro `control`**:
    - `control: AbstractControl`: Este parâmetro representa o controlo do formulário que está a ser validado. Pode ser um `FormControl`, `FormGroup` ou `FormArray`.

  2. **Expressão Regular para Verificação**:
    - `const valid = /^[0-9]+$/.test(control.value);`
    - A expressão regular `/^[0-9]+$/` é usada para verificar se o valor do controlo consiste exclusivamente de caracteres numéricos (dígitos de 0 a 9).
      - `^` indica o início da string.
      - `[0-9]+` significa que a string deve conter um ou mais dígitos.
      - `$` indica o final da string.

  3. **Retorno da Função**:
    - `return valid ? null : { 'numeric': true };`
    - Se o valor for válido (contiver apenas números), a função retorna `null`, indicando que não há erro de validação.
    - Se o valor não for válido (contiver caracteres não numéricos), a função retorna um objeto com a chave `'numeric'` definida como `true`, indicando a presença de um erro de validação.

# Criação do formulário

Em `src/app/home/home.page.html` (apenas o `ion-content`):

```html
<ion-content>

  <form [formGroup]="contactForm" (ngSubmit)="onSubmit()">

    <ion-grid fixed class="ion-margin-top">

      <ion-row>
        <ion-col>
          <ion-input label="Nome" formControlName="name" type="text" label-placement="floating" fill="outline"></ion-input>
          <ion-text color="danger" *ngIf="contactForm.get('name')!.invalid && (contactForm.get('name')!.touched || contactForm.get('name')!.dirty)">
            <small *ngIf="contactForm.get('name')!.errors?.['required']">O nome é de preenchimento obrigatório</small>
            <small *ngIf="contactForm.get('name')!.errors?.['minlength']">O nome deve ter pelo menos 2 caracteres</small>
          </ion-text>
        </ion-col>
      </ion-row>

      <ion-row>
        <ion-col>
          <ion-input label="E-mail" formControlName="email" type="text" label-placement="floating" fill="outline"></ion-input>
          <ion-text color="danger" *ngIf="contactForm.get('email')!.invalid && (contactForm.get('email')!.touched || contactForm.get('email')!.dirty)">
            <small>Introduza um endereço de e-mail válido</small>
          </ion-text>
        </ion-col>
      </ion-row>

      <ion-row>
        <ion-col>
          <ion-input label="Contacto telefónico" formControlName="phone" type="text" label-placement="floating" fill="outline"></ion-input>
          <ion-text color="danger" *ngIf="contactForm.get('phone')!.invalid && (contactForm.get('phone')!.touched || contactForm.get('phone')!.dirty)">
            <small *ngIf="contactForm.get('phone')!.errors?.['required']">O contacto telefónico é de preenchimento obrigatório</small>
            <small *ngIf="!contactForm.get('phone')!.errors?.['required'] && contactForm.get('phone')!.errors?.['numeric']">O contacto telefónico deve conter apenas números</small>
          </ion-text>
        </ion-col>
      </ion-row>

      <ion-row>
        <ion-col class="ion-text-center">
          <ion-button  color="tertiary" shape="round" type="submit" [disabled]="!contactForm.valid" class="ion-margin">Submeter</ion-button>
        </ion-col>
      </ion-row>

    </ion-grid>
  
  </form>
  
</ion-content>
```

A construção do formulário é feita com recurso ao _component_ `ion-input`, com as devidas alterações para a validação do formulário, conforme o código desenvolvido em `home.page.ts`. Abaixo, para exemplificação, a parte da validação do campo _Nome_. 

```html
<ion-text color="danger" *ngIf="contactForm.get('name')!.invalid && (contactForm.get('name')!.touched || contactForm.get('name')!.dirty)">
  <small *ngIf="contactForm.get('name')!.errors?.['required']">O nome é de preenchimento obrigatório</small>
  <small *ngIf="contactForm.get('name')!.errors?.['minlength']">O nome deve ter pelo menos 2 caracteres</small>
</ion-text>
```

1. **`<ion-text color="danger" *ngIf="...">`**:
   - Exibe o conteúdo do erro apenas se a condição do `*ngIf` for verdadeira.

2. **`contactForm.get('name')!.invalid`**:
   - Verifica se o campo "name" está inválido.

3. **`contactForm.get('name')!.touched || contactForm.get('name')!.dirty`**:
   - Verifica se o campo "name" foi tocado ou modificado.

4. **`<small *ngIf="contactForm.get('name')!.errors?.['required']">`**:
   - Exibe a mensagem "O nome é de preenchimento obrigatório" se o erro de validação `required` estiver presente.

5. **`<small *ngIf="contactForm.get('name')!.errors?.['minlength']">`**:
   - Exibe a mensagem "O nome deve ter pelo menos 2 caracteres" se o erro de validação `minlength` estiver presente.

### Operadores `!` e `?` em TypeScript

#### Operador `!`
- **Significado**: Non-null assertion operator.
- **Uso**: Garante que um valor não é `null` ou `undefined`.

#### Operador `?`
- **Significado**: Optional chaining operator.
- **Uso**: Permite aceder a propriedades de objetos opcionalmente, evitando erros no caso do objeto for `null` ou `undefined`.


# Validators disponíveis (alguns)

### Validators.required
O validador `required` é usado para garantir que um campo não está vazio.

Exemplo de uso:
```js
name: ['', Validators.required]
```

### Validators.minLength
O validador `minLength` é usado para garantir que o valor de um campo tenha um comprimento mínimo especificado.

Exemplo de uso:
```js
password: ['', Validators.minLength(8)]
```

### Validators.maxLength
O validador `maxLength` é usado para garantir que o valor de um campo não exceda um comprimento máximo especificado.

Exemplo de uso:
```js
username: ['', Validators.maxLength(20)]
```

### Validators.pattern
O validador `pattern` é usado para garantir que o valor de um campo corresponda a um padrão _regex_ especificado.

Exemplo de uso:
```js
email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$')]]
```

### Validators.email
O validador `email` é usado para garantir que o valor de um campo seja um endereço de email válido.

Exemplo de uso:
```js
email: ['', Validators.email]
```

### Validators.min
O validador `min` é usado para garantir que o valor de um campo seja maior ou igual a um valor mínimo especificado.

Exemplo de uso:
```js
age: ['', Validators.min(18)]
```

### Validators.max
O validador `max` é usado para garantir que o valor de um campo seja menor ou igual a um valor máximo especificado.

Exemplo de uso:
```js
temperature: ['', Validators.max(40)]
```

---
_José Viana | josev@estg.ipvc.pt_
