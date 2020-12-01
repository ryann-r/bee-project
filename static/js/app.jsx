const UserContext = React.createContext();
function App() {
    // useEffect fetches session data, set it to userData
    // passed setUserDatainto userContext so you can update userData from any child component of app
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
    
    let {userRegion, userId, fname} = userData
    // converting 'None' to null, if user is not logged in
    userRegion = userRegion === 'None' ? null : userRegion;
    userId = userId === 'None' ? null : userId;
    fname = fname === 'None' ? null : fname;

    // await -- waits until fetch is done before window.location
    async function handleLogout() {
        await fetch('/api/logout', {
            method: 'POST',
        });
        window.location = '/';
    }

    if (loading) {
        return <div>Loading...</div>
    }

    // UserContext.Provider passes useContext data (session data and function to update them) 
        // to all child components == everything in the fragment
        // instead of passing props to every component

    return (
        <React.Fragment>
            <UserContext.Provider value={{setUserData, userRegion, userId, fname}}>
                <nav>
                    <ReactBootstrap.Navbar className="navbar navbar-expand-md navbar-custom">
                        {/* scrolling="true" dark="true" expand="md" fixed="top" */}
                            <ReactBootstrap.Navbar.Brand href='/'>Pollinator Plants Finder</ReactBootstrap.Navbar.Brand>
                            <ReactBootstrap.Navbar.Toggle aria-controls="basic-navbar-nav" />
                            <ReactBootstrap.Navbar.Collapse id="basic-navbar-nav">
                                <ReactBootstrap.Nav className="mr-auto">
                                    <ReactBootstrap.Nav.Link href='/about'>About Pollinators</ReactBootstrap.Nav.Link>
                                    <ReactBootstrap.Nav.Link href='/explore'>Explore Plants</ReactBootstrap.Nav.Link>
                                    <ReactBootstrap.Nav.Link href='/garden'>Garden</ReactBootstrap.Nav.Link>
                                    <ReactBootstrap.Nav.Link href='/register'>Sign Up</ReactBootstrap.Nav.Link>
                                    <ReactBootstrap.Nav.Link href='/login'>Log In</ReactBootstrap.Nav.Link>
                                    <ReactBootstrap.Button className='logout-btn' variant="outline-light" onClick={handleLogout}>Log Out</ReactBootstrap.Button>
                                </ReactBootstrap.Nav>
                            </ReactBootstrap.Navbar.Collapse>
                    </ReactBootstrap.Navbar>

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
                </nav>
            </UserContext.Provider>
        </React.Fragment>
    );
}

ReactDOM.render(
    <App />,
    document.getElementById('root'));