import { AbstractControl, ValidationErrors, FormControl } from "@angular/forms";

export function rutValidator(control: FormControl): { [key: string]: any} | null {
    let inputControl = control.value.replace(".", "").replace("-", "");
    let inputRut = inputControl.slice(0, -1).replace(".", "").replace("-", "");
    var inputDV = inputControl.slice(-1);

    let m = 0
    let s = 1;
    let t = inputRut;
    let res = 0;
    for (; t; t = Math.floor(t / 10)) {
        s = (s + t % 10 * (9 - m++ % 6)) % 11;
        res = s ? s - 1 : 11;
    }

    if (inputDV == res) {
        return null;
    }    
    if (res == 11 && (inputDV == 'K' || inputDV == 'k')) {        
        return null;
    }
        
    return { 'rutValidator' : true };
}
