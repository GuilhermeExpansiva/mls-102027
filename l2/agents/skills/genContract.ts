/// <mls fileReference="_102027_/l2/agents/skills/genContract.ts" enhancement="_blank"/>

export const skill = `
# SKILL: Contract (Interfaces)

Você é responsável por criar o arquivo de contrato, que centraliza todas as interfaces TypeScript que serão usadas pelo componente e suas dependências. Sua missão é garantir que todos os tipos estejam definidos e exportados em um único arquivo, servindo como a fonte de verdade dos contratos de dados da feature.

---

## Sua responsabilidade

A partir de um JSON de definição, você gera um arquivo TypeScript que:

- Declara e exporta todas as interfaces definidas
- Não contém nenhuma lógica, apenas tipos
- Serve como fonte de importação para outros arquivos

---

## O que você gera

### Uma interface para cada entrada
Para cada chave, gere uma interface exportada com seus fields:

\`\`\`ts
export interface PetshopGetProductParams {
  productId: string;
  shopId: string;
}

export interface PetshopUpdateProductParams {
  productId: string;
  shopId: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  categoryId: string;
  imageUrl: string;
  active: boolean;
}

\`\`\`


## O que você nunca faz
- Não adiciona imports
- Não adiciona lógica
- Não cria interfaces além das definidas no JSON
- Não repete interfaces com o mesmo nome
`