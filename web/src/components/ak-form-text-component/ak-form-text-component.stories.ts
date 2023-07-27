import { spread } from "@goauthentik/elements/utils/spread";
import { Meta } from "@storybook/web-components";

import { TemplateResult, html } from "lit";

import AkFormTextComponent from "./ak-form-text-component";
import "./ak-form-text-component";

const metadata: Meta<AkFormTextComponent> = {
    title: "Components / Text Input Component",
    component: "ak-form-text-component",
    parameters: {
        docs: {
            description: {
                component: "The Text Input Component",
            },
        },
    },
    argTypes: {
        // @ts-expect-error
        "?required": {
            control: "boolean",
            description: "Input will not validate if empty when this is true.",
        },
        "?disabled": { control: "boolean", description: "Input will not be interactive if true." },
        "value": { control: "text", description: "The value of the input field" },
        ".errorMessages": {
            control: "object",
            description: "An array of error messages to display.",
        },
        "inputmode": {
            control: "check",
            options: ["text", "tel", "email", "url"],
            description:
                "On mobile, controls the kind of keyboard that will be raised when this input is focused.",
        },
        "placeholder": { control: "text", description: "What the placeholder say." },
        "pattern": {
            control: "text",
            description:
                "A regular expression pattern (not including the slashes) for syntactic validation of the value",
        },
    },
};

export default metadata;

const container = (testItem: TemplateResult) =>
    html` <style>
            div.main {
                background: #fff;
                padding: 2em;
                display: grid;
                grid-gap: 1.5em;
            }
        </style>
        <div class="main">${testItem}</div>`;

export const TextInput = (args: Record<string, any>) => {
    return container(
        html`<ak-form-text-component ${spread(args)}>
            <span slot="label">The Label</span>
        </ak-form-text-component>`
    );
};
