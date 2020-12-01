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
        <ReactBootstrap.Container className="background-image">
            {/* <ReactBootstrap.Row> */}
            {/* GET SVG ICON */}
            <div className="illustration icon ion-ios-locked-outline"></div>
            <ReactBootstrap.Form className="login">
                <ReactBootstrap.Form.Group controlId="login.Username">
                    {/* <ReactBootstrap.Form.Label>Username</ReactBootstrap.Form.Label> */}
                    <ReactBootstrap.Form.Control
                        type="text"
                        name="username"
                        placeholder="Username"
                        onChange={handleChange}
                        value={formData.username} />
                </ReactBootstrap.Form.Group>

                <ReactBootstrap.Form.Group controlId="login.Password">
                    {/* <ReactBootstrap.Form.Label>Password</ReactBootstrap.Form.Label> */}
                    <ReactBootstrap.Form.Control
                        type="password"
                        name="password"
                        placeholder="Password"
                        onChange={handleChange}
                        value={formData.password} />
                </ReactBootstrap.Form.Group>

                <ReactBootstrap.Button
                    disabled={!formData.username || !formData.password}
                    onClick={handleSubmit}
                    variant="outline-light"
                    type="submit">Log In</ReactBootstrap.Button>
            </ReactBootstrap.Form>
            {/* </ReactBootstrap.Row> */}
        </ReactBootstrap.Container>
    );  
}