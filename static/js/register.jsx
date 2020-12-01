function Register() {
    $('#regions_div')[0].style.display='none';
    const [formData, setFormData] = React.useState({
        username: '',
        fname: '',
        password: '',
        confirm_password: '',
        user_region: ''
    });

    const handleChange = (event) => {
        const value = event.target.value;
        setFormData({
            ...formData,
            [event.target.name]: value
        });
    }
    // on click of submit button, send formData to register route, reset formData to empty strings
    const handleSubmit = (event) => {
        event.preventDefault();
        fetch('/api/register', {
                method: 'POST',
                body: JSON.stringify( formData ),
                headers: { 'Content-Type': 'application/json' },
        })
        .then(response => response.json())
        .then(data => {
            if (data.response == 'success') {
                window.location = '/explore';
            } else {
                window.location = '/register'
            }
            })
        .then(() => setFormData({
            username: '',
            fname: '',
            password: '',
            confirm_password: '',
            user_region: '',
        }));
    }

    return (
        <ReactBootstrap.Container className="background-image">
        <ReactBootstrap.Form className="register">
            <p className="white-text">Please enter your information below:</p>
            <ReactBootstrap.Form.Group controlId="register.Username">
                {/* <ReactBootstrap.Form.Label>Username</ReactBootstrap.Form.Label> */}
                <ReactBootstrap.Form.Control
                    type="text"
                    name="username"
                    placeholder="Username"
                    onChange={handleChange}
                    value={formData.username} />
            </ReactBootstrap.Form.Group>
            
            <ReactBootstrap.Form.Group controlId="register.FirstName">
                {/* <ReactBootstrap.Form.Label>First Name</ReactBootstrap.Form.Label> */}
                <ReactBootstrap.Form.Control
                    type="text"
                    name="fname"
                    placeholder="First name"
                    onChange={handleChange}
                    value={formData.fname} />
            </ReactBootstrap.Form.Group>

            <ReactBootstrap.Form.Group controlId="register.Password">
                {/* <ReactBootstrap.Form.Label>Password</ReactBootstrap.Form.Label> */}
                <ReactBootstrap.Form.Control
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={handleChange}
                    value={formData.password} />
            </ReactBootstrap.Form.Group>

            <ReactBootstrap.Form.Group controlId="register.ConfirmPassword">
                {/* <ReactBootstrap.Form.Label>Confirm password</ReactBootstrap.Form.Label> */}
                <ReactBootstrap.Form.Control
                    type="password"
                    name="confirm_password"
                    placeholder="Confirm password"
                    onChange={handleChange}
                    value={formData.confirm_password} />
            </ReactBootstrap.Form.Group>

            <ReactBootstrap.Form.Group controlId="register.StateOfResidence">
                <ReactBootstrap.Form.Label><p>State of Residence</p></ReactBootstrap.Form.Label>
                <ReactBootstrap.Form.Control
                    placeholder="Select state"
                    as="select"
                    name="user_region"
                    onChange={handleChange}
                    value={formData.user_region}>
                        <option value="" selected disabled>Select State</option>
                        <option value="Southeast Region">Alabama</option>
                        <option value="Alaska">Alaska</option>
                        <option value="Southwest Region">Arizona</option>
                        <option value="Southern Plains Region">Arkansas</option>
                        <option value="California">California</option>
                        <option value="Southern Plains Region">Colorado</option>
                        <option value="Northeast Region">Connecticut</option>
                        <option value="Mid-Atlantic Region">Delaware</option>
                        <option value="Florida">Florida</option>
                        <option value="Southeast Region">Georgia</option>
                        <option value="Hawaii">Hawaii</option>
                        <option value="Rocky Mountain Region">Idaho</option>
                        <option value="Midwest Region">Illinois</option>
                        <option value="Midwest Region">Indiana</option>
                        <option value="Midwest Region">Iowa</option>
                        <option value="Southern Plains Region">Kansas</option>
                        <option value="Southeast Region">Kentucky</option>
                        <option value="Southeast Region">Louisiana</option>
                        <option value="Northeast Region">Maine</option>
                        <option value="Mid-Atlantic Region">Maryland</option>
                        <option value="Northeast Region">Massachusetts</option>
                        <option value="Great Lakes Region">Michigan</option>
                        <option value="Great Lakes Region">Minnesota</option>
                        <option value="Southeast Region">Mississippi</option>
                        <option value="Midwest Region">Missouri</option>
                        <option value="Northern Plains Region">Montana</option>
                        <option value="Northern Plains Region">Nebraska</option>
                        <option value="Rocky Mountain Region">Nevada</option>
                        <option value="Northeast Region">New Hampshire</option>
                        <option value="Mid-Atlantic Region">New Jersey</option>
                        <option value="Southwest Region">New Mexico</option>
                        <option value="Northeast Region">New York</option>
                        <option value="Mid-Atlantic Region">North Carolina</option>
                        <option value="Northern Plains Region">North Dakota</option>
                        <option value="Great Lakes Region">Ohio</option>
                        <option value="Southern Plains Region">Oklahoma</option>
                        <option value="Maritime Northwest Region">Oregon</option>
                        <option value="Mid-Atlantic Region">Pennsylvania</option>
                        <option value="Northeast Region">Rhode Island</option>
                        <option value="Southeast Region">South Carolina</option>
                        <option value="Northern Plains Region">South Dakota</option>
                        <option value="Southeast Region">Tennessee</option>
                        <option value="Southern Plains Region">Texas</option>
                        <option value="Rocky Mountain Region">Utah</option>
                        <option value="Northeast Region">Vermont</option>
                        <option value="Mid-Atlantic Region">Virginia</option>
                        <option value="Maritime Northwest Region">Washington</option>
                        <option value="Mid-Atlantic Region">West Virginia</option>
                        <option value="Great Lakes Region">Wisconsin</option>
                        <option value="Northern Plains Region">Wyoming</option>
                </ReactBootstrap.Form.Control>
            </ReactBootstrap.Form.Group>
            <ReactBootstrap.Button className="btn-register waves-effect waves-light"
                onClick={handleSubmit}
                disabled={!formData.username || !formData.fname || !formData.password || !formData.confirm_password || !formData.user_region}
                variant="outline-light"
                type="submit">Register</ReactBootstrap.Button>
        </ReactBootstrap.Form>
    </ReactBootstrap.Container>
    );
}