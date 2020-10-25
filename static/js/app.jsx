
function App() {
    return (
        <React.Fragment>
        <div>Buzz buzz buzz.</div>

        <nav>
            <ReactRouterDOM.BrowserRouter>
                <p>
                    <ReactRouterDOM.Link to='/about'>About</ReactRouterDOM.Link>
                </p>
                    <ReactRouterDOM.Link to='/garden/<user_id>'>Garden</ReactRouterDOM.Link>
                
                <ReactRouterDOM.Switch>
                    <ReactRouterDOM.Route path='/about'>
                        <About />
                    </ReactRouterDOM.Route>
                    <ReactRouterDOM.Route path='/garden/<user_id>'>
                        <Garden />
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

function Garden() {
    return (
        <div>User garden page.
        </div>
    )
};

// first display image, common name, scientific name, and add to garden button
// make individual components clickable to see more info
function Plant(props) {
    const {common_name, scientific_name, region, plant_id} = props;

    // have this function (associated with button) make request to server
    // $.post('/add-plant-to-garden)
    function addToGarden () {
        alert('success');
    }

    return (
        <div>
        <React.Fragment>
            <h1>Common Name: {common_name}</h1>
            <p>Key: {plant_id}</p>
            <p>Scientific Name: {scientific_name}</p>
            <p>Region: {region}</p>
            <div><button onClick = {addToGarden}>Add to garden</button></div>
            {/* include image -- from table */}
        </React.Fragment>

        </div>
    );
}

// test Plant component with hard-coded data
// ReactDOM.render(
//     <Plant common_name='Baby blue eyes' scientific_name='Nemophilia menziesii' region='California'/>,
//     document.getElementById('root')
// );



function PlantContainer(props) {

    const [plantData, setPlantData] = React.useState([]);

    React.useEffect(() => {
        fetch('/api/plants/Florida')
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
            region={plant.region}/>
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


const returnValue = ReactDOM.render(
     <PlantContainer />,
     document.getElementById('root'));

// render gives return value
// possible ideas: 
// 1. to add map to the component, then you can modify the state

