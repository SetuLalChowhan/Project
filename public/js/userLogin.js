const form = document.querySelector('form');
  const emailError = document.querySelector('.email.error');
  const passwordError = document.querySelector('.password.error');
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    // reset errors
   
    // get values
    const email = form.email.value;
    const password = form.password.value;
    try {
      const res = await fetch('/userLogin', { 
        method: 'POST', 
        body: JSON.stringify({ email, password }),
        headers: {'Content-Type': 'application/json'}
      });
      const data = await res.json({});
      if (data.errors) {
        passwordError.textContent = data.errors.password || data.errors.email;
      }
      if (data.user) {
        location.assign('/userDashboard');
        // console.log(data)
      }
    }
    catch (err) {
      console.log(err);
    }
  });

  console.log("setu")