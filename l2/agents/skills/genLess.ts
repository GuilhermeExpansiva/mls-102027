/// <mls fileReference="_102027_/l2/agents/skills/genLess.ts" enhancement="_blank"/>

export const skill = `
    # SKILL: Component LESS File

You are responsible for creating the component's LESS file. By analyzing the component's YAML, you generate a semantic, encapsulated LESS file based on system tokens — never inventing tokens, never placing styles outside the root tag.

---

## The YAML you will receive

Use the following fields from the YAML to generate the LESS:

- \`tag\` → root tag name for encapsulation and for the \`fileReference\`
- \`file\` → base path of the component (replace \`.ts\` with \`.less\` for the \`fileReference\`)
- \`render\` → layout structure, elements, classes and states to style

---

## What you generate

### 1. Triple slash — always the first line

Every component file **must** start with the triple slash directive. It is indispensable for the system and must be the **first line** of the file.

\`\`\`less
/// <mls fileReference="_XXXXX_/l2/path/file.less" enhancement="_blank" />
\`\`\`

example 
{
  "project":102027,
  "outputPath": "/l2/petshop/layer/prod.ts",
}

\`\`\`less
/// <mls fileReference="_102027_/l2/petshop/layer/prod.less" enhancement="_blank" />
\`\`\`

---

### 2. Encapsulation within the component tag

All CSS must be inside the component tag defined in \`tag\` in the YAML. Nothing outside it.

\`\`\`less
petshop-update-product {
    // all CSS goes here
}
\`\`\`

---

### 3. Tokens — use only the available ones

### 3.1 Main Rule

- **Use tokens** when the desired value exists in the provided token list.
- **Use the direct value** in the attribute when the value does not exist as a token.
- **Never invent tokens** that were not provided.

### 3.2 Available Tokens

\`\`\`less
[TOKENS]
\`\`\`

### 3.3 Correct Usage Examples

Token exists → use it:
\`\`\`less
font-family: @font-family-primary;
font-size: @font-size-16;
\`\`\`

Value has no token → use directly:
\`\`\`less
border-radius: 4px;
color: #e53935;
\`\`\`

---

### 4. Analyze the render from the YAML to generate styles

For each block in \`render\`, generate the corresponding styles:

**\`loading_state\`** → style for the loading container and spinner

**\`error_state\`** → style for the error message (color, spacing)

**\`default_layout\`** → main form styles:
- Form layout (display, gap, padding)
- Two-column grid style (\`two-column\`)
- Each field type: \`input\`, \`textarea\`, \`select\`, \`checkbox\`
- \`actions\` block with button alignment
- Button variants: \`primary\` and \`secondary\`

---

## Expected full structure

\`\`\`less
/// <mls fileReference="_102029_/petshop/updateProduct/PetshopUpdateProduct.less" enhancement="_blank" />

petshop-update-product {
    display: block;
    font-family: @font-family-primary;
    font-size: @font-size-16;

    .loading {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 32px;
    }

    .error {
        color: #e53935;
        font-size: @font-size-14;
        padding: 8px 0;
    }

    form.update-product {
        display: flex;
        flex-direction: column;
        gap: 24px;

        .two-column {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 16px;
        }

        .full-width {
            grid-column: 1 / -1;
        }

        label {
            display: flex;
            flex-direction: column;
            gap: 4px;
            font-size: @font-size-14;
            font-family: @font-family-primary;
        }

        input,
        textarea,
        select {
            width: 100%;
            font-size: @font-size-16;
            font-family: @font-family-primary;
            border: 1px solid #ccc;
            border-radius: 4px;
            padding: 8px 12px;
            box-sizing: border-box;
        }

        textarea {
            resize: vertical;
        }

        input[type="checkbox"] {
            width: auto;
            cursor: pointer;
        }

        .actions {
            display: flex;
            justify-content: flex-end;
            gap: 12px;
            padding-top: 8px;

            button {
                font-size: @font-size-16;
                font-family: @font-family-primary;
                padding: 10px 24px;
                border-radius: 4px;
                cursor: pointer;
                border: none;

                &.primary {
                    background-color: #1976d2;
                    color: #fff;

                    &:disabled {
                        opacity: 0.6;
                        cursor: not-allowed;
                    }
                }

                &.secondary {
                    background-color: transparent;
                    color: #1976d2;
                    border: 1px solid #1976d2;
                }
            }
        }
    }
}
\`\`\`

---

## Validation checklist

- [ ] Triple slash present as the first line with \`enhancement="_blank"\`
- [ ] \`fileReference\` points to the correct \`.less\` derived from the \`file\` field in the YAML
- [ ] All CSS encapsulated within the component tag
- [ ] Root tag matches exactly the \`tag\` field in the YAML
- [ ] No styles declared outside the root tag
- [ ] Tokens used only when they exist in the provided list
- [ ] Values without a corresponding token used directly
- [ ] No tokens invented
`