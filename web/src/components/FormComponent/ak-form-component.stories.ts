import { Meta } from "@storybook/web-components";

import { TemplateResult, html } from "lit";

import AkFormComponent from "./ak-form-component";
import "./ak-form-component";

const metadata: Meta<AkFormComponent> = {
    title: "Components / Form Component",
    component: "ak-form-component",
    parameters: {
        docs: {
            description: {
                component: "A wrapper for many of our inputs",
            },
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

export const DefaultFormComponent = () => {
    return container(
        html`<ak-form-component>
            <input placeholder="This is an input put here as a placeholder" />
        </ak-form-component>`
    );
};

export const LabeledFormComponent = () => {
    return container(
        html`<ak-form-component>
            <span slot="label">The Label</span>
            <input placeholder="This is an input put here as a placeholder" />
        </ak-form-component>`
    );
};

export const RequiredFormComponent = () => {
    return container(
        html`<ak-form-component required>
            <span slot="label">The Label</span>
            <input placeholder="This is an input put here as a placeholder" />
        </ak-form-component>`
    );
};

export const ErroredFormComponent = () => {
    const errors = ["This is Error #1", "This is Error #2"];

    return container(
        html`<ak-form-component required .errorMessages=${errors}>
            <span slot="label">The Label</span>
            <input placeholder="This is an input put here as a placeholder" />
        </ak-form-component>`
    );
};

export const GapBetweenComponents = () => {
    return container(
        html`<ak-form-component required>
                <span slot="label">The Label</span>
                <input placeholder="This is an input put here as a placeholder" />
            </ak-form-component>
            <ak-form-component required>
                <span slot="label">Second Label</span>
                <select>
                    <option value="a">First option</option>
                    <option value="b">Second option</option>
                    <option value="c">Third option</option>
                </select>
            </ak-form-component>`
    );
};
