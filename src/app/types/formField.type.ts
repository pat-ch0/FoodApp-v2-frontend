import { ValidatorFn } from "@angular/forms";

export type FormFiels = {
    name: string;
    label: string;
    type: string;
    validators: ValidatorFn[];
}