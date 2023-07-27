import { expect, fixture, oneEvent } from "@open-wc/testing";

import { AkFormNumberComponent } from "./ak-form-number-component";
import "./ak-form-number-component";

describe("Number input component", () => {
    it("handles change events as expected", async () => {
        const el = (await fixture(
            `<ak-form-number-component name="test-component"></ak-form-number-component>`
        )) as AkFormNumberComponent;

        const input = el.input;
        setTimeout(() => { input.value = "3"; input.dispatchEvent(new InputEvent('change')) });
        const { detail } = await oneEvent(el, 'ak-change')
        expect(detail.value).to.equal(3);
    });

    it("handles input events as expected", async () => {
        const el = (await fixture(
            `<ak-form-number-component name="test-component"></ak-form-number-component>`
        )) as AkFormNumberComponent;

        const input = el.input;
        setTimeout(() => { input.value = "13"; input.dispatchEvent(new InputEvent('input')) });
        const { detail } = await oneEvent(el, 'ak-change')
        expect(detail.value).to.equal(13);
    });

    it("understands bad inputs are zero", async () => {
        const el = (await fixture(
            `<ak-form-number-component name="test-component"></ak-form-number-component>`
        )) as AkFormNumberComponent;

        const input = el.input;
        setTimeout(() => { input.value = "z"; input.dispatchEvent(new InputEvent('input')) });
        const { detail } = await oneEvent(el, 'ak-change')
        expect(detail.value).to.equal(0);
    });
    
    it("Does max correctly", async() => {
        const el = (await fixture(
            `<ak-form-number-component name="test-component" max=${4} disabled></ak-form-number-component>`
        )) as AkFormNumberComponent;

        const input = el.input;
        setTimeout(() => { input.value = "5"; input.dispatchEvent(new InputEvent('input')) });
        const { detail } = await oneEvent(el, 'ak-change')
        expect(detail.value).to.equal(4);
    });
    
    it("Does min correctly", async() => {
        const el = (await fixture(
            `<ak-form-number-component name="test-component" min=${4} disabled></ak-form-number-component>`
        )) as AkFormNumberComponent;

        const input = el.input;
        setTimeout(() => { input.value = "3"; input.dispatchEvent(new InputEvent('input')) });
        const { detail } = await oneEvent(el, 'ak-change')
        expect(detail.value).to.equal(4);
    });

    it("forward invalid values correctly", async () => {
        const el = (await fixture(
            `<ak-form-number-component name="test-component"></ak-form-number-component>`
        )) as AkFormNumberComponent;

        const input = el.input;
        setTimeout(() => { input.value = "z"; input.dispatchEvent(new InputEvent('invalid')) });
        const { detail } = await oneEvent(el, 'ak-invalid')
        expect(detail.value).to.equal(0);
    });

    it("understands decimals inputs", async () => {
        const el = (await fixture(
            `<ak-form-number-component inputmode="decimal" name="test-component"></ak-form-number-component>`
        )) as AkFormNumberComponent;

        const input = el.input;
        setTimeout(() => { input.value = "3.1415927"; input.dispatchEvent(new InputEvent('input')) });
        const { detail } = await oneEvent(el, 'ak-change')
        expect(detail.value).to.equal(3);
    });

    
});
