// Event listener for the signup button
document.getElementById('signupbtn').addEventListener('click', function() {
    const username = document.getElementById('signupname').value;
    const email = document.getElementById('signupemail').value;
    const password = document.getElementById('signuppass').value;
    
    // Clear any previous error messages
    const errorElement = document.getElementById('error');
    if (errorElement) {
        errorElement.textContent = '';
    }
    
    // Validate input fields
    if (!username || !email || !password) {
        if (errorElement) {
            errorElement.textContent = 'Please fill in all fields';
        }
        return;
    }
    
    // Send signup request
    fetch('/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: username,
            email: email,
            password: password
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success || (data.msg && data.msg.includes('success'))) {
            // Store username for success page
            document.cookie = `username=${encodeURIComponent(username)}; path=/`;
            // Redirect to success page
            window.location.href = data.redirect || '/signup-success';
        } else if (data.error) {
            if (errorElement) {
                errorElement.textContent = data.error;
            }
        } else {
            if (errorElement) {
                errorElement.textContent = 'Signup failed';
            }
        }
    })
    .catch(error => {
        console.error('Error:', error);
        if (errorElement) {
            errorElement.textContent = 'An error occurred during signup';
        }
    });
});

// Event listener for the login button  
document.getElementById('loginbtn').addEventListener('click', function() {
    const email = document.getElementById('loginemail').value;
    const password = document.getElementById('loginpass').value;
    
    // Clear any previous error messages
    const errorElement = document.getElementById('error');
    if (errorElement) {
        errorElement.textContent = '';
    }
    
    // Validate input fields
    if (!email || !password) {
        if (errorElement) {
            errorElement.textContent = 'Please fill in all fields';
        }
        return;
    }
    
    // Send login request
    fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: email,
            password: password
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.msg === 'login successful') {
            window.location.href = '/todo';
        } else if (data.error) {
            if (errorElement) {
                errorElement.textContent = data.error;
            }
        } else {
            if (errorElement) {
                errorElement.textContent = 'Login failed - please check your credentials';
            }
        }
    })
    .catch(error => {
        console.error('Login error:', error);
        if (errorElement) {
            errorElement.textContent = 'An error occurred during login';
        }
    });
});

// Handle Enter key press in input fields
document.addEventListener('DOMContentLoaded', function() {
    // Add enter key handlers for signup form
    const signupInputs = ['signupname', 'signupemail', 'signuppass'];
    signupInputs.forEach(id => {
        document.getElementById(id).addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                document.getElementById('signupbtn').click();
            }
        });
    });
    
    // Add enter key handlers for login form
    const loginInputs = ['loginemail', 'loginpass'];
    loginInputs.forEach(id => {
        document.getElementById(id).addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                document.getElementById('loginbtn').click();
            }
        });
    });
});