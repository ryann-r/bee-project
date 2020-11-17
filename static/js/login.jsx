function Login() {
    $('#regions_div')[0].style.display='none';
    const [formData, setFormData] = React.useState({ username: '', password: '' });

    const handleChange = (event) => {
        const value = event.target.value;
        setFormData({
            ...formData,
            [event.target.name]: value
        });
    }
    // on submit button click, send formData to login route, reset form to empty strings
    // window.location reroutes based on server response: successful login reroutes to garden page,
    // unsuccessful login reroutes to login page
    const handleSubmit = (event) => {
        console.log(formData)
        event.preventDefault();
        fetch('/api/login', {
                method: 'POST',
                body: JSON.stringify( formData ),
                headers: { 'Content-Type': 'application/json' }
        })
        .then(response => response.json())
        .then(data => {
            if (data.response == 'success') {
                window.location = '/garden';
            } else {
                window.location = '/login';
            }
        });
    }
    return (
        <form>
        <input value={formData.username}
            onChange={handleChange}
            name='username'
            type='text'
            placeholder='Username' 
            />
            <input value={formData.password}
            onChange={handleChange}
            type="password"
            name="password"
            placeholder="Password"
            />
            <button disabled={!formData.username || !formData.password}
            onClick={handleSubmit} type="submit">Submit</button>
        </form>
    );  
}