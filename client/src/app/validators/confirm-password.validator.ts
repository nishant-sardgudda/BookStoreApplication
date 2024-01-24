import { FormGroup } from "@angular/forms"

export const confirmPasswordValidator = (password : string , passwordToMatch : string)=>{
    return (formGroup : FormGroup)=>{
        let pwd = formGroup.controls[password];
        let pwdToMatch = formGroup.controls[passwordToMatch];
        if(pwdToMatch.errors && !pwdToMatch.errors['confirmPasswordValidator']){
            return;
        }
        if(pwd.value !== pwdToMatch.value){
            pwdToMatch.setErrors({confirmPasswordValidator : true});
        }else{
            pwdToMatch.setErrors(null);
        }
    }
}