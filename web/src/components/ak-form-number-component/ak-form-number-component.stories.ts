import { spread } from "@goauthentik/elements/utils/spread";
import { Meta } from "@storybook/web-components";

import { TemplateResult, html } from "lit";

import AkFormNumberComponent from "./ak-form-number-component";
import "./ak-form-number-component";

const metadata: Meta<AkFormNumberComponent> = {
    title: "Components / Number Input Component",
    component: "ak-form-number-component",
    parameters: {
        docs: {
            description: {
                component: "The Number Input Component",
            },
        },
    },
    argTypes: {
        // @ts-expect-error
        "?required": {
            control: "boolean",
            description: "Input will not validate if empty when this is true",
        },
        "?disabled": { control: "boolean", description: "Input will not be interactive if true" },
        "value": { control: { type: "number" }, description: "The value of the input field" },
        ".errorMessages": {
            control: "object",
            description: "An array of error messages to display",
        },
        "inputmode": {
            control: "check",
            options: ["numeric", "decimal"],
            description:
                "On mobile, controls the kind of keyboard that will be raised when this input is focused",
        },
        "placeholder": { control: "text", description: "What the placeholder say" },
        "min": { control: { type: "number" }, description: "If set, the control cannot be less than this" },
        "max": { control: { type: "number" }, description: "If set, the control cannot be more than this" },
        "step": { control: { type: "number" }, description: "If set, the control increments or decrements by this amount" },
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

export const NumberInput = (args: Record<string, any>) => {
    return container(
        html`<ak-form-number-component ${spread(args)}>
            <span slot="label">The Label</span>
        </ak-form-number-component>`
    );
};
