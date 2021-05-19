const signupform = document.querySelector('.signupform');
API_URL = 'http://localhost:5000/signup'


signupform.addEventListener('submit',(event)=>{
    event.preventDefault();
    const formData = new FormData(signupform);
    const username = formData.get('username');
    const password = formData.get('password');
    
    const user = {
        username,
        password
    };

    fetch(API_URL,{
        method: 'POST',
        body: JSON.stringify(user),
        headers:{
            'content-type': 'application/json'
        }
    });
});
