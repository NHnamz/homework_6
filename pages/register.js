import { InputCommon } from '../common/inputCommon.js'
import { setScreen } from '../index.js'
import { Login } from './login.js'

class Register {
    container = document.createElement("div");
    title = document.createElement("h2");

    formregister = document.createElement("form");
    inputName = new InputCommon(
        "Name: ", 
        "name", 
        "Enter your name", 
        "inputName"
        );
    inputEmail = new InputCommon(
        "Email: ", 
        "email", 
        "Enter your email", 
        "inputEmail"
        );
    inputPassword = new InputCommon(
        "Password: ", 
        "password", 
        "Enter your password", 
        "inputPassword"
        );
    inputConfirmPassword = new InputCommon(
        "Confirm password: ", 
        "password", 
        "Enter your confirm password", 
        "inputConfirmPassword"
        );

    actionContainer = document.createElement("div");
    btnLogin = document.createElement("button");
    btnRegister = document.createElement("button");

    constructor() {
        this.title.innerHTML = "Register"
        this.title.classList.add('title');

        this.container.appendChild(this.formregister)
        this.formregister.classList.add('formregister');

        this.formregister.appendChild(this.title)
        this.formregister.appendChild(this.inputName.container)
        this.inputName.container.classList.add('text');

        this.formregister.appendChild(this.inputEmail.container)
        this.inputEmail.container.classList.add('text');

        this.formregister.appendChild(this.inputPassword.container)
        this.inputPassword.container.classList.add('text');

        this.formregister.appendChild(this.inputConfirmPassword.container)
        this.inputConfirmPassword.container.classList.add('text');

        this.btnLogin.innerHTML = "Go to login"
        this.btnLogin.classList.add('button');

        this.btnRegister.innerHTML = "Register"
        this.btnRegister.classList.add('button');

        this.btnLogin.addEventListener("click", (e) => {
            e.preventDefault()
            const loginScreen = new Login()
            setScreen(loginScreen.container)
        })
        this.btnRegister.addEventListener("click", this.handleRegister)

        this.formregister.appendChild(this.btnLogin)
        this.formregister.appendChild(this.btnRegister)
    }

    handleRegister = (e) => {
        e.preventDefault()

        // Get value
        const nameValue = this.inputName.getValue();
        const emailValue = this.inputEmail.getValue();
        const passwordValue = this.inputPassword.getValue();
        const confirmPasswordValue = this.inputConfirmPassword.getValue();
        const regex_email = /^\w+@[a-zA-Z]{3,}\.com$/i;
        const regex_name = /^[a-zA-Z!@#\$%\^\&*\)\(+=._-]{2,}$/g;
        // Check email and password is empty

        if (!nameValue) {
            this.inputName.setErrorMessage("Name cannot be empty")
        } else if (nameValue.match(regex_name)){
            this.inputName.setErrorMessage("")
            this.inputName.setSuccessMessage("")
        }else {
            this.inputName.setErrorMessage("Name wrong")
        }

        if (!emailValue) {
            this.inputEmail.setErrorMessage("Email cannot be empty")
        } else if (emailValue.match(regex_email)){
            this.inputEmail.setErrorMessage("")
            this.inputEmail.setSuccessMessage("")
        }else {
            this.inputEmail.setErrorMessage("Email wrong")
        }
   
        if (!passwordValue) {
            this.inputPassword.setErrorMessage("Password cannot be empty")
        } else if (passwordValue.length < 7) {
            this.inputPassword.setErrorMessage("Password length must be greater 6!")
        } else {
            this.inputPassword.setErrorMessage("")
            this.inputPassword.setSuccessMessage("")
        }

        if (!confirmPasswordValue) {
            this.inputConfirmPassword.setErrorMessage("Please enter the password again")
        } else if (confirmPasswordValue !== passwordValue) {
            this.inputConfirmPassword.setErrorMessage("Confirm password not matched!")
        } else {
            this.inputConfirmPassword.setErrorMessage("")
            this.inputConfirmPassword.setSuccessMessage("")
        }


        // Register
        firebase.auth().createUserWithEmailAndPassword(emailValue, passwordValue)
            .then((userCredential) => {
                // Signed in 
                var user = userCredential.user;
                // ...
                console.log(`User ${email} is created`);
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                // ..
                console.log(errorMessage);
            });
    }
}

export { Register }