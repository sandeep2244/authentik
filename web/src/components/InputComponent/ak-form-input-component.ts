import { customElement } from "lit/decorators.js";
import { AkInputComponent } from "./InputComponent";

/**
 *
 * This is a genetic container for our FormComponent. It exists mostly so that we can test the
 * FormComponent code in isolation. It is probably not usable by itself, and so will remain poorly
 * documented.
 *
 */

@customElement("ak-form-input-component")
export class AkFormInputComponent extends AkInputComponent {}

export default AkFormInputComponent;
    

