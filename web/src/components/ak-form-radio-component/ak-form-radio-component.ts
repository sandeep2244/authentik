import { CustomEmitterElement } from "@goauthentik/elements/utils/eventEmitter";

import { TemplateResult, html, nothing } from "lit";
import { customElement, property, queryAll } from "lit/decorators.js";
import { map } from "lit/directives/map.js";

import { styles as AkRadioComponentStyles } from "./ak-form-radio-component.css";

import { AkFormComponentBase } from "../FormComponent/AkFormComponentBase";

const renderOption = Symbol("renderOption");
const renderDescription = Symbol("renderDescription");
const changeHandler = Symbol("handleChange");

export interface RadioOption<T> {
    label: string;
    description?: string | TemplateResult;
    value: T;
}

/**
 * Form Radio Component
 *
 * @element ak-form-radio-component
 *
 * - @fires ak-change - when the input value changes
 *
 * - @attr name - the name of the input, used by forms
 * - @attr value - the current value of the input
 * - @attr required - boolean; specifies the behavior of labels
 * - @attr disabled - boolean; if true, the input will not be interactive
 * - @attr options - array; the collection of options to display
 *
 */

@customElement("ak-form-radio-component")
export class AkFormRadioComponent<T> extends CustomEmitterElement(AkFormComponentBase) {
    static get styles() {
        return [...AkFormComponentBase.styles, AkRadioComponentStyles];
    }

    @property({ type: Array, attribute: false })
    options: RadioOption<T>[] = [];

    @property()
    name = "";

    @property({ attribute: false })
    value?: T;

    @queryAll("input")
    inputs!: HTMLInputElement[];

    constructor() {
        super();
        this[changeHandler] = this[changeHandler].bind(this);
        this[renderOption] = this[renderOption].bind(this);
    }

    [changeHandler](option: RadioOption<T>) {
        return () => {
            this.value = option.value;
            this.dispatchCustomEvent("ak-change", { value: option.value });
        };
    }

    [renderDescription](option: RadioOption<T>) {
        return option.description
            ? html`<span class="description">${option.description}</span>`
            : nothing;
    }

    [renderOption](option: RadioOption<T>) {
        const elId = `${this.name}-${option.value}`;
        return html`
            <div class="radio-option" @click=${this[changeHandler](option)}>
                <input
                    type="radio"
                    name="${this.name}"
                    id=${elId}
                    ?disabled=${this.disabled}
                    @change=${this[changeHandler](option)}
                    .checked=${option.value === this.value}
                />
                <label for=${elId}>${option.label}</label>
                ${this[renderDescription](option)}
            </div>
        `;
    }

    renderControl() {
        return html`<div class="radio-stack">${map(this.options, this[renderOption])}</div>`;
    }
}

export default AkFormRadioComponent;
