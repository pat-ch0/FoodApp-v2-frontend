import { ValidatorFn } from "@angular/forms";

export type FormField = {
    name: string;
    label: string;
    type: string;
    validators: ValidatorFn[];
}