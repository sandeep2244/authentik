import { CustomEmitterElement } from "@goauthentik/elements/utils/eventEmitter";

import { html } from "lit";
import { property, query } from "lit/decorators.js";
import { ifDefined } from "lit/directives/if-defined.js";

import { styles as AkInputComponentStyles } from "./ak-form-input-component.css";

import { AkFormComponentBase } from "../FormComponent/AkFormComponentBase";

export class AkInputComponent extends CustomEmitterElement(AkFormComponentBase) {
    static get styles() {
        return [...AkFormComponentBase.styles, AkInputComponentStyles];
    }

    @property()
    placeholder?: string = "";

    constructor() {
        super();
        this.focus = this.focus.bind(this);
    }

    connectedCallback() {
        super.connectedCallback();
        this.addEventListener("click", this.focus);
    }

    disconnectedCallback() {
        this.removeEventListener("click", this.focus);
        super.disconnectedCallback();
    }

    focus() {
        if (this.disabled) {
            return;
        }
        super.focus();
    }

    @query("input")
    input!: HTMLInputElement;

    renderControl() {
        return html`
            <input
                type="text"
                ?required=${this.required}
                ?disabled=${this.disabled}
                placeholder=${ifDefined(this.placeholder)}
            />
        `;
    }
}
