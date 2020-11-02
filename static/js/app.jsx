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
                {/* <p>
                    <ReactRouterDOM.Link to='/create-account'>Sign me up!</ReactRouterDOM.Link>
                </p> */}
                <ReactRouterDOM.Switch>
                    <ReactRouterDOM.Route path='/about'>
                        <About />
                    </ReactRouterDOM.Route>
                    {/* <ReactRouterDOM.Route path='/garden/<user_id>'>
                        <Garden />
                    </ReactRouterDOM.Route> */}
                    {/* <ReactRouterDOM.Route path='/create-account'>
                        <CreateAccount />
                    </ReactRouterDOM.Route> */}
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
function Account() {
    const [account, setAccount] = React.useState([]);

    const handleChange = ({ target }) => {
        const name = target.name;
        const value = target.value;
        setAccount({
            [name]: value
        });
    };
    // above: change using object destructuring

    const handleSubmit = (event) => {
        event.preventDefault();
        alert("Thanks for signing up," + this.state.fname);

        //FETCH post to server
        React.useEffect(() => {
            fetch('/create-account', {
                method: "POST"
            })
            .then((response) => response.json())
            .then((data) => setAccount(data.account));
        }, []);  
    };

    // add select region (state, dropdown), set region to session to limit
    // adding plants from a users home region

    return (
        <form onSubmit={handleSubmit}>
            <input value={account.fname}
            onChange={handleChange}
            name="fname"
            type="text"
            placeholder="First Name" 
            />
            <input value={account.email}
            onChange={handleChange}
            name="email"
            type="text"
            placeholder="Email"
            />
            <input value={account.password}
            onChange={handleChange}
            type="password"
            name="password"
            placeholder="Password"
            />
            <button type="submit">Submit</button>
        </form>
    )
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
    flower_color, bloom_period, life_cycle, max_height, notes, img_url } = props;

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
            notes={notes} />
            <footer>
                Pollinator plant data comes from Xerces Society for Invertebrate Conservation.
            </footer>
        </div>
    )
}

function PlantCard (props) {
    const { common_name, scientific_name, region, plant_type,
    flower_color, bloom_period, life_cycle, max_height, notes, img_url } = props;
    
    const [flipped, setFlipped] = React.useState(false);

    const handleClick = () => {
        setFlipped(!flipped);
    }

    return (
        <div onClick={handleClick} onClick={handleClick}
        className={flipped ? "card-container flipped" : "card-container"}>
            
            <Front common_name={common_name} 
            img_url={img_url} 
            scientific_name={scientific_name} />
            
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
    const { common_name, scientific_name, img_url } = props;
    return (
        <div className="front">
            <ImageArea img_url={img_url} common_name={common_name}/>
            <MainArea common_name={common_name}
            scientific_name={scientific_name}/>
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
            src={img_url} alt={common_name}></img>
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
            <div key={plant.plant_id}>
            <DisplayPlantCards
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
    };
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
        flower_color, bloom_period, life_cycle, max_height, notes } = props;

    return (
        <React.Fragment>
            <h1>{common_name}</h1>
            <img src='/static/img/plant/1.jpg' width='200px' />
            <p>{region}</p>
            <p>{scientific_name}</p>
            <p>Plant type: {plant_type}</p>
            <p>Flower color: {flower_color}</p>
            <p>Bloom period: {bloom_period}</p>
            <p>Life cycle: {life_cycle}</p>
            <p>Maximum height: {max_height}</p>
            <p>Notes: {notes}</p>
            <button onClick={addToGarden}>Add to garden</button>
        </React.Fragment>
    );
};



function Garden(props) {

    const [plantData, setPlantData] = React.useState([]);

    // use useEffect because you know what data is to be loaded on first render.
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
            <GardenPlant
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