const UserContext = React.createContext();
function App() {
    const userRegion = document.getElementById('root').getAttribute('user_region');
    const userId = document.getElementById('root').getAttribute('user_id');
    const fname = document.getElementById('root').getAttribute('fname');
    console.log(userRegion);
    console.log(userId);
    console.log(fname);

    
    // const {userId, userRegion, fname} = React.useContext(UserContext);
    // gives everything in app access to userRegion, userId, and fname instead of passing props to every component.
    // use commented line at the top of each component you need this data in.
    // UserContext gives back object userId, userRegion, and fname.
    // syntax is destructured. shorthand for writing out UserContext has a key called userId.

    const history = ReactRouterDOM.useHistory();

    const handleLogout = (event) => {
        event.preventDefault();
        fetch('/api/logout', {
            method: 'POST',
        });
        // .then(() => history.push('/'));
    }
    return (
        <React.Fragment>
            <UserContext.Provider value={{userRegion, userId, fname}}>
                <nav>
                    <ReactRouterDOM.BrowserRouter>
                            <ReactRouterDOM.Link to='/'>Home</ReactRouterDOM.Link>
                            <ReactRouterDOM.Link to='/about'>About</ReactRouterDOM.Link>
                            <ReactRouterDOM.Link to='/explore'>Explore Pollinator Plants</ReactRouterDOM.Link>
                            <ReactRouterDOM.Link to='/garden'>Garden</ReactRouterDOM.Link>
                            <ReactRouterDOM.Link to='/register'>Sign Up</ReactRouterDOM.Link>
                            <ReactRouterDOM.Link to='/login'>Log In</ReactRouterDOM.Link>
                            <ReactBootstrap.Button onClick={handleLogout}> Log Out</ReactBootstrap.Button>
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
// can do a footer at end of switch, will appear on every page
// script tags for ReactBootstrap -- look into navbars

function Home () {
    const {userId, fname} = React.useContext(UserContext);

    return (
        <React.Fragment>
            {userId ? <div>Welcome, {fname}</div> : <div>Welcome, visitor</div>}
            <img src='/static/img/plant/clover-bee.jpg' width='900px'></img>
        </React.Fragment> 
    );
}


function About () {
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


function Register () {
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


function Login () {
    const [formData, setFormData] = React.useState({ username: '', password: '' });
    const history = ReactRouterDOM.useHistory();

    const handleChange = (event) => {
        const value = event.target.value;
        setFormData({
            ...formData,
            [event.target.name]: value
        });
    }
    const handleSubmit = (event) => {
        console.log(formData)
        event.preventDefault();
        fetch('/api/login', {
                method: 'POST',
                body: JSON.stringify( formData ),
                headers: { 'Content-Type': 'application/json' }
        })
        .then(() => setFormData({
            username: '',
            password: '',
        }))
        .then(() => history.push('/garden'));
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
    const {userRegion} = React.useContext(UserContext);
    const [isAdded, setIsAdded] = React.useState(isGarden);
    const [isAddClicked, setIsAddClicked] = React.useState(false);
    const [isRemoveClicked, setIsRemoveClicked] = React.useState(false);
    // const [inGarden, setInGarden] = React.useState(false);
    const history = ReactRouterDOM.useHistory();

    // below: to not allow user to add the same plant twice (either an alert if they click it, or no button but a message instead)
    // React.useEffect (() => {
    //     // create server route that gets plant ids of plants in usergarden
    //     // if plant_id in the list, set inGarden to true
    //     // otherwise set it to false
    //     // use to set message and prevent adding the same plant twice
    // }), []);


    // post request to add plant to user garden
    const addToGarden = (event) => {
        event.preventDefault();
        // assuming request is successful and show remove button
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
        
    }
    // post request to remove plant from user garden
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
                    history.push('/garden');
                }})
            }
            // above: did not force the page to reload to show plant removed...maybe that's okay because button changes
            // .then(() => setIsAdded(false));
            // if you want to do error handling, do setIsAdded here

    let message;
    if (isGarden) {
        message = <p>This plant is already in your garden.</p>
        // this message is displaying IN garden; not what you want.
        // use inGarden for this
    };
    if (region !== userRegion) {
        message = <p>This plant is not native to your region.</p>
    };


    // add alert messages 

    // REMOVE: query the db to see if plant is there.
        // allow to click, and handle it correctly on the backend
        // alert // message on front end
        // have parent component pass prop, use it to decide what to do
        // inGarden: True and False
    
    return (        
        <ReactBootstrap.CardDeck>
        <ReactBootstrap.Card border="dark" style={{ width: '10rem' }}>
        <ReactBootstrap.Card.Img variant="top" src={image_url} />
        <ReactBootstrap.Card.Body>
            <ReactBootstrap.Card.Title><p>{common_name}</p> <p>{scientific_name}</p></ReactBootstrap.Card.Title>
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
            {/* disable if it has been clicked with isAddClicked */}
            {region === userRegion && !isAdded ? <button disabled={isAddClicked} variant="outline-dark" onClick={addToGarden}>Add to garden</button> : <p>{message}</p> }
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

// MapPlantContainer:
    // add useEffect, if user_id in session is not none, load user_region plants on first render
    // otherwise, load nothing (maybe a message saying 'click map to see regional plants')

function MapPlantContainer() {
    const isGarden = false;
    const [plantData, setPlantData] = React.useState([]);
    const [printRegion, setPrintRegion] = React.useState('');
    console.log({printRegion})
    const { userRegion: user_region, userId: user_id } = React.useContext(UserContext);
    // change to snake_case if sending to backend

    React.useEffect(() => {
        if (user_id !== null) {
            fetch('api/plants/' + user_region)
            .then((response) => response.json())
            .then((data) => setPlantData(data.plants))
            .then(setPrintRegion(user_region));
        }
        }, []);

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
                        setPrintRegion(region);
                        
                              
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
            <h2>Click the map to view regional native plants from anywhere</h2>
            {printRegion === false && <h2>You're viewing pollinator plants native to: {printRegion}</h2>}
            {plants}
            {/* maybe include second statement for first render actually */}
        </React.Fragment>
    );
};


function GardenContainer() {
    const isGarden = true;
    const {userId: user_id, fname} = React.useContext(UserContext);

    const [plantData, setPlantData] = React.useState([]);

    // if user_id is none, don't fetch data but give message, possibly reroute
    React.useEffect(() => {
        if (user_id) {
            fetch('/api/garden/' + user_id)
                .then((response) => response.json())
                .then((data) => setPlantData(data.plants))
        }}, [])
            // if (plantData.length === 0) --> move here?

    console.log(plantData)

    const gardenPlants = [];

    // if (plantData.length === 0) {
    //      return <div>Your garden is empty. Explore pollinator plants in your region and add them.</div>;
    // }
    // the above prints even if user is NOT logged in. test.

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
    
    return (
        <React.Fragment>
            {user_id ? <h1>{ fname }'s Garden</h1> : <h1>Please log in or sign up to continue</h1> }
            {gardenPlants}
        </React.Fragment>
    );
}

ReactDOM.render(
    <App />,
    document.getElementById('root'));

// global variable set to true only when explore is clicked; defaults to 
// false for every other condition
// if explore is true, render regions div