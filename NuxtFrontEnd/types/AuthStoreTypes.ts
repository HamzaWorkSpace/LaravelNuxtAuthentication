    type User={
        id:number;
        name:string;
        email:string;
    }


    type Credentials={
        email:string;
        password:string;
    }

    type RegistrationInfo={
        name:string;
        email:string;
        password:string;
        password_confirmation:string;
        //SHOULD WRITE COMPLETE WORD  password_confirmation AS IN LARAVEL IT IS USED TO GET DATA FROM HTML NAME PROPERTY
    }


    type ErrMsg = {
        message:string;
    }