(function () {
    var $form = document.querySelector('#contact-form');
    var $emailInput = document.querySelector('#contact-email');
    var $phoneInput = document.querySelector('#contact-tel');
    var $textInput = document.querySelector('#contact-text');

    function validateEmail() {
        var value = $emailInput.value;
        if (!value) {
            showErrorMessage($emailInput, 'Email is a required field.');
            return false;
        }

        if (value.indexOf('@') === -1 || value.indexOf('.') === -1) {
            showErrorMessage($emailInput, 'You must enter a valid email address.');
            return false;
        }

        showErrorMessage($emailInput, null);
        return value;
    }

    function validateTextInput() {
        var value = $textInput.value;
        if (value.length < 10) {
            showErrorMessage($textInput, 'Please enter at least 10 characters in message.');
            return false;
        };

        showErrorMessage($textInput, null);
        return value;
    }

    function vailidatePhone() {
        var value = $phoneInput.value;
        if (value.length !== 12 || value.indexOf('-') !== 3){
            showErrorMessage($phoneInput, `Please enter as '###-###-####'.`);
            return false;
        }
        
        showErrorMessage($phoneInput, null);
        return value;
    }

    function validateForm() {
        var isValidEmail = validateEmail();
        var isValidText = validateTextInput();
        var isValidPhone = vailidatePhone();
        return isValidEmail && isValidText && isValidPhone;
    };

    function showErrorMessage($input, message) {
        var $container = $input.parentElement;

        // Removes error message
        var error = $container.querySelector('.error-message');
        if (error) {
            $container.removeChild(error);
        }

        // Adds error message to proper field
        if (message) {
            var error = document.createElement('div');
            error.classList.add('error-message');
            error.innerText = message;
            $container.appendChild(error);
        };
    };
    $emailInput.addEventListener('input', validateEmail);
    $phoneInput.addEventListener('input', vailidatePhone);
    $textInput.addEventListener('input', validateTextInput);
    $form.addEventListener('submit', (e) => {
        e.preventDefault(); // Do not submit to the server
        if (validateForm()) {
            // Delays the alert so showErrorMessage can be removed 1st
            setTimeout(function () {
                alert('Success!');
            }, 100);
        };
    });
})();
