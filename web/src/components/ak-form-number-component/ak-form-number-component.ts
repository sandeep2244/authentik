import { html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { ifDefined } from "lit/directives/if-defined.js";
import { live } from "lit/directives/live.js";

import { AkInputComponent } from "../InputComponent/InputComponent";

const valueProperty = Symbol("inputValue");

type ModeTypes = "numeric" | "decimal";

/**
 * Form Number Component
 *
 * An input element with a label, required field, error status signaling, and error message
 * displays.
 *
 * NOTE: The behavior of the Text and Number fields is different with respect to invalidation: the
 * number field's `invalid` event contains 0, or `this.min` if it is defined and greater than 0.
 *
 * @element ak-form-number-component
 *
 * - @fires ak-change - when the input value changes
 * - @fires ak-invalid - when the input value doesn't match the pattern
 *
 * - @attr name - the name of the input, used by forms
 * - @attr value - the current value of the input
 * - @attr min - the smallest legal value, if set
 * - @attr max - the largest legal value, if set
 * - @attr step - the increment by which the value changes if those stupid twiddles are pressed
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

@customElement("ak-form-number-component")
export class AkFormNumberComponent extends AkInputComponent {
    @property({ attribute: "inputmode" })
    inputMode: ModeTypes = "numeric";

    @property({ type: Number })
    min?: number;

    @property({ type: Number })
    max?: number;

    @property({ type: Number })
    step?: number;

    [valueProperty] = 0;

    set value(v: number) {
        if (isNaN(v)) {
            v = 0;
        }

        v =
            this.max !== undefined && v > this.max
                ? this.max
                : this.min !== undefined && v < this.min
                ? this.min
                : v;

        this[valueProperty] = v;
    }

    @property({ type: Number })
    get value() {
        return this[valueProperty];
    }

    handleInvalid() {
        this.dispatchCustomEvent("ak-invalid", { value: this.value });
        this.invalid = true;
    }

    handleChange() {
        this.value =
            this.inputMode === "decimal"
                ? parseInt(`${this.input.value}`, 10)
                : parseFloat(`${this.input.value}`);
        this.dispatchCustomEvent("ak-change", { value: this.value });
    }

    renderControl() {
        const value = `${this.value}`;

        return html` <input
            part="ak-form-input"
            type="number"
            value=${live(value)}
            placeholder=${ifDefined(this.placeholder)}
            inputmode=${ifDefined(this.inputMode)}
            ?required=${this.required}
            ?disabled=${this.disabled}
            max=${ifDefined(this.max)}
            min=${ifDefined(this.min)}
            step=${ifDefined(this.step)}
            @invalid=${this.handleInvalid}
            @change=${this.handleChange}
            @input=${this.handleChange}
        />`;
    }
}

export default AkFormNumberComponent;
