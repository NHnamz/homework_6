class InputCommon {
    container = document.createElement("div")
    label = document.createElement("label")
    input = document.createElement("input")
    errMessage = document.createElement("div")
    successMessage = document.createElement("div")
    Message = document.createElement("div")

    constructor(label, inputType, placeholder, name) {
        this.label.innerHTML = label
        this.label.htmlFor = name
        this.input.type = inputType
        this.input.classList.add('input');
        this.input.placeholder = placeholder
        this.input.name = name

        this.container.appendChild(this.label)
        this.container.appendChild(this.input)
        this.container.appendChild(this.errMessage)
    }

    getValue = () => {
        return this.input.value;
    }

    setErrorMessage = (errMessage) => {
        this.errMessage.innerHTML = errMessage
        this.errMessage.classList.add('error');
        this.input.classList.remove('input-success');
        this.input.classList.add('input-error');
    }

    setSuccessMessage = (successMessage) => {
        this.successMessage.innerHTML = successMessage
        this.errMessage.classList.remove('error');
        this.input.classList.remove('input-error');
        this.input.classList.add('input-success');
    }
    setMessage = (Message) => {
        this.Message.innerHTML = Message
        this.errMessage.classList.remove('error');
        this.input.classList.remove('input-error');
    }

}

export { InputCommon }