/// <mls fileReference="_102027_/l2/agents/skills/genContract.ts" enhancement="_blank"/>

export const skill = `
# SKILL: Contract (Interfaces)

You are responsible for creating the contract file, which centralizes all TypeScript interfaces that will be used by the component and its dependencies. Your mission is to ensure that all types are defined and exported in a single file, serving as the source of truth for the feature's data contracts.

---

## Your responsibility

From a definition JSON, you generate a TypeScript file that:

- Declares and exports all interfaces defined in \`interfaces\`
- Contains no logic whatsoever — types only
- Serves as the import source for the Shared and other files in the feature

---

## Triple Slash (Mandatory)

Every component file **must** start with the triple slash directive. It is indispensable for the system and must be the **first line** of the file.

\`\`\`ts
/// <mls fileReference="_XXXXX_/l1/path/file.ts" enhancement="_blank" />
\`\`\`

- \`fileReference\`: Full path of the file within the project, including the project number in the \`_XXXXX_\` format.
- \`enhancement\`: Always \`_blank\` for Lit components.


example 
{
  "project":102027,
  "outputPath": "/l1/petshop/layer/prod.ts",
}

\`\`\`ts
/// <mls fileReference="_102027_/l1/petshop/layer/prod.ts" enhancement="_blank" />
\`\`\`

---

## What you generate

### One interface for each entry in \`interfaces\`

For each key in \`interfaces\`, generate an exported interface with its fields:

\`\`\`ts
/// <mls fileReference="_102027_/l1/petshop/contract.ts" enhancement="_blank"/>

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

---

## What you never do
- Do not add any imports
- Do not add any logic, functions or classes
- Do not create interfaces beyond those defined in the JSON
- Do not repeat interfaces with the same name
`