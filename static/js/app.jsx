function App() {
    return (
        <React.Fragment>
        <img src='/static/img/plant/homepagebee.jpg' width='900px'></img>
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
            <p>6. Leave dead tree trunks in your </p>
        </div>

        <nav>
            <ReactRouterDOM.BrowserRouter>
                <p>
                    <ReactRouterDOM.Link to='/about'>About</ReactRouterDOM.Link>
                </p>
                <p>
                    <ReactRouterDOM.Link to='/login'>Log In</ReactRouterDOM.Link>
                </p>
                <p>
                    <ReactRouterDOM.Link to='/api/register'>Sign up</ReactRouterDOM.Link>
                </p>
                <ReactRouterDOM.Switch>
                    <ReactRouterDOM.Route path='/about'>
                        <About />
                    </ReactRouterDOM.Route>
                    <ReactRouterDOM.Route path='/login'>
                        <Login />
                    </ReactRouterDOM.Route>
                    <ReactRouterDOM.Route path='/api/register'>
                        <Register />
                    </ReactRouterDOM.Route>
                    <ReactRouterDOM.Route path='/garden/<user_id>'>
                        <GardenContainer />
                    </ReactRouterDOM.Route>
                </ReactRouterDOM.Switch>
            </ReactRouterDOM.BrowserRouter>
        </nav>
        </React.Fragment>
    )
};

// add dynamic routes

//ReactDOM.render(<App />, document.getElementById('root'));

function About() {
    return (
        <div>Something about a web app.</div>
    )
};


function Register() {
    const [formData, setFormData] = React.useState({
        email: '',
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

    // don't really need to do handleSubmit because rendering new page after login
    return (
        <form action='/api/register' method='POST'>
            <label>Email:
            <input value={formData.email}
            onChange={handleChange}
            name="email"
            type="text"
            placeholder="Email"
            />
            </label>
            <label>First Name:
            <input value={formData.fname}
            onChange={handleChange}
            name="fname"
            type="text"
            placeholder="First Name" 
            />
            </label>
            <label>Password: 
            <input value={formData.password}
            onChange={handleChange}
            type="password"
            name="password"
            placeholder="Password"
            />
            </label>
            <label>Confirm Password:
            <input value={formData.confirm_password}
            onChange={handleChange}
            type="password"
            name="confirm_password"
            placeholder="Confirm Password"
            />
            </label>
            <label>State of Residence: 
                <select name="user_region" value={formData.user_region} onChange={handleChange}>
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
            {/* disabled={!formdata} should keep button disabled unless all input fields are filled out */}
            <button disabled={!formData} type="submit">Submit</button>
        </form>
    )
}


function Login () {
    const [formData, setFormData] = React.useState({email: '', password: ''});
    
    const handleChange = (event) => {
        const value = event.target.value;
        setFormData({
            ...state,
            [event.target.name]: value
        });
    }
    // don't need handleSubmit because login redirects
    return (
        <form action='/api/login' method='POST'>
        <input value={formData.email}
            onChange={handleChange}
            name='email'
            type='text'
            placeholder='Email' 
            />
            <input value={formData.password}
            onChange={handleChange}
            type="password"
            name="password"
            placeholder="Password"
            />
            <button type="submit">Submit</button>
        </form>
    );  
}

function Dashboard () {
    const fname = document.getElementById('root').getAttribute('fname');
    return(
        <React.Fragment>
            <div>
                <h1>Welcome back, {fname}!</h1>
                {/* more detailed information about choosing pollinator plants, how to use the site */}
            </div>
            <nav>
            <ReactRouterDOM.BrowserRouter>
                <p>
                    <ReactRouterDOM.Link to='/garden/<user_id>'>Garden</ReactRouterDOM.Link>
                </p>
                <p>
                    {/* input session user_region to render user region plants */}
                    <ReactRouterDOM.Link to='/api/plants'>View Native Plants</ReactRouterDOM.Link>
                </p>
                <p>
                    <ReactRouterDOM.Link to='/api/plants/'>View Plants Anywhere!</ReactRouterDOM.Link>
                </p>
                    <ReactRouterDOM.Switch>
                        <ReactRouterDOM.Route path='/garden/<user_id>'>
                            <Garden />
                        </ReactRouterDOM.Route>
                        <ReactRouterDOM.Route path='/api/plants/<region>'>
                            <HomePlantContainer />
                            {/* above: need to pass in user_region from session as region */}
                        </ReactRouterDOM.Route>
                        <ReactRouterDOM.Route path='/api/plants'>
                            <PlantContainer />
                        </ReactRouterDOM.Route>
                    </ReactRouterDOM.Switch>
            </ReactRouterDOM.BrowserRouter>
            </nav>
        </React.Fragment>
    );
}


function DisplayPlantCards (props) {
    const { plant_id, common_name, scientific_name, region, plant_type,
    flower_color, bloom_period, life_cycle, max_height, notes, image_url } = props;
    const user_region = document.getElementById('root').getAttribute('user_region');
    const user_id = document.getElementById('root').getAttribute('user_id');
    // do I have to explicitly call these props?
    
    return (
        <div className="page-container">
            <h1>You're viewing pollinator plants native to: {region}</h1>
            <h2>Pollinator plant data is sourced from the Xerces Society for Invertebrate Conservation.</h2>
            {/* website link? */}
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
    )
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

    const [addPlant, setAddPlant] = React.useState({plant_id: ''});

    const addToGarden = (event) => {
        event.preventDefault();

        setAddPlant({
            [event.target.name]: value
        });
        // might need to give name to button
   
        fetch('/api/add-to-garden', {
                method: 'POST',
                body: JSON.stringify({ addPlant }),
                headers: { 'Content-Type': 'application/json' },
            })
    }    
    // conditional button: if plant region != user_region disable button
    // and print message
    // disable button after click // change text "in garden"

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
            <button value={plant_id} onClick={addToGarden}>Add to garden</button>
            {/* disabled={addPlant} --> will this disable after added to state? */}
        </div>
    )
}


function ImageArea (props) {
    const { image_url, common_name} = props;
    return (
        <div className="image-container">
            <img className="card-image"
            src={image_url} alt={common_name} width='400px'></img>
        </div>
    )
}

function MainArea (props) {
    const { common_name, scientific_name} = props;
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


function HomePlantContainer() {
    
    const [plantData, setPlantData] = React.useState([]);
    const user_region = document.getElementById('root').getAttribute('user_region');

    React.useEffect(() => {
        fetch('api/plants/' + user_region)
        .then((response) => response.json())
        .then((data) => setPlantData(data.plants));
    }, []);
    

    if (plantData.length === 0) {
        return <div>Loading...</div>;
    }
    const homePlants = [];
    for (const plant of plantData) {
        homePlants.push(
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
            <h1>Pollinator plants native to SESSION USER_REGION:</h1>
            <h2>Hover over plants to see more information, and click "Add to Garden".</h2>
            <h2>Pollinator plant data is sourced from the Xerces Society for Invertebrate Conservation.</h2>
            {homePlants}
        </React.Fragment>
    );
};


function MapPlantContainer() {

    const [plantData, setPlantData] = React.useState([]);

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
                              
                        fetch('api/plants/'  + region)
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
            image_url={plant.image_url} />
        )
    };

    return (
        <React.Fragment>
            {plants}
        </React.Fragment>
    );
};

// input: user garden plants (from back end), user name for greeting
// possibly refactor with PlantCard to make less repetitive -- conditional rendering 
function GardenPlants(props) {
    const { plant_id, common_name, scientific_name, region, plant_type,
    flower_color, bloom_period, life_cycle, max_height, notes, image_url } = props;
    const user_id = document.getElementById('root').getAttribute('user_id')
  
    const [removePlant, setRemovePlant] = React.useState({plant_id: ''});

    // use user_id and plant_id
    const removeFromGarden = (event) => {
        event.preventDefault();
        
        setRemovePlant({
            [event.target.name]: value
        })
        
        fetch('/remove-from-garden', {
                method: 'POST',
                body: JSON.stringify({ removePlant }),
                headers: { 'Content-Type': 'application/json' },
            })
                .then(response => response.json())
                .then(json => setRemovePlant(json.removePlant))
                // does this make sense? possibly remove .thens
    }

    // make sure plant card is removed from db and page after button is selected

    return (
        <React.Fragment>
            <h1>{common_name}</h1>
            <img src={image_url} width='400px' />
            <p>{region}</p>
            <p>{scientific_name}</p>
            <p>Plant type: {plant_type}</p>
            <p>Flower color: {flower_color}</p>
            <p>Bloom period: {bloom_period}</p>
            <p>Life cycle: {life_cycle}</p>
            <p>Maximum height: {max_height}</p>
            <p>Notes: {notes}</p>
            <button value={plant_id} onClick={removeFromGarden}>Remove from garden</button>
        </React.Fragment>
    );
};

// use session user_id to query for user garden: pass in as props
function GardenContainer() {

    const [plantData, setPlantData] = React.useState([]);

    React.useEffect(() => {
        fetch('/api/garden/') // add user_id from session to end of url
        .then((response) => response.json())
        .then((data) => setPlantData(data.plants));
    }, []);

    const gardenPlants = [];
    
    if (plantData.length === 0) {
        return <div>Loading...</div>;
    }

    for (const plant of plantData) {
        gardenPlants.push(
            <GardenPlants
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
    return (
        <React.Fragment>
            <h1>Message -- conditional ? </h1>
            {gardenPlants}
        </React.Fragment>
    );
}


ReactDOM.render(
    <Register />,
    document.getElementById('root'));

// how to access session elements passed into html as attributes:
//    1.  username=document.getElementById('root').getAttribute('user_id')
//    2.  $('#root').attr('user_id')