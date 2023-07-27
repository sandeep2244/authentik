import { expect, fixture } from "@open-wc/testing";

import { html } from "lit";

import AkFormRadioComponent from "./ak-form-radio-component";
import "./ak-form-radio-component";

const optionsWithText = [
    { label: "KitKat", value: "kit-kat", description: "Big in Japan" },
    { label: "Toblerone", value: "tobbblerrrone", description: "Unpronouncable" },
    {
        label: "Ritter Sport",
        value: "ritter-sport",
        description: "Really? When there's better chocolate out there?",
    },
];

describe("Radio input component", () => {
    it("has the right value after clicking on an input", async () => {
        const el = (await fixture(
            // prettier-ignore
            html`<ak-form-radio-component .options=${optionsWithText} name="test-component"></ak-form-radio-component>`
        )) as AkFormRadioComponent<string>;
        el.inputs[1].click();
        expect(el.value).to.equal("tobbblerrrone");
    });
});
