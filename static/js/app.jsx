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
                    <ReactRouterDOM.BrowserRouter>
                            <ReactRouterDOM.Link to='/'>Home</ReactRouterDOM.Link>
                            <ReactRouterDOM.Link to='/about'>About</ReactRouterDOM.Link>
                            <ReactRouterDOM.Link to='/explore'>Explore Pollinator Plants</ReactRouterDOM.Link>
                            <ReactRouterDOM.Link to='/garden'>Garden</ReactRouterDOM.Link>
                            <ReactRouterDOM.Link to='/register'>Sign Up</ReactRouterDOM.Link>
                            <ReactRouterDOM.Link to='/login'>Log In</ReactRouterDOM.Link>
                            <ReactBootstrap.Button onClick={handleLogout}>Log Out</ReactBootstrap.Button>
                        <ReactRouterDOM.Switch>
                            <ReactRouterDOM.Route path='/' exact>
                                <Home />
                            </ReactRouterDOM.Route>
                            <ReactRouterDOM.Route path='/about'>
                                <About />
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
                        <footer>
                            <p>Pollinator plant data is sourced from the Xerces Society for Invertebrate Conservation.</p>
                            <p>Other pollinator conservation information is from the United States Department of Agriculture.</p>
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