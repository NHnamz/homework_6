import { InputCommon } from "../common/inputCommon.js";
import { setScreen } from "../index.js";
import { Register } from "./register.js";

class Login {
  container = document.createElement("div");
  title = document.createElement("h2");

  formlogin = document.createElement("form");
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

  actionContainer = document.createElement("div");
  btnLogin = document.createElement("button");
  btnRegister = document.createElement("button");

  constructor() {
    this.title.innerHTML = "Login";
    this.title.classList.add('title');

    this.container.appendChild(this.formlogin);
    this.formlogin.classList.add('formlogin');

    this.formlogin.appendChild(this.title);

    this.formlogin.appendChild(this.inputEmail.container);
    this.inputEmail.container.classList.add('text');
    
    this.formlogin.appendChild(this.inputPassword.container);
    this.inputPassword.container.classList.add('text');

    this.btnLogin.innerHTML = "Login";
    this.btnLogin.classList.add('button');

    this.btnRegister.innerHTML = "Go to register";
    this.btnRegister.classList.add('button');

    this.btnLogin.addEventListener("click", this.handleLogin);
    this.btnRegister.addEventListener("click", this.handleRedirectRegister);

    this.formlogin.appendChild(this.btnLogin);
    this.formlogin.appendChild(this.btnRegister);
  }

  handleRedirectRegister = (e) => {
    e.preventDefault();
    const registerScreen = new Register();
    setScreen(registerScreen.container);
  };

  handleLogin = (e) => {
    e.preventDefault();

    // Validation
    const emailValue = this.inputEmail.getValue();
    const passwordValue = this.inputPassword.getValue();
    const regex_email = /^\w+@[a-zA-Z]{3,}\.com$/i;

    if (!emailValue) {
      this.inputEmail.setErrorMessage("Email cannot be empty")
  } else if (emailValue.match(regex_email)){
      this.inputEmail.setErrorMessage("")
      this.inputEmail.setMessage("")
  }else {
      this.inputEmail.setErrorMessage("Email wrong")
  }

    if (!passwordValue) {
      this.inputPassword.setErrorMessage("password cannot be empty")
  } else {
    this.inputPassword.setErrorMessage("")
    this.inputPassword.setMessage("")
  }


    // Login
    firebase
      .auth()
      .signInWithEmailAndPassword(emailValue, passwordValue)
      .then((userCredential) => {
        // Signed in
        var user = userCredential.user;
        // ...
        console.log(`Đăng nhập thành công`);
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        alert("wrong password or email")

        console.log(errorMessage);
      });
  };
}

export { Login };
