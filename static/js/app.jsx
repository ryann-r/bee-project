
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
                    <ReactRouterDOM.Link to='/garden/<user_id>'>Garden</ReactRouterDOM.Link>
                </p>
                <p>
                    <ReactRouterDOM.Link to='/create-account'>Sign me up!</ReactRouterDOM.Link>
                </p>
                <ReactRouterDOM.Switch>
                    <ReactRouterDOM.Route path='/about'>
                        <About />
                    </ReactRouterDOM.Route>
                    <ReactRouterDOM.Route path='/garden/<user_id>'>
                        <Garden />
                    </ReactRouterDOM.Route>
                    <ReactRouterDOM.Route path='/create-account'>
                        <CreateAccount />
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

// change to function
class CreateAccount extends React.Component {
    constructor(props) {
        super(props);
        this.state = { fname: '', email: '', password: ''};
        this.handleChange = this.handleSubmit.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    // double-check this
    handleChange(event) {
        const target = event.target;
        const value = event.target.value;
        this.setState({[target]: value});
    }

    handleSubmit(event) {
        alert("Thanks for signing up," + this.state.fname);

        //FETCH post to server
        fetch('/create_user', {
            method: "POST",
            body: JSON.stringify(this.state)
        }).then(function(response) {
            console.log(response)
            return response.json();
        });

        event.preventDefault();
    }

    render() {
        return (
            <React.Fragment>
                {/* set values to fname, email, etc to send back in post request */}
                {/* need value for each input? */}
                <h1>Create Account</h1>
                <form onSubmit={this.handleSubmit}>
                    <label>First Name:
                        <input type="text" value={this.state.value} onChange={this.handleChange}></input>
                    </label>
                    <label>Email:
                        <input type="text" value={this.state.value} onChange={this.handleChange}></input> 
                    </label>
                    <label>Password:
                        <input type="text" value={this.state.value} onChange={this.handleChange}></input>
                    </label>
                    <input type="submit" value="Submit" />
                </form>
            </React.Fragment>
        );
    }
}



// first display image, common name, scientific name, and add to garden button
// make individual components clickable to see more info
// pass in garden_id as props
function Plant(props) {
    const { common_name, scientific_name, region, plant_type,
        flower_color, bloom_period, life_cycle, max_height, notes } = props;
    
    const [details, setDetails] = React.useState(null);
    const [garden, setGarden] = React.useState(null);


    function displayPlantDetails () {
        console.log(props)
        setDetails(event.target.value);
        // value should be details below, which are passed into larger function as props.
    }
        return (
            <React.Fragment>
                {/* {details} */}
                <h1>{common_name}</h1>
                <img src='/static/img/plant/1.jpg' 
                width='200px' />
                <p>{scientific_name}</p>
                <p>Native to: {region}</p>
                <p>Plant type: {plant_type}</p>
                <p>Flower color: {flower_color}</p>
                <p>Bloom period: {bloom_period}</p>
                <p>Life cycle: {life_cycle}</p>
                <p>Maximum height: {max_height}</p>
                <p>Notes: {notes}</p>
            </React.Fragment>
        );
    
    // add plant to garden: need to pass in garden_id as props
    // set state every time you add a plant: how to do this in a nested function? **
    // send data to backend by post request
    function addToGarden () {
        alert('Success!');
        //setGarden([]) // 

        // fetch('/add-to-garden', {
        //     method: "POST",
        //     body: {garden} //??
        //     // body: JSON.stringify(this.state) // this is class syntax, need to use useState
        //     // line 135: cannot read property 'state' of undefined
        // })
        // .then((response) => response.json())
    }

    return (
        <React.Fragment>
            <h1>{common_name}</h1>
            {/* test img: */}
            <img src='/static/img/plant/1.jpg' 
                width='200px' />
            <p>{scientific_name}</p>
            {/* italicize scientific name */}
            <p>Native to {region}</p>
            <button value={} onClick = {displayPlantDetails}>Details</button>
            {/* set state with above click, ERROR: props is not defined at displayPlantDetails */}
            <button onClick = {addToGarden}>Add to garden</button>
        </React.Fragment>
    );
}


// input region from map click as props
function PlantContainer(props) {

    const [clickedRegion, setRegion] = React.useState('')
    // set region is setting it to an object not a string

    google.charts.load('visualization', 'current', {
    'packages':['geochart'],
    'callback': drawRegionsMap,
    'mapsApiKey': 'GOOGLE_MAPS_KEY'
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
            'California' : ['US-CA'], 'Hawaii' : ['US-HI'], 'Alaska' : ['US-AK'],
            'Southwest Region' : ['US-NM', 'US-AZ', 'US-ID']}

            if (selectedState) {
                const state = data.getValue(selectedState.row, 0);
                console.log(state);
                for (let region in regions) {
                    if (regions[region].includes(state)) {
                        console.log(state + ' in ' + region)
                        setRegion(region);
                        // pass to use effect to fetch correct URL

                        // fetch('/api/plants/' + region);
                    }
                }   

            };
        }
    

    chart.draw(data, options);
    google.visualization.events.addListener(chart, 'select', selectHandler);
       
    };

    const [plantData, setPlantData] = React.useState([]);

    React.useEffect(() => {
        fetch('api/plants' + {clickedRegion})
        .then((response) => response.json())
        .then((data) => setPlantData(data.plants));
    }, []);


    const plants = [];
    
    if (plantData.length === 0) {
        return <div>Loading...</div>;
    }

    // below is what is being passed as props to plant component
    for (const plant of plantData) {
        plants.push(
            <div key={plant.plant_id}>
            <Plant
            plant_id={plant.plant_id}
            common_name={plant.common_name} 
            scientific_name={plant.scientific_name}
            region={plant.region}
            plant_type={plant.plant_type}
            flower_color={plant.flower_color}
            bloom_period={plant.bloom_period}
            life_cycle={plant.life_cycle}
            max_height={plant.max_height}
            notes={plant.notes} />
            </div>
        )
    }
    return (
        <React.Fragment>
            {plants}
        </React.Fragment>
    );
}

// in return statement above can use Array.map and object destructuring, look at docs


// input: user garden plants (from back end), user name for greeting
// return plants (like plant components)
// same as PlantContainer (make an instance) but with different data // route
// or add it to PlantContainer; use hooks to determine which route to use to render which plants
// refactor because repeated code from Plant Container -- just using different URLs
    // use state to determine which URL: this.state = { url: undefined }
function Garden(props) {

    const [plantData, setPlantData] = React.useState([]);

    React.useEffect(() => {
        fetch('/api/garden/<garden_id>')
        .then((response) => response.json())
        .then((data) => setPlantData(data.plants));
    }, []);


    const plants = [];
    
    if (plantData.length === 0) {
        return <div>Loading...</div>;
    }

    for (const plant of plantData) {
        plants.push(
            <div key={plant.plant_id}>
            <Plant
            plant_id={plant.plant_id}
            common_name={plant.common_name} 
            scientific_name={plant.scientific_name}
            region={plant.region}
            plant_type={plant.plant_type}
            flower_color={plant.flower_color}
            bloom_period={plant.bloom_period}
            life_cycle={plant.life_cycle}
            max_height={plant.max_height}
            notes={plant.notes} />
            </div>
        )
    }
    return (
        <React.Fragment>
            {plants}
        </React.Fragment>
    );
}


ReactDOM.render(
    <PlantContainer />,
    document.getElementById('root'));

// render gives return value
// possible ideas: 
// 1. to add map to the component, then you can modify the state
// 2. make plant container a class instead of a component

// function vs class: can only set state in classes, not functions