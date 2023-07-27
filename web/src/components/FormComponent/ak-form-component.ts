import { customElement } from "lit/decorators.js";
import AKFormComponentBase from "./AkFormComponentBase";

/**
 *
 * This is a genetic container for our FormComponent. It exists mostly so that we can test the
 * FormComponent code in isolation. It is probably not usable by itself, and so will remain poorly
 * documented.
 *
 */

@customElement("ak-form-component")
export class AkFormComponent extends AKFormComponentBase {}

export default AkFormComponent;
    
