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

// exact at the end of '/' route so it doesn't go to other pages that start with slash
// footer will appear on every page

function Home() {
    $('#regions_div')[0].style.display='none';
    const {userId, fname} = React.useContext(UserContext);
    console.log(fname)
    const [pollinatorFact, setPollinatorFact] = React.useState('');

    // fetch initial pollinator fact on first render
    React.useEffect(() => {
        event.preventDefault();
        fetch('/api/pollinator-facts')
            .then((response) => response.json())
            .then((data) => setPollinatorFact(data.pollinator_fact))
    }, []);
    // fetch pollinator fact with button click
    const handleClick = (event) => {
        event.preventDefault();
        fetch('/api/pollinator-facts')
            .then((response) => response.json())
            .then((data) => setPollinatorFact(data.pollinator_fact));
    }
    return (
        <React.Fragment>
            {userId ? <div>Welcome, {fname}</div> : <div>Welcome, visitor</div>}
            <img src='/static/img/plant/clover-bee.jpg' width='900px'></img>
            <div>{pollinatorFact}</div>
            <button onClick={handleClick}>Click to see more pollinator facts.</button>
        </React.Fragment> 
    );
}


function About() {
    $('#regions_div')[0].style.display='none';
    return (
        <React.Fragment>
        <h1>Buzz buzz. Did you know...</h1>
        <div>One in three bites of food exists in great thanks to the hard work
            of pollinators like bees, butterflies, beetles, flies, moths, 
            bats, and birds.
        </div>
        <h2>I like food. How are they doing in this changing world?</h2>
        <div>Not great. Habitat loss, disease, parasites, and pollutants threaten
            all varieties of pollinators.
        </div>
        <h2>Tell me more about native bees, please.</h2>
        <div>There are more than 3,500 native bee species in the United States.
        Colony Collapse Disorder occurs when the worker bees, those that gather
        pollen food for the hive, suddenly disappear. There are a variety of causes,
        including the overuse of agricultural neonicotinoid pesticides. Since 2006, 
        about 30% of hives are lost each winter.
        </div>
        <h2>Can I help?</h2>
        <div>Absolutely! Here are some of the best ways to help:
            <p>1. Plant a wide variety of native flowering pollinator-friendly plants in your garden.</p>
            <p>2. Use pesticides responsibily, or not at all! Consider using plants that attract
                other beneficial insects (think: predators of the pests).
            </p>
            <p>3. Accept insect friends nibbling on your lettuce before you.</p>
            <p>4. Pollinators are thirsty -- put out a shallow dish of clean water.</p>
            <p>6. Leave dead tree trunks in your </p>.</div>
        </React.Fragment>
    )
};


function Register() {
    // hides the regions_div
    $('#regions_div')[0].style.display='none';
    const [formData, setFormData] = React.useState({
        username: '',
        fname: '',
        password: '',
        confirm_password: '',
        user_region: ''
    });
    const history = ReactRouterDOM.useHistory();

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
        .then(() => setFormData({
            username: '',
            fname: '',
            password: '',
            confirm_password: '',
            user_region: '',
        }))
        .then(() => history.push('/explore'));
        // pushes reroute
        // possibly change to window.location and server changes like login -- test errors
    }

    return (
        <form>
            <p>
            <label>Username:
            <input value={formData.username}
            onChange={handleChange}
            name="username"
            type="text"
            placeholder="Username" />
            </label>
            </p>
            <p>
            <label>First Name:
            <input value={formData.fname}
            onChange={handleChange}
            name="fname"
            type="text"
            placeholder="First Name" />
            </label>
            </p>
            <p>
            <label>Password: 
            <input value={formData.password}
            onChange={handleChange}
            type="password"
            name="password"
            placeholder="Password" />
            </label>
            </p>
            <p>
            <label>Confirm Password:
            <input value={formData.confirm_password}
            onChange={handleChange}
            type="password"
            name="confirm_password"
            placeholder="Confirm Password" />
            </label>
            </p>
            <p>
            <label>State of Residence: 
                <select name="user_region" value={formData.user_region} onChange={handleChange}>
                    <option>Select State</option>
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
                </select>
            </label>
            </p>
            <button onClick={handleSubmit} disabled={!formData.username || !formData.fname ||
                    !formData.password || !formData.confirm_password ||
                    !formData.user_region} type="submit">Submit
            </button>
        </form>
    );
}


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


function DisplayPlantCards (props) {
    const { plant_id, common_name, scientific_name, region, plant_type,
    flower_color, bloom_period, life_cycle, max_height, notes, image_url, isGarden } = props;
    // get session user region
    const {userRegion} = React.useContext(UserContext);
    // isAdded initial state is true if from garden component, false if from map component
    // updated based on add / remove activity, used to show add / remove buttons conditionally
    const [isAdded, setIsAdded] = React.useState(isGarden);
    // isAddClicked is true if add button is clicked; used to deactivate add button after click
    const [isAddClicked, setIsAddClicked] = React.useState(false);
    // isRemoveClicked is true if remove button is clicked; used to deactivate remove button after click
    const [isRemoveClicked, setIsRemoveClicked] = React.useState(false);
    // inGardenPlants is an array of plant_ids of plants in a users garden
    const [inGardenPlants, setInGardenPlants] = React.useState([]);

    // check if plant is in user's garden on first render
    // if so, set isInGarden to true to prevent adding the same plant repeatedly
    React.useEffect(() => {
        fetch('/api/garden-plant-ids')
            .then((response) => response.json())
            .then((data) => setInGardenPlants(data.garden_plant_ids))
    }, []);

    // post request to add plant to user garden
    // set IsAdded to true to record that plant is now in user garden, used to show remove button
    // set IsAddClicked to true to disable add button
    const addToGarden = (event) => {
        event.preventDefault();
        // assuming request is successful and show remove button
        // check if plant is in user garden, if so alert that plant is already in garden
        // and don't add. otherwise POST to add plant to users garden in db.
        if (inGardenPlants.includes(plant_id)) {
            alert("This plant is already in your garden!");
        } else {
            setIsAdded(true);
            setIsAddClicked(true);
            fetch('/api/add-to-garden', {
                    method: 'POST',
                    body: JSON.stringify( { plant_id } ),
                    headers: { 'Content-Type': 'application/json' },
                })
                // .then(() => setIsAdded(true));
                // if you want to do error handling, do setIsAdded here
                // alert message saying sucess or not 
            alert(common_name + " was added to your garden.");
        }}

    // post request to remove plant from user garden
    // set isRemoveClicked to true to disable remove button after removed from garden
    // set isAdded to false to record that the plant is no longer in the garden, to show add to garden button again
    // CHANGE: confirm remove popupbefore actually removing
    const removeFromGarden = (event) => {
        event.preventDefault();
        // assuming request is successful and show add button
        setIsAdded(false);
        setIsRemoveClicked(true);
        fetch('/api/remove-from-garden', {
                method: 'POST',
                body: JSON.stringify({ plant_id }),
                headers: { 'Content-Type': 'application/json' },
            })
            .then(() => {
                if (isGarden) {
                window.location.reload();
            }});
            // .then(() => setIsAdded(false));
            // if you want to do error handling, do setIsAdded here
            alert(common_name + " removed from your garden.");
        }
    let message;
    if (region !== userRegion) {
        message = <p>This plant is not native to your region.</p>
        // message to display when exploring plants not in a users region
        // add 'click to learn more' --> raises a bootstrap alert with explanation
    };
    // STYLE ALERT USING BOOTSTRAP
    // const InGardenAlert () {
    //     const [show, setShow] = useState(true);
    
    //     if (show) {
    //         return (
    //             <ReactBootstrap.Alert variant="warning" onClose={() => setShow(false)} dismissible>
    //                 <ReactBootstrap.Alert.Heading>This plant is already in your garden!</ReactBootstrap.Alert.Heading>
    //                 <p>Add other plants to keep a diverse array pollinators happy.</p>
    //             </ReactBootstrap.Alert>
    //         );
    //     }
    //     return <ReactBootstrap.Button onClick={() => setShow(true)}></ReactBootstrap.Button>
    // }

    // add alert messages 
    
    return (        
        <ReactBootstrap.CardDeck>
        <ReactBootstrap.Card border="dark" style={{ width: '10rem' }}>
        <ReactBootstrap.Card.Img variant="top" src={image_url} />
        <ReactBootstrap.Card.Body>
            <ReactBootstrap.Card.Title><p>{common_name}</p> <p>{scientific_name}</p></ReactBootstrap.Card.Title>
            {/* italicize scientific name */}
            <ReactBootstrap.Card.Text>
                {notes}
            </ReactBootstrap.Card.Text>
        </ReactBootstrap.Card.Body>
        <ReactBootstrap.ListGroup className="list-group-flush">
            <ReactBootstrap.ListGroupItem>Native to: {region}</ReactBootstrap.ListGroupItem>
            <ReactBootstrap.ListGroupItem>Plant type: {plant_type}</ReactBootstrap.ListGroupItem>
            <ReactBootstrap.ListGroupItem>Bloom period: {bloom_period}</ReactBootstrap.ListGroupItem>
            <ReactBootstrap.ListGroupItem>Life cycle: {life_cycle}</ReactBootstrap.ListGroupItem>
            <ReactBootstrap.ListGroupItem>Flower color: {flower_color}</ReactBootstrap.ListGroupItem>
            <ReactBootstrap.ListGroupItem>Maximum height (ft): {max_height}</ReactBootstrap.ListGroupItem>
        </ReactBootstrap.ListGroup>
        <ReactBootstrap.Card.Body>
            {/* if plant is in user region and has not been added to garden, show button, otherwise show message */}
            {/* disable if it has been clicked with isAddClicked removed */}
            {region === userRegion && !isAdded ? <button disabled={isAddClicked} variant="outline-dark" onClick={addToGarden}>Add to garden</button> : <div>{message}</div> }
            {/* if in the /garden page, show the remove from garden button, otherwise no button */}
            {/* disable if it has been clicked with isRemoveClicked */}
            {isAdded && <button disabled={isRemoveClicked} variant="outline-danger" onClick={removeFromGarden}>Remove from garden</button>}
        </ReactBootstrap.Card.Body>
        </ReactBootstrap.Card>
        </ReactBootstrap.CardDeck>
    );
}

// TERNARY button: conditional button. can't use if / else inside of jsx. basically like an if/else. 
// saying: if condition is true, do the first thing before the colon, if false do the thing after the colon
// if you want it to be conditionally rendered, not an alternative:
    // {region === userRegion && <button variant="primary" onClick={addToGarden}>Add to garden</button>}
// conditional does "short circuiting". if you have &&, if the first is false, it'll only do the second if the first is true
// react won't render what's false
// OR put null in p tag

function MapPlantContainer() {
    $('#regions_div')[0].style.display='block';
    const isGarden = false;
    const [plantData, setPlantData] = React.useState([]);
    // printRegion is set to userRegion on first render if logged in or clicked region upon subsequent renders
    const [isRegion, setIsRegion] = React.useState('');
    const { setUserData, userRegion: user_region, userId: user_id } = React.useContext(UserContext);
    // change to snake_case if sending to backend

    // get user session data from server, set state and user context
    React.useEffect (() => {
        fetch('/api/user-info')
        .then(result => result.json())
        .then(data => {
            setUserData(data)
        })
    }, []);

    // if user is logged in, render plants from userRegion and set printRegion to userRegion
    React.useEffect(() => {
        if (user_id !== null) {
            fetch('api/plants/' + user_region)
            .then((response) => response.json())
            .then((data) => setPlantData(data.plants))
            .then(setIsRegion(user_region));
        }
        }, []);

    // below: geocharts clickable map
    google.charts.load('visualization', 'current', {
    'packages':['geochart'],
    'callback': drawRegionsMap,
    'mapsApiKey': 'GOOGLE_CHARTS_KEY'
    });
    google.charts.setOnLoadCallback(drawRegionsMap);

    function drawRegionsMap() {
        const data = google.visualization.arrayToDataTable([
            ['US State', 'Color'],
            ['US-AK', 1], ['US-AL', 2], ['US-AR', 3], ['US-AZ', 4], ['US-CA', 5],
            ['US-CO', 6], ['US-CT', 7], ['US-DE', 8], ['US-FL', 9], ['US-GA', 10],
            ['US-HI', 11], ['US-IA', 12], ['US-ID', 13], ['US-IL', 14], ['US-IN', 15],
            ['US-KS', 16], ['US-KY', 17], ['US-LA', 18], ['US-MA', 19], ['US-MD', 20],
            ['US-ME', 21], ['US-MI', 22], ['US-MN', 23], ['US-MO', 24], ['US-MS', 25],
            ['US-MT', 26], ['US-NC', 27], ['US-ND', 28], ['US-NE', 29], ['US-NH', 30],
            ['US-NJ', 31], ['US-NM', 32], ['US-NV', 33], ['US-NY', 34], ['US-OH', 35],
            ['US-OK', 36], ['US-OR', 37], ['US-PA', 38], ['US-RI', 39], ['US-SC', 40],
            ['US-SD', 41], ['US-TN', 42], ['US-TX', 43], ['US-UT', 44], ['US-VA', 45],
            ['US-VT', 46], ['US-WA', 47], ['US-WI', 48], ['US-WV', 49], ['US-WY', 50]
        ]);
        
        const options = {
            title: 'North American bees and pollinator plants',
            region: 'US',
            displayMode: 'regions',
            resolution: 'provinces',
            colorAxis: { colors: ['#FFB6C1', '#b11226'] }
        };

        const chart = new google.visualization.GeoChart(document.getElementById('regions_div'));
        
        function selectHandler() {
            const selectedState = chart.getSelection()[0];
            const regions = {'Great Lakes Region' : ['US-MN', 'US-WI', 'US-OH', 'US-MI'],
            'Maritime Northwest Region' : ['US-WA', 'US-OR'], 
            'Mid-Atlantic Region' : ['US-NC', 'US-VA', 'US-MD', 'US-DE', 'US-NJ', 'US-PA', 'US-DC'],
            'Midwest Region' : ['US-IA', 'US-MS', 'US-IL', 'US-IN'], 
            'Northeast Region' : ['US-ME', 'US-VT', 'US-MA', 'US-NH', 'US-RI', 'US-CT', 'US-NY'],
            'Northern Plains Region' : ['US-ND', 'US-SD', 'US-MT', 'US-WY'],
            'Southeast Region' : ['US-AL', 'US-GA', 'US-KY', 'US-LA', 'US-MS', 'US-SC', 'US-TN'],
            'Southern Plains Region' : ['US-CO', 'US-KS', 'US-OK', 'US-AR', 'US-TX'],
            'California' : ['US-CA'],
            'Hawaii' : ['US-HI'],
            'Alaska' : ['US-AK'],
            'Southwest Region' : ['US-NM', 'US-AZ', 'US-ID'],
            'Florida' : ['US-FL'],
            'Rocky Mountain Region' : ['US-UT', 'US-NV', 'US-ID']};
            
            if (selectedState) {
                const state = data.getValue(selectedState.row, 0);
                
                for (let region in regions) {
                    if (regions[region].includes(state)) {
                        console.log(state + ' in ' + region);
                        setIsRegion(region);
                        
                              
                        fetch('api/plants/' + region)
                            .then((response) => response.json())
                            .then((data) => setPlantData(data.plants));

                        if (plantData.length === 0) {
                            return <div>Loading...</div>;
                        }
                    }
                }
            };
        }

    chart.draw(data, options);
    google.visualization.events.addListener(chart, 'select', selectHandler);   
    };

    // push plant data as DisplayPlantCards to plants array, return plants and text
    const plants = [];
    
    for (const plant of plantData) {
        plants.push(
            <DisplayPlantCards
            key={plant.plant_id}
            plant_id={plant.plant_id}
            common_name={plant.common_name} 
            scientific_name={plant.scientific_name}
            region={plant.region}
            plant_type={plant.plant_type}
            flower_color={plant.flower_color}
            bloom_period={plant.bloom_period}
            life_cycle={plant.life_cycle}
            max_height={plant.max_height}
            notes={plant.notes}
            image_url={plant.image_url}
            isGarden={isGarden} />
        )
    };

    return (
        <React.Fragment>
            {isRegion && <h1>You're viewing pollinator plants native to: {isRegion}</h1>}
            <h2>Click the map to view regional native plants</h2>
            {plants}
        </React.Fragment>
    );
};


function GardenContainer() {
    // hides regions_div from page
    $('#regions_div')[0].style.display='none';
    const isGarden = true;
    const {setUserData, userId: user_id, fname} = React.useContext(UserContext);
    const [plantData, setPlantData] = React.useState([]);
    const [gardenTip, setGardenTip] = React.useState([]);

    // get user session data from server, set state and user context
    React.useEffect (() => {
        fetch('/api/user-info')
        .then(result => result.json())
        .then(data => {
            setUserData(data)
        })
    }, []);

    // if user_id is none, don't fetch data but display message
    // if user_id, fetch garden plants, set to plantData
    React.useEffect(() => {
        if (user_id) {
            fetch('/api/garden/' + user_id)
                .then((response) => response.json())
                .then((data) => setPlantData(data.plants))
        }}, [])
    
    // fetch random garden tip on first render
    React.useEffect(() => {
        event.preventDefault();
        fetch('/api/garden-tips')
            .then((response) => response.json())
            .then((data) => setGardenTip(data.garden_tip))
    }, []);

    //fetch random garden tip on button click
    const handleClick = (event) => {
        event.preventDefault();
        fetch('/api/garden-tips')
            .then((response) => response.json())
            .then((data) => setGardenTip(data.garden_tip))
    };

    // push plant data as DisplayPlantCards to gardenPlants array, return gardenPlants
    const gardenPlants = [];

    for (const plant of plantData) {
        gardenPlants.push(
            <DisplayPlantCards
            key={plant.plant_id}
            plant_id={plant.plant_id}
            common_name={plant.common_name} 
            scientific_name={plant.scientific_name}
            region={plant.region}
            plant_type={plant.plant_type}
            flower_color={plant.flower_color}
            bloom_period={plant.bloom_period}
            life_cycle={plant.life_cycle}
            max_height={plant.max_height}
            notes={plant.notes}
            image_url={plant.image_url}
            isGarden={isGarden} />
        );
    }
    let message;
    // if a user is signed in and has 0 plants in their garden
    if (user_id && plantData.length === 0) {
        message = <div>Your garden is empty. Explore pollinator plants native to your region and add them.</div>;
    } // if a user is not logged in
    if (!user_id) {
        message = <div>Please log in or sign up to continue.</div>
    }
    
    return (
        <React.Fragment>
            {user_id && <h1>{ fname }'s Garden</h1>}
            <h2>{message}</h2>
            <p>{gardenTip}</p>
            <button disabled={!user_id} onClick={handleClick}>Click to see more tips</button>
            {gardenPlants}
        </React.Fragment>
    );
}

ReactDOM.render(
    <App />,
    document.getElementById('root'));