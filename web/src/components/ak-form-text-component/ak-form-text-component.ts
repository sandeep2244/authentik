import { html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { ifDefined } from "lit/directives/if-defined.js";
import { live } from "lit/directives/live.js";

import { AkInputComponent } from "../InputComponent/InputComponent";

type ModeTypes = "text" | "tel" | "email" | "url";

/**
 * Form Text Component
 *
 * An input element with a label, required field, error status signaling, and error message
 * displays.
 *
 * NOTE: The behavior of the Text and Number fields is different with respect to invalidation: the
 * text field's `invalid` event contains the contents of the input field, even if they are invalid.
 *
 * @element ak-form-text-component
 *
 * - @fires ak-change - when the input value changes
 * - @fires ak-invalid - when the input value doesn't match the pattern
 *
 * - @attr name - the name of the input, used by forms
 * - @attr value - the current value of the input
 * - @attr required - boolean; specifies the behavior of labels
 * - @attr disabled - boolean; if true, the input will not be interactive
 * - @attr invalid - reflects state of the internal input
 * - @attr errorMessages - array of string, any error messages sent to this control from
     the outside
 * - @attr inputmode - specifies what sort of keyboard to bring up on mobile. Legal values
     are "text", "tel", "email", and "url"
 * - @attr placeholder - The placeholder string to show to users
 * - @attr pattern - If specified, a regular expression that validates the input
 *
 */

@customElement("ak-form-text-component")
export class AkFormTextComponent extends AkInputComponent {
    @property({ attribute: "inputmode" })
    inputMode: ModeTypes = "text";

    @property()
    pattern?: string;

    @property({ type: String, reflect: true })
    value = "";

    handleInvalid() {
        this.dispatchCustomEvent("ak-invalid", { value: this.input.value });
        this.invalid = true;
    }

    handleChange() {
        this.value = this.input.value;
        this.dispatchCustomEvent("ak-change", { value: this.value });
    }

    renderControl() {
        return html` <input
            part="ak-form-input"
            name=${ifDefined(this.name)}
            type="text"
            value=${live(this.value)}
            pattern=${ifDefined(this.pattern)}
            placeholder=${ifDefined(this.placeholder)}
            ?required=${this.required}
            ?disabled=${this.disabled}
            @invalid=${this.handleInvalid}
            @change=${this.handleChange}
            @input=${this.handleChange}
        />`;
    }
}

export default AkFormTextComponent;
