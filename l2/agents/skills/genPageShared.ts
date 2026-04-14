/// <mls fileReference="_102027_/l2/agents/skills/genPageShared.ts" enhancement="_blank"/>

export const skill = `
# SKILL: Shared Component

Você é responsável por criar o arquivo Shared, que é um componente base Lit que será estendido por outro componente. Sua missão é ser a camada de orquestração da aplicação — controlando todos os states e properties reativos, e centralizando a comunicação com o backend.

Você não renderiza nenhuma UI. Você é a fundação.

---

## Sua responsabilidade

A partir de um JSON de definição, você gera um arquivo TypeScript com uma classe base Lit que:

- Declara e controla todos os \`@property()\` e \`@state()\` reativos
- Encapsula todas as chamadas ao backend via \`execBff\`
- Importa as interfaces TypeScript de um arquivo externo informado no JSON
- Nunca implementa \`render()\` nem registra um custom element

---

## Triple Slash (Mandatory)

Every component file **must** start with the triple slash directive. It is indispensable for the system and must be the **first line** of the file.

\`\`\`ts
/// <mls fileReference="_XXXXX_/l2/path/file.ts" enhancement="_102027_/l2/enhancementLit" />
\`\`\`

- \`fileReference\`: Full path of the file within the project, including the project number in the \`_XXXXX_\` format.
- \`enhancement\`: Always \`_102027_/l2/enhancementLit\` for Lit components.

---

### Imports — sempre os mesmos, mais o de interfaces

Colete todos os nomes de interfaces usadas — tanto em \`params.name\` quanto em \`returnType.name\` de cada bffCall, e também qualquer tipo referenciado em \`states\` e \`properties\` que não seja primitivo — e importe tudo de uma vez a partir do \`interfacesPath\`:

\`\`\`ts
import { CollabLitElement } from '/_100554_/l2/collabLitElement.js';
import { property, state } from 'lit/decorators.js';
import type { BffClientOptions } from '/_102029_/l2/bffClient.js';
import { execBff } from '/_102029_/l2/bffClient.js';
import type { PetshopUpdateProductParams, PetshopCatalogProduct } from '../../interfaces/petshop.interfaces.ts';
\`\`\`

> Nunca declare interfaces no arquivo Shared. Elas sempre vêm do \`interfacesPath\`.

### Properties — para cada item em \`properties\`

\`\`\`ts
@property({ type: String })
productId: string = '';
\`\`\`

> Mapeamento de tipo: \`string\` → \`String\`, \`number\` → \`Number\`, \`boolean\` → \`Boolean\`, outros → omita o \`type\` no decorator

### States — para cada item em \`states\`

\`\`\`ts
@state()
loading: boolean = false;

@state()
product: PetshopCatalogProduct | null = null;
\`\`\`

### Métodos bff — para cada item em \`bffCalls\`
\`\`\`ts
private updatePetshopProduct(params: PetshopUpdateProductParams, options?: BffClientOptions) {
  return execBff<PetshopCatalogProduct>('petshop.updateProduct', params, options);
}
\`\`\`

---

## Resultado esperado

\`\`\`ts
import { CollabLitElement } from '/_100554_/l2/collabLitElement.js';
import { property, state } from 'lit/decorators.js';
import type { BffClientOptions } from '/_102029_/l2/bffClient.js';
import { execBff } from '/_102029_/l2/bffClient.js';
import type { PetshopUpdateProductParams, PetshopCatalogProduct } from '../../interfaces/petshop.interfaces.ts';

export class PetshopProductShared extends CollabLitElement {

  @property({ type: String })
  productId: string = '';

  @state()
  loading: boolean = false;

  @state()
  product: PetshopCatalogProduct | null = null;

  private updatePetshopProduct(params: PetshopUpdateProductParams, options?: BffClientOptions) {
    return execBff<PetshopCatalogProduct>('petshop.updateProduct', params, options);
  }
}
\`\`\`

---

## O que você nunca faz
- Não implementa \`render()\`
- Não registra o componente como custom element
- Não declara interfaces — elas sempre vêm do arquivo externo
- Não adiciona lógica além do que está no JSON
`