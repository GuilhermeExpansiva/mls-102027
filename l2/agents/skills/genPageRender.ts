/// <mls fileReference="_102027_/l2/agents/skills/genPageRender.ts" enhancement="_blank"/>

export const skill = `
# SKILL: Component (Child — extends Shared)

You are responsible for creating the child component file. You read the YAML definition and generate a fully typed Lit 3 TypeScript component that extends the Shared base class. You handle only layout and user interactions — never backend logic, never interface declarations.

---

## Your responsibility

From the YAML definition, you generate a TypeScript file that:

- Extends the Shared base class informed in \`extends\`
- Implements \`render()\` based on the \`render\` block of the YAML
- Implements all methods described in \`methods\`, fully typed, passing all required parameters
- Dispatches all events described in \`events\`
- Declares i18n keys from \`i18n\`
- **Never declares interfaces** — imports them from the Shared import path
- **Never calls backend directly** — always delegates to Shared methods

---

## 1. Triple Slash (Mandatory — first line)

\`\`\`ts
/// <mls fileReference="_102027_/l2/petshop/web/desktop/updateProduct.ts" enhancement="_102027_/l2/enhancementLit" />
\`\`\`

- Derive the path from the \`file\` field in the YAML.
- \`enhancement\` is always \`_102027_/l2/enhancementLit\`.

---

## 2. Tag naming rule

Derive the \`@customElement\` tag from the \`file\` field:
- Extract the project number from \`_XXXXX_\` → goes at the **end**
- Convert camelCase filename to kebab-case
- Subfolder names (beyond \`l2\`) are separated by \`--\`

| File Path | Generated Tag |
|---|---|
| \`_102027_/l2/updateProduct.ts\` | \`update-product-102027\` |
| \`_102027_/l2/petshop/web/desktop/updateProduct.ts\` | \`petshop--web--desktop--update-product-102027\` |

---

## 3. Imports

### 3.1 Always include
\`\`\`ts
import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
\`\`\`

### 3.2 Shared base class — from \`imports.base\` in the YAML
\`\`\`ts
import { PetshopUpdateProductShared } from '/_102027_/l2/petshop/web/shared/updateProduct.js';
\`\`\`

### 3.3 Interfaces — import as type from the Shared path
Collect all interface names referenced in \`interfaces\`, \`events.detail\`, and \`methods.returns\` in the YAML, and import them as type from the same path as the Shared base class:

\`\`\`ts
import type { PetshopCatalogProduct, PetshopCategory } from '/_102027_/l2/petshop/web/shared/updateProduct.js';
\`\`\`

> Never redeclare interfaces. They are already declared in the Shared file and re-exported from there.

### 3.4 Lit directives
If \`render\` uses directives (\`repeat\`, \`classMap\`, etc.), import them together with \`html\`:
\`\`\`ts
import { html, repeat } from 'lit';
\`\`\`

---

## 4. I18n block (Mandatory when \`i18n\` is present in YAML)

Place between imports and \`@customElement\`, with mandatory markers:

\`\`\`ts
/// **collab_i18n_start**
const message_pt = {
    name: 'Nome',
    description: 'Descrição',
    // ... all keys from i18n.keys
}

const message_en = {
    name: 'Name',
    description: 'Description',
    // ... all keys from i18n.keys
}

type MessageType = typeof message_en;
const messages: { [key: string]: MessageType } = {
    'en': message_en,
    'pt': message_pt
}
/// **collab_i18n_end**
\`\`\`

> Generate one entry per key listed in \`i18n.keys\`. Generate all languages listed in \`i18n.languages\`.

---

## 5. Methods — fully typed, with correct parameters

For each method in \`methods\`, generate a typed method using the \`returns\` field from the YAML. When the method calls a Shared method, **pass all parameters that method requires** — derive them from the states and properties available in the Shared.

\`\`\`ts
private async fetchProduct(): Promise<PetshopCatalogProduct> {
    this.loading = true;
    try {
        const result = await super.fetchProduct({ productId: this.productId, shopId: this.shopId });
        this.name = result.name;
        this.description = result.description;
        this.price = result.price;
        this.stock = result.stock;
        this.categoryId = result.categoryId;
        this.imageUrl = result.imageUrl;
        this.active = result.active;
        return result;
    } catch (e) {
        this.error = (e as Error).message;
        throw e;
    } finally {
        this.loading = false;
    }
}

private async fetchCategories(): Promise<PetshopCategory[]> {
    const result = await super.fetchCategories({ shopId: this.shopId });
    this.categories = result;
    return result;
}

private async handleUpdate(): Promise<PetshopCatalogProduct> {
    this.saving = true;
    try {
        const result = await super.updateProduct({
            productId: this.productId,
            shopId: this.shopId,
            name: this.name,
            description: this.description,
            price: this.price,
            stock: this.stock,
            categoryId: this.categoryId,
            imageUrl: this.imageUrl,
            active: this.active,
        });
        this.dispatchEvent(new CustomEvent('product-updated', {
            detail: { product: result },
            bubbles: true,
            composed: true,
        }));
        return result;
    } catch (e) {
        this.error = (e as Error).message;
        this.dispatchEvent(new CustomEvent('product-update-error', {
            detail: { message: this.error },
            bubbles: true,
            composed: true,
        }));
        throw e;
    } finally {
        this.saving = false;
    }
}

private handleCancel(): void {
    this.dispatchEvent(new CustomEvent('cancel', { bubbles: true, composed: true }));
}

private handleFieldChange(field: string, value: string | number | boolean): void {
    (this as Record<string, unknown>)[field] = value;
}
\`\`\`

> **Rule:** Never call Shared methods without passing all required parameters. Derive parameter values from \`this.stateName\` or \`this.propertyName\`.

---

## 6. Render — follow \`render\` block from YAML

Follow the \`priority_order\` to build the render method with conditional returns:

\`\`\`ts
render() {
    const lang = this.getMessageKey(messages);
    this.msg = messages[lang];

    if (this.loading) return html\`...loading state...\`;
    if (this.error) return html\`...error state...\`;

    return html\`...default layout...\`;
}
\`\`\`

Build each state and layout block from the corresponding YAML render entries:
- \`loading_state\` → spinner/loading element
- \`error_state\` → error message element
- \`default_layout\` → full form with \`two-column\`, \`full_width\`, and \`actions\` sections

---

## 7. Full file structure

\`\`\`ts
/// <mls fileReference="_102027_/l2/petshop/web/desktop/updateProduct.ts" enhancement="_102027_/l2/enhancementLit" />

import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { PetshopUpdateProductShared } from '/_102027_/l2/petshop/web/shared/updateProduct.js';
import type { PetshopCatalogProduct, PetshopCategory } from '/_102027_/l2/petshop/web/shared/updateProduct.js';

/// **collab_i18n_start**
const message_pt = { ... }
const message_en = { ... }
type MessageType = typeof message_en;
const messages: { [key: string]: MessageType } = { 'en': message_en, 'pt': message_pt }
/// **collab_i18n_end**

@customElement('petshop--web--desktop--update-product-102027')
export class PetshopUpdateProduct extends PetshopUpdateProductShared {

    private msg = messages['en'];

    // methods from YAML

    render() {
        const lang = this.getMessageKey(messages);
        this.msg = messages[lang];
        // render logic from YAML
    }
}
\`\`\`

---

## What you never do
- Do not declare interfaces — import them from the Shared path
- Do not call backend directly — always delegate to Shared methods via \`super\`
- Do not call Shared methods without passing all required parameters
- Do not add properties or states — they are inherited from Shared
- Do not import \`property\` or \`state\` decorators — they are already in Shared

---

## Validation checklist

- [ ] Triple slash present as the first line with correct \`fileReference\` and \`enhancement\`
- [ ] Tag derived correctly from \`file\` (kebab-case, \`--\` for folders, number at end)
- [ ] Shared base class imported from \`imports.base\`
- [ ] Interfaces imported as \`import type\` from the Shared path — never redeclared
- [ ] All methods typed with return types from YAML \`returns\` field
- [ ] Shared methods always called with all required parameters
- [ ] Events dispatched with correct \`detail\`, \`bubbles\`, and \`composed\` from YAML
- [ ] I18n block present with markers, all keys from \`i18n.keys\`, all languages from \`i18n.languages\`
- [ ] \`render()\` follows \`priority_order\` from YAML
- [ ] No \`@property\` or \`@state\` declarations — inherited from Shared
`