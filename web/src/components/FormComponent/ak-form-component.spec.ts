import { expect, fixture, html } from "@open-wc/testing";

import AkFormComponent from "./ak-form-component";
import "./ak-form-component";

describe("Base input component", () => {
    it("is initialized as expected", async () => {
        // Note that the next two lines do not conflict; the first one is a type declaration that
        // will be erased with compilation. The next line asserts that the el has AkFormComponent as
        // a constructor after compilation.
        const el = (await fixture(
            `<ak-form-component name="test-component"></ak-form-component>`
        )) as AkFormComponent;
        expect(el instanceof AkFormComponent).to.be.true;
        expect(el.disabled).to.be.false;
        expect(el.required).to.be.false;
        expect(el.name).to.equal("test-component");
        expect(el.errorMessages).to.eql([]);
    });

    it("understands the required flag", async () => {
        // Note that the next two lines do not conflict; the first one is a type declaration that
        // will be erased with compilation. The next line asserts that the el has AkFormComponent as
        // a constructor after compilation.
        const el = (await fixture(
            `<ak-form-component required name="test-component"></ak-form-component>`
        )) as AkFormComponent;

        // This is the delta
        expect(el.required).to.be.true;

        expect(el instanceof AkFormComponent).to.be.true;
        expect(el.disabled).to.be.false;
        expect(el.name).to.equal("test-component");
        expect(el.errorMessages).to.eql([]);
    });
    
    it("has the expected error messages", async () => {
        // Note that the next two lines do not conflict; the first one is a type declaration that
        // will be erased with compilation. The next line asserts that the el has AkFormComponent as
        // a constructor after compilation.
        const messages = ["Error-1"];
        const el = (await fixture(
            html`<ak-form-component name="test-component" .errorMessages=${messages}></ak-form-component>`
        )) as AkFormComponent;
        // This is the delta
        expect(el.errorMessages).to.eql(messages);
        const errors = el.shadowRoot?.querySelector(".error-messages p") as HTMLElement;
        expect(errors).to.not.be.undefined;
        const errorNodes = Array.from(errors.childNodes).filter(x => x.nodeType === Node.TEXT_NODE) as Text[];
        expect(errorNodes[0].wholeText).to.equal(messages[0]);

        expect(el instanceof AkFormComponent).to.be.true;
        expect(el.disabled).to.be.false;
        expect(el.required).to.be.false;
        expect(el.name).to.equal("test-component");
        
    });
});
