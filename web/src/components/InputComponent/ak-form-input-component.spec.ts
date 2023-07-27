import { expect, fixture } from "@open-wc/testing";

import AkFormInputComponent from "./ak-form-input-component";
import "./ak-form-input-component";

describe("Base input component", () => {
    it("A focus event on the element delegates it to the input", async() => {
        const el = (await fixture(
            `<ak-form-input-component name="test-component"></ak-form-input-component>`
        )) as AkFormInputComponent;

        el.focus();
        expect(el.shadowRoot?.activeElement).to.equal(el.input);
    });

    it("Focus doesn't happen when the input is disabled", async() => {
        const el = (await fixture(
            `<ak-form-input-component name="test-component" disabled></ak-form-input-component>`
        )) as AkFormInputComponent;

        el.focus();
        expect(el.shadowRoot?.activeElement).to.be.null;
    });
});
