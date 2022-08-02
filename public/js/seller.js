const form = document.querySelector("form");
const emailError = document.querySelector(".email.error");
const BusinessError = document.querySelector(".Business.error");
const PhoneError = document.querySelector(".Phone.error");
const NIDError = document.querySelector(".NID.error");
const BankError = document.querySelector(".Bank.error");
const TinError = document.querySelector(".Tin.error");
const AddressError = document.querySelector(".Address.error");
const PickError = document.querySelector(".Pick.error");
const passwordError = document.querySelector(".password.error");
const ConfirmError = document.querySelector(".Confirm.error");
form.addEventListener("submit", async (e) => {
    e.preventDefault();
    // reset errors
    // emailError.textContent = '';
    // passwordError.textContent = '';
    // get values
    const email = form.email.value;
    
    const BusinessName = form.BusinessName.value;
    const PhoneNumber = form.PhoneNumber.value;
    const NIDNumber = form.NIDNumber.value;
    const BankAcc = form.BankAcc.value;
    const TinNumber = form.TinNumber.value;
    const Address = form.Address.value;
    const PickUpAddress = form.PickUpAddress.value;
    const password = form.password.value;
    const confirmPassword = form.confirmPassword.value;
    

    try {
        const res = await fetch("/sellerRegiistration", {
            method: "POST",
            enctype:"multipart/form-data",
            body: JSON.stringify({
                email,
                BusinessName,
                PhoneNumber,
                NIDNumber,
                BankAcc,
                TinNumber,
                Address,
                PickUpAddress,
                password,
                confirmPassword, 
            }),

            
            headers: { "Content-Type": "application/json" },
        });
        const data = await res.json();
        if (data.errors) {
            emailError.textContent = data.errors.email;
            BusinessError.textContent = data.errors.BusinessName;
            PhoneError.textContent = data.errors.PhoneNumber;
            NIDError.textContent = data.errors.NIDNumber;
            BankError.textContent = data.errors.BankAcc;
            TinError.textContent = data.errors.TinNumber;
            AddressError.textContent = data.errors.Address;
            PickError.textContent = data.errors.PickUpAddress;
            passwordError.textContent = data.errors.password;
            ConfirmError.textContent = data.errors.confirmPassword;
        }
        if (data.seller) {
            location.assign("/sellerDashboard");
        }
    } catch (err) {
        console.log(err);
    }
});



