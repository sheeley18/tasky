// Event listener for the signup button
document.getElementById('signupbtn').addEventListener('click', function() {
    const username = document.getElementById('signupname').value;
    const email = document.getElementById('signupemail').value;
    const password = document.getElementById('signuppass').value;
    
    // Clear any previous error messages
    document.getElementById('error').textContent = '';
    
    // Validate input fields
    if (!username || !email || !password) {
        document.getElementById('error').textContent = 'Please fill in all fields';
        return;
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        document.getElementById('error').textContent = 'Please enter a valid email address';
        return;
    }
    
    // Validate password length
    if (password.length < 6) {
        document.getElementById('error').textContent = 'Password must be at least 6 characters long';
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
        if (data.success) {
            // Redirect to success page
            window.location.href = data.redirect;
        } else if (data.error) {
            document.getElementById('error').textContent = data.error;
        }
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('error').textContent = 'An error occurred during signup';
    });
});

// Event listener for the login button
document.getElementById('loginbtn').addEventListener('click', function() {
    const email = document.getElementById('loginemail').value;
    const password = document.getElementById('loginpass').value;
    
    // Clear any previous error messages
    document.getElementById('error').textContent = '';
    
    // Validate input fields
    if (!email || !password) {
        document.getElementById('error').textContent = 'Please fill in all fields';
        return;
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        document.getElementById('error').textContent = 'Please enter a valid email address';
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
            document.getElementById('error').textContent = data.error;
        }
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('error').textContent = 'An error occurred during login';
    });
});

// Optional: Allow Enter key to submit forms
document.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        // Check if we're in signup form or login form
        const signupVisible = document.getElementById('chk').checked;
        
        if (signupVisible) {
            // If signup form is visible, trigger signup
            document.getElementById('signupbtn').click();
        } else {
            // If login form is visible, trigger login
            document.getElementById('loginbtn').click();
        }
    }
});

// Optional: Clear error messages when user starts typing
document.getElementById('signupname').addEventListener('input', clearErrors);
document.getElementById('signupemail').addEventListener('input', clearErrors);
document.getElementById('signuppass').addEventListener('input', clearErrors);
document.getElementById('loginemail').addEventListener('input', clearErrors);
document.getElementById('loginpass').addEventListener('input', clearErrors);

function clearErrors() {
    document.getElementById('error').textContent = '';
}
