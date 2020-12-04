const UserContext = React.createContext();
function App() {
    const [userData, setUserData] = React.useState({});
    const [loading, setLoading] = React.useState(false);
    
    React.useEffect (() => {
        setLoading(true);
        fetch('/api/user-info')
        .then(result => result.json())
        .then(data => {
            setUserData(data)
            setLoading(false);
        })
    }, []);

    if (loading) {
        return (
        <ReactBootstrap.Row className="row justify-content-center m-4">
            <span className="m-2"><i className="fas fa-leaf"></i></span>
            <h3>Loading...</h3>
        </ReactBootstrap.Row>
        );
    }

    let {userRegion, userId, fname} = userData
    userRegion = userRegion === 'None' ? null : userRegion;
    userId = userId === 'None' ? null : userId;
    fname = fname === 'None' ? null : fname;

    return (
        <React.Fragment>
            <UserContext.Provider value={{setUserData, userRegion, userId, fname}}>
                {/* <nav> */}
                    <ReactRouterDOM.BrowserRouter>
                        <ReactRouterDOM.Switch>
                            <ReactRouterDOM.Route path='/' exact>
                                <Home />
                            </ReactRouterDOM.Route>
                            <ReactRouterDOM.Route path='/about'>
                                <AboutPollinators />
                            </ReactRouterDOM.Route>
                            <ReactRouterDOM.Route path='/explore'>
                                <MapPlantContainer />
                            </ReactRouterDOM.Route>
                            <ReactRouterDOM.Route path='/garden'> 
                                <GardenContainer />
                            </ReactRouterDOM.Route>
                            <ReactRouterDOM.Route path='/register'>
                                <Register />
                            </ReactRouterDOM.Route>
                            <ReactRouterDOM.Route path='/login'>
                                <Login />
                            </ReactRouterDOM.Route>
                        </ReactRouterDOM.Switch>
                        <footer className="footer">
                            Data and information is from the Xerces Society for Invertebrate Conservation and the US Dept of Agriculture.
                        </footer>
                    </ReactRouterDOM.BrowserRouter>
                {/* </nav> */}
            </UserContext.Provider>
        </React.Fragment>
    );
}

ReactDOM.render(
    <App />,
    document.getElementById('root'));


function NavBar() {
        // await -- waits until fetch is done before window.location

    const [userData, setUserData] = React.useState({});
    const [loading, setLoading] = React.useState(false);
    
    React.useEffect (() => {
        setLoading(true);
        fetch('/api/user-info')
        .then(result => result.json())
        .then(data => {
            setUserData(data)
            setLoading(false);
        })
    }, []);
    

    async function handleLogout() {
        await fetch('/api/logout', {
            method: 'POST',
        });
        window.location = '/';
    }

    // if (loading) {
    //     return <div>Loading...</div>
    // }

    return (
        <React.Fragment>
            <nav>
        <ReactBootstrap.Navbar className="navbar navbar-expand-md navbar-custom">
        {/* scrolling="true" dark="true" expand="md" fixed="top" */}
            <ReactBootstrap.Navbar.Brand href='/'>Pollinator Plant Finder</ReactBootstrap.Navbar.Brand>
            <ReactBootstrap.Navbar.Toggle aria-controls="basic-navbar-nav" />
            <ReactBootstrap.Navbar.Collapse id="basic-navbar-nav">
                <ReactBootstrap.Nav className="mr-auto">
                    <ReactBootstrap.Nav.Link href='/about'>About</ReactBootstrap.Nav.Link>
                    <ReactBootstrap.Nav.Link href='/explore'>Explore Plants</ReactBootstrap.Nav.Link>
                    <ReactBootstrap.Nav.Link href='/garden'>Garden</ReactBootstrap.Nav.Link>
                    <ReactBootstrap.Nav.Link href='/register'>Sign Up</ReactBootstrap.Nav.Link>
                    <ReactBootstrap.Nav.Link href='/login'>Log In</ReactBootstrap.Nav.Link>
                    <ReactBootstrap.Button className='logout-btn' variant="outline-light" onClick={handleLogout}>Log Out</ReactBootstrap.Button>
                </ReactBootstrap.Nav>
            </ReactBootstrap.Navbar.Collapse>
        </ReactBootstrap.Navbar>
        </nav>
        </React.Fragment>
    )
}

ReactDOM.render(
    <NavBar />,
    document.getElementById('nav_bar'));

