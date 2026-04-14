/// <mls fileReference="_102027_/l2/agents/skills/genPageRender.ts" enhancement="_blank"/>

export const skill = `
# Requirements for Creating Web Components — Lit 3 (Collab Codes)

---

## 1. Triple Slash (Mandatory)

Every component file **must** start with the triple slash directive. It is indispensable for the system and must be the **first line** of the file.

\`\`\`ts
/// <mls fileReference="_XXXXX_/l2/path/file.ts" enhancement="_102027_/l2/enhancementLit" />
\`\`\`

- \`fileReference\`: Full path of the file within the project, including the project number in the \`_XXXXX_\` format.
- \`enhancement\`: Always \`_102027_/l2/enhancementLit\` for Lit components.

---

## 2. Mandatory Imports

The following imports are mandatory in every component:

\`\`\`ts
import { html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { CollabLitElement } from '/_100554_/l2/collabLitElement.js';
\`\`\`

### 2.1 Lit 3 Directives

If the component uses Lit directives (e.g., \`repeat\`, \`classMap\`, \`styleMap\`, \`unsafeHTML\`, \`ifDefined\`, etc.), they must be imported **together with \`html\` in the same import statement**, never in separate paths.

Correct:
\`\`\`ts
import { html, repeat, classMap, unsafeHTML } from 'lit';
\`\`\`

Incorrect:
\`\`\`ts
import { repeat } from 'lit/directives/repeat.js';
import { classMap } from 'lit/directives/class-map.js';
\`\`\`

---

## 3. \`@customElement\` Naming Rules

### 3.1 camelCase → kebab-case Conversion
Every uppercase letter in the filename is converted to \`-\` + lowercase letter.

### 3.2 Folder Separator
When the file is in a subfolder (beyond \`l2\`), the folder name is separated by \`--\` from the filename.

### 3.3 Project Number
The project number (extracted from the \`_XXXXX_\` format) always goes at the **end** of the tag, separated by \`-\`.

### 3.4 Examples

| File Path | Generated Tag |
|---|---|
| \`_100554_/l2/testComp.ts\` | \`test-comp-100554\` |
| \`_100554_/l2/helloWorld.ts\` | \`hello-world-100554\` |
| \`_100554_/l2/test/helloWorld.ts\` | \`test--hello-world-100554\` |
| \`_100554_/l2/forms/inputText.ts\` | \`forms--input-text-100554\` |
| \`_100554_/l2/ui/card/myCard.ts\` | \`ui--card--my-card-100554\` |

---

## 4. Internationalization — I18n (Mandatory when text is present)

### 4.1 Structure

The I18n block must be declared **before** the \`@customElement\`, delimited by the mandatory markers:

\`\`\`ts
/// **collab_i18n_start**
const message_pt = {
    hello: 'Olá',
}

const message_en = {
    hello: 'Hello',
}

type MessageType = typeof message_en;
const messages: { [key: string]: MessageType } = {
    'en': message_en,
    'pt': message_pt
}
/// **collab_i18n_end**
\`\`\`

### 4.2 Rules

- The markers \`/// **collab_i18n_start**\` and \`/// **collab_i18n_end**\` are **mandatory**.
- The block is always placed **between the imports and the \`@customElement\`**.
- \`message_en\` is always the source of truth for \`MessageType\` (use \`typeof message_en\`).
- The \`messages\` dictionary must be typed as \`{ [key: string]: MessageType }\`.
- If the user **does not specify languages**, generate only \`message_en\` with English texts as default.

### 4.3 Usage inside the class

\`\`\`ts
export class MyComp extends CollabLitElement {

    private msg = messages['en'];

    render() {
        const lang = this.getMessageKey(messages);
        this.msg = messages[lang];

        return html\`
            <h1>\${this.msg.hello}</h1>
        \`;
    }
}
\`\`\`

- \`private msg\` always initializes with \`messages['en']\`.
- \`this.getMessageKey(messages)\` is called at the beginning of \`render()\` to resolve the active language.
- All keys in the message object must be typed via \`MessageType\`.

---

## 5. TypeScript Typing (Mandatory)

Since the file is TypeScript, **everything must be typed**, without exception.

### 5.1 Properties
\`\`\`ts
@property({ type: String }) label: string = '';
@property({ type: Number }) count: number = 0;
@property({ type: Boolean }) disabled: boolean = false;
@property({ type: Object }) data: Record<string, unknown> = {};
@property({ type: Array }) items: string[] = [];
\`\`\`

### 5.2 Callbacks and Lit Functions

When using directives like \`repeat\`, callbacks must be explicitly typed with casting when necessary:

\`\`\`ts
import { html, repeat, TemplateResult } from 'lit';

render() {
    return html\`
        <ul>
            \${repeat(
                this.items,
                ((item: string) => item) as () => string,
                ((item: string) => html\`<li>\${item}</li>\`) as () => TemplateResult<1>
            )}
        </ul>
    \`;
}
\`\`\`

### 5.3 \`render()\` Return
The \`render()\` method implicitly returns \`TemplateResult<1>\`. When necessary to declare the type explicitly, import \`TemplateResult\` from \`'lit'\`.

---

## 6. Full File Structure

\`\`\`ts
/// <mls fileReference="_XXXXX_/l2/path/myComp.ts" enhancement="_102027_/l2/enhancementLit" />

import { html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { CollabLitElement } from '/_100554_/l2/collabLitElement.js';

/// **collab_i18n_start**
const message_pt = {
    label: 'Rótulo',
}

const message_en = {
    label: 'Label',
}

type MessageType = typeof message_en;
const messages: { [key: string]: MessageType } = {
    'en': message_en,
    'pt': message_pt
}
/// **collab_i18n_end**

@customElement('my-comp-XXXXX')
export class MyComp extends CollabLitElement {

    @property({ type: String }) label: string = '';
    private msg = messages['en'];

    render() {
        const lang = this.getMessageKey(messages);
        this.msg = messages[lang];

        return html\`
            <div>\${this.msg.label}: \${this.label}</div>
        \`;
    }

}
\`\`\`

---

## 7. Validation Checklist

Before finalizing the component, check:

- [ ] Triple slash present as the first line of the file.
- [ ] \`fileReference\` with correct path and project number.
- [ ] Mandatory imports present (\`html\`, \`customElement\`, \`property\`, \`CollabLitElement\`).
- [ ] Lit directives imported from \`'lit'\` (not from subpaths).
- [ ] I18n block present with \`/// **collab_i18n_start**\` and \`/// **collab_i18n_end**\` markers.
- [ ] I18n block positioned between imports and \`@customElement\`.
- [ ] \`MessageType\` derived from \`typeof message_en\`.
- [ ] \`messages\` typed as \`{ [key: string]: MessageType }\`.
- [ ] Default language \`message_en\` present (even if other languages weren't requested).
- [ ] \`private msg\` initialized with \`messages['en']\`.
- [ ] \`this.getMessageKey(messages)\` called at the start of \`render()\`.
- [ ] \`@customElement\` tag follows the naming rule (kebab-case, \`--\` for folders, number at the end).
- [ ] All variables, properties, and callbacks are typed.
- [ ] Class extends \`CollabLitElement\`.
- [ ] Class exported with \`export class\`.
`