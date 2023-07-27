import { LitElement, html, nothing } from "lit";
import { property } from "lit/decorators.js";
import { map } from "lit/directives/map.js";

import { styles as AkFormComponentStyles } from "./ak-form-component.css";

const renderErrorMessages = Symbol("renderErrorMessages");

/**
 * Base class for all of our fields, whether in a form or not. Child classes need to implement an
 * input of some kind and provide the correct API for informing outside users of the availability of
 * the data.
 */

export class AkFormComponentBase extends LitElement {
    static get styles() {
        return [AkFormComponentStyles];
    }

    // Ensure the focus goes into the ShadowDOM.
    static override shadowRootOptions: ShadowRootInit = {
        ...LitElement.shadowRootOptions,
        delegatesFocus: true,
    };

    // The public API:

    @property({ attribute: false })
    errorMessages: string[] = [];

    @property({ type: Boolean, reflect: true })
    invalid = false;

    @property({ type: String })
    name = "";

    @property({ attribute: true, type: Boolean })
    required = false;

    @property({ type: Boolean })
    disabled = false;

    renderLabel() {
        return html`<label
            ><slot name="label"></slot>
            ${this.required ? html`<span class="required" aria-hidden="true">*</span>` : nothing}
        </label>`;
    }

    renderControl() {
        return html`<slot></slot>`;
    }

    render() {
        return html`<div class="input-group">
            <div class="group">
                <div class="label">${this.renderLabel()}</div>
                <div class="control">${this.renderControl()}</div>
            </div>
            ${this[renderErrorMessages]()}
        </div>`;
    }

    // PRIVATE:

    // Don't allow the override of error messages. They always go in the same place.

    [renderErrorMessages]() {
        if (this.errorMessages.length === 0) {
            return nothing;
        }
        return html`<div class="error-messages">
            ${map(this.errorMessages, (message) => html`<p aria-live="polite">${message}</p>`)}
        </div>`;
    }
}

export default AkFormComponentBase;
