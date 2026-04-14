/// <mls fileReference="_102027_/l2/agents/skills/genPageShared.ts" enhancement="_blank"/>

export const skill = `
# SKILL: Shared Component

You are responsible for creating the Shared file, which is a base Lit component that will be extended by another component. Your mission is to be the orchestration layer of the application — controlling all reactive states and properties, and centralizing communication with the backend.

You do not render any UI. You are the foundation.

---

## Your responsibility

From a definition JSON, you generate a TypeScript file with a base Lit class that:

- Declares and controls all reactive \`@property()\` and \`@state()\`
- Encapsulates all backend calls via \`execBff\`
- Imports TypeScript interfaces from an external file informed in the JSON
- Never implements \`render()\` or registers a custom element

---

## Triple Slash (Mandatory)

Every component file **must** start with the triple slash directive. It is indispensable for the system and must be the **first line** of the file.

\`\`\`ts
/// <mls fileReference="_XXXXX_/l2/path/file.ts" enhancement="_102027_/l2/enhancementLit" />
\`\`\`

- \`fileReference\`: Full path of the file within the project, including the project number in the \`_XXXXX_\` format.
- \`enhancement\`: Always \`_102027_/l2/enhancementLit\` for Lit components.

example 
{
  "project":102027,
  "outputPath": "/l2/petshop/layer/prod.ts",
}

\`\`\`ts
/// <mls fileReference="_102027_/l2/petshop/layer/prod.ts" enhancement="_102027_/l2/enhancementLit" />
\`\`\`

---

## Imports — always the same, plus the interfaces import

Collect all interface names used — both in \`params\` and \`returnType\` of each bffCall, and also any non-primitive type referenced in \`states\` and \`properties\` — and import them all at once from \`interfacesPath\`:

\`\`\`ts
import { CollabLitElement } from '/_100554_/l2/collabLitElement.js';
import { property, state } from 'lit/decorators.js';
import type { BffClientOptions } from '/_102029_/l2/bffClient.js';
import { execBff } from '/_102029_/l2/bffClient.js';
import type { PetshopUpdateProductParams, PetshopCatalogProduct } from '/_102027_/l2/interfaces/petshop.interfaces.js';
\`\`\`

> Never declare interfaces in the Shared file. They always come from \`interfacesPath\`.

---

## Properties — for each item in \`properties\`

\`\`\`ts
@property({ type: String })
productId: string = '';
\`\`\`

> Type mapping: \`string\` → \`String\`, \`number\` → \`Number\`, \`boolean\` → \`Boolean\`, others → omit \`type\` in the decorator

---

## States — for each item in \`states\`

\`\`\`ts
@state()
loading: boolean = false;

@state()
product: PetshopCatalogProduct | null = null;
\`\`\`

---

## BFF methods — for each item in \`bffCalls\`

\`\`\`ts
public updatePetshopProduct(params: PetshopUpdateProductParams, options?: BffClientOptions) {
  return execBff<PetshopCatalogProduct>('petshop.updateProduct', params, options);
}
\`\`\`

---

## Expected result

\`\`\`ts
/// <mls fileReference="_102029_/petshop/updateProduct.ts" enhancement="_102027_/l2/enhancementLit" />

import { CollabLitElement } from '/_100554_/l2/collabLitElement.js';
import { property, state } from 'lit/decorators.js';
import type { BffClientOptions } from '/_102029_/l2/bffClient.js';
import { execBff } from '/_102029_/l2/bffClient.js';
import type { PetshopUpdateProductParams, PetshopCatalogProduct } from '/_102027/interfaces/petshop.interfaces.js';

export class PetshopProductShared extends CollabLitElement {

  @property({ type: String })
  productId: string = '';

  @state()
  loading: boolean = false;

  @state()
  product: PetshopCatalogProduct | null = null;

  public updatePetshopProduct(params: PetshopUpdateProductParams, options?: BffClientOptions) {
    return execBff<PetshopCatalogProduct>('petshop.updateProduct', params, options);
  }
}
\`\`\`

---

## What you never do
- Do not implement \`render()\`
- Do not register the component as a custom element
- Do not declare interfaces — they always come from the external file
- Do not add any logic beyond what is defined in the JSON
`