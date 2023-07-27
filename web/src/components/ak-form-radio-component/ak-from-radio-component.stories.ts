import { spread } from "@goauthentik/elements/utils/spread";
import { Meta } from "@storybook/web-components";

import { TemplateResult, html } from "lit";

import AkFormRadioComponent from "./ak-form-radio-component";
import "./ak-form-radio-component";

const metadata: Meta<AkFormRadioComponent<string>> = {
    title: "Components / Radio Input Component",
    component: "ak-form-radio-component",
    parameters: {
        docs: {
            description: {
                component: "The Radio Input Component",
            },
        },
    },
    argTypes: {
        // @ts-expect-error
        "?disabled": { control: "boolean", description: "Input will not be interactive if true" },
        "?required": { control: "boolean", description: "Input will be marked required" },
        "value": { control: "object", description: "The value of the input field" },
        ".errorMessages": {
            control: "object",
            description: "An array of error messages to display.",
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

const options = [
    { label: "KitKat", value: "kit-kat" },
    { label: "Toblerone", value: "tobbblerrrone" },
    { label: "Ritter Sport", value: "ritter-sport" },
];

export const RadioInput = (args: Record<string, any>) => {
    return container(
        html`<ak-form-radio-component name="test-component" .options=${options} ${spread(args)}>
            <span slot="label">Candy!</span>
        </ak-form-radio-component>`
    );
};

const optionsWithText = [
    { label: "KitKat", value: "kit-kat", description: "Big in Japan" },
    { label: "Toblerone", value: "tobbblerrrone", description: "Unpronouncable" },
    {
        label: "Ritter Sport",
        value: "ritter-sport",
        description: "Really? When there's better chocolate out there?",
    },
];

export const RadioInputWithTextDescriptions = (args: Record<string, any>) => {
    return container(
        html`<ak-form-radio-component
            name="test-component"
            .options=${optionsWithText}
            ${spread(args)}
        >
            <span slot="label">Candy!</span>
        </ak-form-radio-component>`
    );
};

const optionsWithTemplates = [
    { label: "KitKat", value: "kit-kat", description: html`Big in Japan` },
    { label: "Toblerone", value: "tobbblerrrone", description: html`Unpronouncable` },
    {
        label: "Ritter Sport",
        value: "ritter-sport",
        description: html`<em>Really?</em> When there's so much better chocolate out there?`,
    },
];

export const RadioInputWithTemplateDescriptions = (args: Record<string, any>) => {
    return container(
        html`<ak-form-radio-component
            name="test-component"
            .options=${optionsWithTemplates}
            ${spread(args)}
        >
            <span slot="label">Candy!</span>
        </ak-form-radio-component>`
    );
};
