window.onload = function () {
    let loginForm = document.getElementById('login-form');
    loginForm.style.display = "none";
    let personalForm = document.getElementById('personal-form');
    personalForm.style.display = "none";

    let fullName = document.getElementById('full-name');
    let yourUserName = document.getElementById('username');
    let eMail = document.getElementById('email');
    let passWord = document.getElementById('password');
    let repeatPas = document.getElementById('repeat-password');
    let agreeCheck = document.getElementById('agree');
    let popupOpen = document.querySelector('.popup-container');

    const saveClientsData = function () {
        const userInfo = {
            name: fullName.value,
            username: yourUserName.value,
            email: eMail.value,
            password: passWord.value,
        }

        let clientsArray = [];
        let clients = localStorage.getItem('clients')
        if (clients) {
            clientsArray = JSON.parse(clients);
        }

        clientsArray.push(userInfo);
        localStorage.setItem('clients', JSON.stringify(clientsArray));
    };

    const validateForm = function () {
        let hasError = document.querySelectorAll('.hasError');
        for (let i = 0; i < hasError.length; i++) {
            hasError[i].classList.remove('hasError');
        }
        if (!fullName.value.match(/^[A-Za-z]+\s*$/)) {
            fullName.closest('.input-wrapper').classList.add('hasError');
        }
        if (!yourUserName.value.match(/^[A-Za-z0-9_-]+$/)) {
            yourUserName.closest('.input-wrapper').classList.add('hasError');
        }
        if (!eMail.value.match(/^\w+([\.-]?\w+)*@[a-zA-Z_]+(\.[a-zA-Z]{2,6})+$/)) {
            eMail.closest('.input-wrapper').classList.add('hasError');
        }
        if (!passWord.value.match(/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.#+^])[A-Za-z\d@$!%*?&.#+^]{8,}$/)) {
            passWord.closest('.input-wrapper').classList.add('hasError');
        }
        if (passWord.value !== repeatPas.value) {
            repeatPas.closest('.input-wrapper').classList.add('hasError');
        }
        if (!agreeCheck.checked) {
            agreeCheck.closest('.input-wrapper').classList.add('hasError');
        }
        hasError = document.querySelectorAll('.hasError');
        if (!hasError.length) {
            popupOpen.style.display = "block";
            saveClientsData();
        }
    };

    document.getElementById('button').onclick = validateForm;

    const prepareLoginForm = function () {
        popupOpen.style.display = "none";
        document.getElementById('reg-form').style.display = "none";
        loginForm.style.display = "block";
        loginForm.style.marginTop = "55px";
    };

    document.getElementById('popup-button').onclick = prepareLoginForm;
    document.getElementById('link').onclick = prepareLoginForm;

    document.getElementById('login-link').onclick = function () {
        window.location.reload();
    };

    const clearFormErrors = function () {
        let hasError = document.querySelectorAll('.hasError');
        for (let i = 0; i < hasError.length; i++) {
            hasError[i].classList.remove('hasError');
        }
    }
    let loginUsername = document.getElementById('login-username');
    let loginPassword = document.getElementById('login-password');
    let loginErrorInput = function () {
        loginUsername.closest('.input-wrapper').classList.add('hasError');
    }

    let passwordErrorInput = function () {
        loginPassword.closest('.input-wrapper').classList.add('hasError');
    }

    let getClientsData = function () {
        let clientsArray = JSON.parse(localStorage.getItem('clients'));
        let username = document.getElementById('login-username').value;
        let password = document.getElementById('login-password').value;
        let clientFound = clientsArray.find(function (object) {
            return object.username === username;
        });
        if (!clientFound) {
            loginErrorInput();
        }
        if (clientFound?.password !== password) {
            passwordErrorInput();
        }
        return clientFound?.name;
    };

    document.getElementById('login-button').onclick = function () {
        clearFormErrors();
        if (!loginUsername.value) {
            loginErrorInput();
        }
        if (!loginPassword.value) {
            passwordErrorInput();
        }
        const name = getClientsData();
        let hasError = document.querySelectorAll('.hasError');
        if (!hasError.length) {
            personalForm.style.display = "block";
            personalForm.style.marginTop = "250px";
            document.getElementById('personal-form-title').style.textAlign = "center";
            loginForm.style.display = "none";
            return;
        }
        document.getElementById('personal-form-title').innerText = `Welcome, ${name}!`;
    };

    document.getElementById('personal-area-button').onclick = function () {
        window.location.reload();
    };
}