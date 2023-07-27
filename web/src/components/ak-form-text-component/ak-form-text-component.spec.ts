import { expect, fixture, oneEvent } from "@open-wc/testing";

import AkFormTextComponent from "./ak-form-text-component";
import "./ak-form-text-component";

describe("Text input component", () => {
    it("handles change events as expected", async () => {
        const el = (await fixture(
            `<ak-form-text-component name="test-component"></ak-form-text-component>`
        )) as AkFormTextComponent;

        const input = el.input;
        setTimeout(() => { input.value = "foo"; input.dispatchEvent(new InputEvent('change', { data: 'a' })) });
        const { detail } = await oneEvent(el, 'ak-change')
        expect(detail.value).to.equal('foo');
    });

    it("handles input events as expected", async () => {
        const el = (await fixture(
            `<ak-form-text-component name="test-component"></ak-form-text-component>`
        )) as AkFormTextComponent;

        const input = el.input;
        setTimeout(() => { input.value = "foo"; input.dispatchEvent(new InputEvent('input', { data: 'a' })) });
        const { detail } = await oneEvent(el, 'ak-change')
        expect(detail.value).to.equal('foo');
    });

    it("forward invalid values correctly", async () => {
        const el = (await fixture(
            `<ak-form-text-component name="test-component"></ak-form-text-component>`
        )) as AkFormTextComponent;

        const input = el.input;
        setTimeout(() => { input.value = "z"; input.dispatchEvent(new InputEvent('invalid')) });
        const { detail } = await oneEvent(el, 'ak-invalid')
        expect(detail.value).to.equal("z");
    });

});
