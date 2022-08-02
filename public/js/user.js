const form = document.querySelector("form");
const UsernameError = document.querySelector(".username.error");
const emailError = document.querySelector(".email.error");
const PhoneError = document.querySelector(".Phone.error");
const BankError = document.querySelector(".Bank.error");
const AddressError = document.querySelector(".Address.error");
const passwordError = document.querySelector(".password.error");
const ConfirmError = document.querySelector(".Confirm.error");
form.addEventListener("submit", async (e) => {
    e.preventDefault();
    // reset errors
    // emailError.textContent = '';
    // passwordError.textContent = '';
    // get values

    const username = form.username.value;
    const email = form.email.value;
    const PhoneNumber = form.PhoneNumber.value;
    const BankAcc = form.BankAcc.value;
    const Address = form.Address.value;
    const password = form.password.value;
    const confirmPassword = form.confirmPassword.value;

    try {
        const res = await fetch("/userRegiistration", {
            method: "POST",
            enctype: "multipart/form-data",
            body: JSON.stringify({
                username,
                email,
                PhoneNumber,
                BankAcc,
                Address,
                password,
                confirmPassword,
            }),

            headers: { "Content-Type": "application/json" },
        });
        const data = await res.json();
        if (data.errors) {
            UsernameError.textContent = data.errors.username;
            emailError.textContent = data.errors.email;
            PhoneError.textContent = data.errors.PhoneNumber;
            BankError.textContent = data.errors.BankAcc;
            AddressError.textContent = data.errors.Address;
            passwordError.textContent = data.errors.password;
            ConfirmError.textContent = data.errors.confirmPassword;
        }
        if (data.user) {
            location.assign("/userDashboard");
        }
    } catch (err) {
        console.log(err);
    }
});
