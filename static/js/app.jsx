function App() {
    return (
        <React.Fragment>
        <nav>
            <ReactRouterDOM.BrowserRouter>
                    <ReactRouterDOM.Link to='/'>Homepage</ReactRouterDOM.Link>
                    <ReactRouterDOM.Link to='/about'>About</ReactRouterDOM.Link>
                    <ReactRouterDOM.Link to='/explore'>Explore Pollinator Plants</ReactRouterDOM.Link>
                    <ReactRouterDOM.Link to='/garden'>Garden</ReactRouterDOM.Link>
                    <ReactRouterDOM.Link to='/register'>Sign Up</ReactRouterDOM.Link>
                    <ReactRouterDOM.Link to='/login'>Log In</ReactRouterDOM.Link>
                    <ReactRouterDOM.Link to='/logout'><button>Log Out</button></ReactRouterDOM.Link>
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
                    <ReactRouterDOM.Route path='/logout'>
                        <Logout />
                    </ReactRouterDOM.Route>
                </ReactRouterDOM.Switch>
                <footer>
                    <p>Pollinator plant data is sourced from the Xerces Society for Invertebrate Conservation.</p>
                    <p>Other pollinator conservation information is from the United States Department of Agriculture.</p>
                </footer>
            </ReactRouterDOM.BrowserRouter>
        </nav>
        </React.Fragment>
    )
};

// add dynamic routes
// exact at the end of '/' route so it doesn't go to other pages with slash
// can do a footer at end of switch, will appear on every page
// script tags for ReactBootstrap -- look into navbars
// <ReactBootstrap.Button>Log Out</ReactBootstrap.Button>

function Home () {
    return (
            <img src='/static/img/plant/clover-bee.jpg' width='900px'></img>
    )
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
                body: JSON.stringify( {formData} ),
                headers: { 'Content-Type': 'application/json' },
            })
        .then(() => setFormData({
            username: '',
            fname: '',
            password: '',
            confirm_password: '',
            user_region: ''
        }));
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
    )
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
                body: JSON.stringify( {formData} ),
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

// can style logout link into a button

function Logout () {

//     handleLogOut = (event) => {
//         event.preventDefault();
//         fetch('/api/login', {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' }
//         })
//     }

//     return <button onClick={handleLogOut}>Logout</button>

}



function DisplayPlantCards (props) {
    const { plant_id, common_name, scientific_name, region, plant_type,
    flower_color, bloom_period, life_cycle, max_height, notes, image_url } = props;
    const user_region = document.getElementById('root').getAttribute('user_region');
    const user_id = document.getElementById('root').getAttribute('user_id');
    
    return (
        <div className="page-container">
            <PlantCard
            plant_id={plant_id}
            common_name={common_name}
            image_url={image_url}
            scientific_name={scientific_name}
            plant_type={plant_type}
            flower_color={flower_color}
            bloom_period={bloom_period}
            life_cycle={life_cycle}
            max_height={max_height}
            notes={notes}
            region={region}
            user_region={user_region}
            user_id={user_id} />
            <footer>
            </footer>
        </div>
    );
}

// add user_id to props
function PlantCard (props) {
    const { plant_id, common_name, scientific_name, region, plant_type,
    flower_color, bloom_period, life_cycle, max_height, notes, 
    image_url, user_region } = props;
    
    const [flipped, setFlipped] = React.useState(false);

    const handleMouseOver = () => {
        setFlipped(!flipped);
    }

    return (
        <div onMouseOver={handleMouseOver}
        className={flipped ? "card-container flipped" : "card-container"}>
            
            <Front
            common_name={common_name} 
            image_url={image_url} 
            scientific_name={scientific_name} />
            
            <Back
            plant_id={plant_id}
            common_name={common_name} 
            image_url={image_url} 
            scientific_name={scientific_name}
            plant_type={plant_type} 
            flower_color={flower_color} 
            bloom_period={bloom_period}
            life_cycle={life_cycle}
            max_height={max_height}
            notes={notes}
            user_region={user_region} 
            region={region} 
            user_region={user_region} />
        </div>
        );
}


function Front (props) {
    const { common_name, scientific_name, image_url } = props;

    return (
        <div className="front">
            <ImageArea image_url={image_url} common_name={common_name}/>
            <MainArea common_name={common_name}
            scientific_name={scientific_name}/>
        </div>
    )
}

//pass in region and session user_region for conditional button
function Back (props) {
    const { plant_id, common_name, scientific_name, plant_type,
    flower_color, bloom_period, life_cycle, max_height, notes,
    region, user_region } = props;
    
    // post request to add plant to user garden
    const addToGarden = (event) => {
        event.preventDefault();
        fetch('/api/add-to-garden', {
                method: 'POST',
                body: JSON.stringify( {plant_id} ),
                headers: { 'Content-Type': 'application/json' },
            })
    }
    // post request to remove plant from user garden
    // current issue with CRUD function to fix (SQL error)
    const removeFromGarden = (event) => {
        event.preventDefault();
        fetch('/api/remove-from-garden', {
                method: 'POST',
                body: JSON.stringify({ plant_id }),
                headers: { 'Content-Type': 'application/json' },
            });
    }
    // conditional button: if plant region != user_region hide button
    // toggle between addToGarden and removeFromGarden buttons

    return (
        <div className="back">
            <h1>{common_name}</h1>
            <p>{scientific_name}</p>
            <p>Plant type: {plant_type}</p>
            <p>Flower color: {flower_color}</p>
            <p>Bloom period: {bloom_period}</p>
            <p>Life cycle: {life_cycle}</p>
            <p>Maximum height (ft): {max_height}</p>
            <p>Notes: {notes}</p>
            <p>plant_id: {plant_id}</p>
            <button onClick={addToGarden}>Add to garden</button>
            <button onClick={removeFromGarden}>Remove from garden</button>
            {/* disabled={addPlant} --> will this disable after added to state? */}
        </div>
    )
}


function ImageArea (props) {
    const { image_url, common_name } = props;
    return (
        <div className="image-container">
            <img className="card-image"
            src={image_url} alt={common_name} width='400px'></img>
        </div>
    )
}

function MainArea (props) {
    const { common_name, scientific_name } = props;
    return (
        <div className="main-area">
            <div className="plant-card">
                <h1>{common_name}</h1>
                <p>{scientific_name}</p>
                <p className="read-more">Hover to see more details</p>
            </div>
        </div>
    )
}

// MapPlantContainer:
    // add useEffect, if user_id in session is not none, load user_region plants on first render
    // otherwise, load nothing (maybe a message saying 'click map to see regional plants')

    // div: createElementById in component, or jinja conditional div in main.html
function MapPlantContainer() {

    const [plantData, setPlantData] = React.useState([]);

    const user_region = document.getElementById('root').getAttribute('user_region');

    React.useEffect(() => {
        if (user_region !== null) {
            fetch('api/plants/' + user_region)
            .then((response) => response.json())
            .then((data) => setPlantData(data.plants));
        }
        }, []);

    // above useEffect is rendering corrent user regional data on first loading /explore when logged in
    // however Error: invalid hook call: 1. mismatching versions of React & ReactDOM
    // 2. breaking the rules of hooks == not inside loops, conditionals, or nested functions
    // 3. more than one copy of React in the same app

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

        // document.createElement('div')
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
        // possibly add useEffect to render plants from session user_region upon first render

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
            image_url={plant.image_url} />
        )
    };

    return (
        <React.Fragment>
            <h2>Click the map to view regional native plants!</h2>
            <h2>You're viewing pollinator plants native to: {plants.region}</h2>
            {plants}
        </React.Fragment>
    );
};


function GardenContainer() {
    const user_id = document.getElementById('root').getAttribute('user_id')
    console.log(user_id)
    const fname = document.getElementById('root').getAttribute('fname')
    console.log(fname)
    const url = '/api/garden/' + user_id
    console.log(url)

    const [plantData, setPlantData] = React.useState([]);

    // if user_id is none, don't fetch data but give message, possibly reroute
    React.useEffect(() => {
        fetch('/api/garden/' + user_id)
        .then((response) => response.json())
        .then((data) => setPlantData(data.plants))
    }, [])
    console.log(plantData)

    const gardenPlants = [];

    if (plantData.length === 0) {
         return <div>Your garden is empty. Search for pollinator plants in your region and add them.</div>;
    }
    // if (!plantData) {
    //     return <div>Your garden is empty. Explore plants native to your region.</div>;
    

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
            image_url={plant.image_url} />
        );
    }
    
    // conditional message: if session user is None, give message to sign up
    // if session user, Welcome message
    return (
        <React.Fragment>
            <h1>Welcome to your garden, { fname }.</h1>
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

// how to access session elements passed into html as attributes:
//    1.  username=document.getElementById('root').getAttribute('user_id')
//    2.  $('#root').attr('user_id')



const [plantData, setPlantData] = React.useState([]);
const user_region = document.getElementById('root').getAttribute('user_region');

