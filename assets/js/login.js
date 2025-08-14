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
    
    document.getElementById('error').textContent = '';
    
    if (!email || !password) {
        document.getElementById('error').textContent = 'Please fill in all fields';
        return;
    }
    
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
