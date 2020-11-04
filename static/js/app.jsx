function App() {
    return (
        <React.Fragment>
        <div>Buzz buzz buzz.</div>

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
        user_region: ''
    });
    const handleChange = (event) => {
        const value = event.target.value;
        setFormData({
            ...state,
            [event.target.name]: value
        });
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        alert('Thanks for signing up!')
        
        fetch('/api/register', {
                method: 'POST',
                body: JSON.stringify({ formData }),
                headers: { 'Content-Type': 'application/json' },
            })
                .then(response => response.json())
                .then(json => setFormData(json.formData))
    }    
    return (
        <form onSubmit={handleSubmit}>
            <input value={state.email}
            onChange={handleChange}
            name="email"
            type="text"
            placeholder="Email"
            />
            <input value={state.fname}
            onChange={handleChange}
            name="fname"
            type="text"
            placeholder="First Name" 
            />
            <input value={state.password}
            onChange={handleChange}
            type="password"
            name="password"
            placeholder="Password"
            />
            <select value={state.user_region} onChange={handleChange}>
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
            <button type="submit">Submit</button>
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
    const handleSubmit = (event) => {
        event.preventDefault();
        
        fetch('/login', {
                method: 'POST',
                body: JSON.stringify({ formData }),
                headers: { 'Content-Type': 'application/json' },
            })
                .then(response => response.json())
                .then(json => setFormData(json.formData))
    }
    //error 405: the above it attempting to make a GET request after a POST request
    return (
        <form onSubmit={handleSubmit}>
        <input value={state.email}
            onChange={handleChange}
            name='email'
            type='text'
            placeholder='Email' 
            />
            <input value={state.password}
            onChange={handleChange}
            type="password"
            name="password"
            placeholder="Password"
            />
            <button type="submit">Submit</button>
        </form>
    );
    
}

// // use user_id from session for addToGarden
// function Plant(props) {
//     const { common_name, scientific_name, region, plant_type,
//         flower_color, bloom_period, life_cycle, max_height, notes } = props;
    
//     const [garden, setGarden] = React.useState([]);
    
//     //add plant to garden: need to pass in user_id as props
//         // add user_id to the session when the user logs in,
//         // so you don't have to pass it in as a prop
//     //query usergarden table for garden_id that matches user_id
//     //use that garden_id to add plant (plant_id + garden_id) to garden


//     //send data to backend by post request
//     //useEffect? NO: inside a nested function.
//     function addToGarden (event) {
//         event.preventDefault();
//         alert('Success!'); 

        
//         // fetch('/add-to-garden', {
//         //     method: "POST"
//         // })
//         // .then((response) => response.json())
//         // .then((data) => setGarden(data.garden));
//     };

//     return (
//         <React.Fragment>
//             <h1>{common_name}</h1>
//             <img src='/static/img/plant/1.jpg' width='200px' />
//             <p>{region}</p>
//             <p>{scientific_name}</p>
//             <p>Plant type: {plant_type}</p>
//             <p>Flower color: {flower_color}</p>
//             <p>Bloom period: {bloom_period}</p>
//             <p>Life cycle: {life_cycle}</p>
//             <p>Maximum height: {max_height}</p>
//             <p>Notes: {notes}</p>
//             <button onClick={addToGarden}>Add to garden</button>
//         </React.Fragment>
//     );
// }

function DisplayPlantCards (props) {
    const { common_name, scientific_name, region, plant_type,
    flower_color, bloom_period, life_cycle, max_height, notes, img_url, user_region } = props;

    return (
        <div className="page-container">

            <PlantCard common_name={common_name}
            img_url={img_url}
            scientific_name={scientific_name}
            plant_type={plant_type}
            flower_color={flower_color}
            bloom_period={bloom_period}
            life_cycle={life_cycle}
            max_height={max_height}
            notes={notes}
            region={region}
            user_region={user_region} />
            <footer>
                {/* move elsewhere */}
                Pollinator plant data is sourced from the Xerces Society for Invertebrate Conservation.
            </footer>
        </div>
    )
}

function PlantCard (props) {
    const { common_name, scientific_name, region, plant_type,
    flower_color, bloom_period, life_cycle, max_height, notes, 
    img_url, region, user_region } = props;
    
    const [flipped, setFlipped] = React.useState(false);
    const [canAdd, setCanAdd] = React.useState();

    const handleClick = () => {
        setFlipped(!flipped);
    }

    //add button to front/back: in front/back component or here

    return (
        <div onClick={handleClick} onClick={handleClick}
        className={flipped ? "card-container flipped" : "card-container"}>
            
            <Front common_name={common_name} 
            img_url={img_url} 
            scientific_name={scientific_name}
            user_region={user_region}
            region={region} 
            user_region={user_region}/>
            
            <Back common_name={common_name} 
            img_url={img_url} 
            scientific_name={scientific_name}
            plant_type={plant_type} 
            flower_color={flower_color} 
            bloom_period={bloom_period}
            life_cycle={life_cycle}
            max_height={max_height}
            notes={notes} />
        </div>
        );
}


function Front (props) {
    const { common_name, scientific_name, img_url, region, user_region } = props;

    //const addToGarden = (event) => {
        // conditional button: if plant region != user_region disable button 
        // and print message
    //}

    return (
        <div className="front">
            <ImageArea img_url={img_url} common_name={common_name}/>
            <MainArea common_name={common_name}
            scientific_name={scientific_name}/>
            {/* <button addToGarden */}
        </div>
    )
}

function Back (props) {
    const { common_name, scientific_name, plant_type,
    flower_color, bloom_period, life_cycle, max_height, notes } = props;
    return (
        <div className="back">
            <h1>{common_name}</h1>
            <p>{scientific_name}</p>
            <p>Plant type: {plant_type}</p>
            <p>Flower color: {flower_color}</p>
            <p>Bloom period: {bloom_period}</p>
            <p>Life cycle: {life_cycle}</p>
            <p>Maximum height: {max_height}</p>
            <p>Notes: {notes}</p>
        </div>
    )
}

function ImageArea (props) {
    const { img_url, common_name} = props;
    return (
        <div className="image-container">
            <img className="card-image"
            src={img_url} alt={common_name} width = '200px'></img>
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
                <p className="read-more">Click to see more details</p>
            </div>
        </div>
    )
}


function PlantContainer() {

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
    
    // below is what is being passed as props to plant component
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
            user_region="{{session['region'}}" />
        )
    };
    // above: check that PlantContainer has access to session,
    // passed as a variable to render_template of '/' (main.html)

    return (
        <React.Fragment>
            {plants}
        </React.Fragment>
    );
};

// in return statement above can use Array.map and object destructuring, look at docs


// input: user garden plants (from back end), user name for greeting
// possibly refactor with PlantCard to make less repetitive
function GardenPlant(props) {
    const { common_name, scientific_name, region, plant_type,
    flower_color, bloom_period, life_cycle, max_height, notes, img_url } = props;

    const [garden, setGarden] = React.useState([]);

    

    return (
        <React.Fragment>
            <h1>{common_name}</h1>
            <img src={img_url} width='200px' />
            <p>{region}</p>
            <p>{scientific_name}</p>
            <p>Plant type: {plant_type}</p>
            <p>Flower color: {flower_color}</p>
            <p>Bloom period: {bloom_period}</p>
            <p>Life cycle: {life_cycle}</p>
            <p>Maximum height: {max_height}</p>
            <p>Notes: {notes}</p>
            <button onClick={removeFromGarden}>Remove from garden</button>
        </React.Fragment>
    );
};

// use session user_id to query for user garden
function Garden() {

    const [plantData, setPlantData] = React.useState([]);

    React.useEffect(() => {
        fetch('/api/garden/')
        .then((response) => response.json())
        .then((data) => setPlantData(data.plants));
    }, []);

    const gardenPlants = [];
    
    if (plantData.length === 0) {
        return <div>Loading...</div>;
    }

    for (const plant of plantData) {
        gardenPlants.push(
            <GardenPlant
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
            img_url={plant.img_url} />
        );
    }
    return (
        <React.Fragment>
            {gardenPlants}
        </React.Fragment>
    );
}


ReactDOM.render(
    <Register />,
    document.getElementById('root'));