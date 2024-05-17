//ON  SIGNUP
const signupElements = {
    name: signup_form.querySelector('input[name="Name"]'),
    email: signup_form.querySelector('input[name="Email"]'),
    phoneNo: signup_form.querySelector('input[name="PhoneNumber"]'),
    password1: signup_form.querySelector('input[name="Password1"]'),
    password2: signup_form.querySelector('input[name="Password2"]'),
    signup_btn: signup_form.querySelector('input[type="submit"]'),
    alert1: signup_form.querySelector('#alert1'),
    alert2: signup_form.querySelector('#alert2'),
    alert3: signup_form.querySelector('#alert3'),
}

signupElements.signup_btn.addEventListener('click', on_Signup);
async function on_Signup(e) {
    try {
        if (signup_form.checkValidity()) {
            e.preventDefault();
            if (signupElements.password1.value === signupElements.password2.value) {
                const data = {
                    name: signupElements.name.value,
                    email: signupElements.email.value,
                    phonenumber: signupElements.phoneNo.value,
                    imageUrl:Math.floor(Math.random() * 1000),
                    password: signupElements.password1.value
                }
               await axios.post("user/signup", data);

                signup_form.reset();
                helperFunctions.alertFunction(signupElements.alert3);
                setTimeout(() => {
                    window.location.href = "/user";
                }, 3000)
            } else {
                helperFunctions.alertFunction(signupElements.alert2);
            }
        }

    } catch (error) {
        if (error.response && error.response.status === 409) {
            e.preventDefault();
            helperFunctions.alertFunction(signupElements.alert1);
        } else {
            alert("Something went wrong - signup agin")
            console.error("An error occurred:", error);
        }
    }
}
