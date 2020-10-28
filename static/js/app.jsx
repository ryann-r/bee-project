
function App() {
    return (
        <React.Fragment>
        <div>Buzz buzz buzz.</div>

        <nav>
            <ReactRouterDOM.BrowserRouter>
                    <ReactRouterDOM.Link to='/about'>About</ReactRouterDOM.Link>
                    <ReactRouterDOM.Link to='/garden/<user_id>'>Garden</ReactRouterDOM.Link>
                    <ReactRouterDOM.Link to='/create-account'>Sign me up!</ReactRouterDOM.Link>
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

// forms
// post request

class CreateAccount extends React.Component {
    constructor(props) {
        super(props);
        this.state = { fname: '', email: '', password: ''};
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    // do I need a handleChange(event) function?

    handleSubmit(event) {
        alert("Thanks for signing up," + this.state.fname);
        $.get('/create')
        event.preventDefault
    }

    render() {
        return (
            <React.Fragment>
                {/* set values to fname, email, etc to send back in post request */}
                {/* need value for each input? */}
                <h1>Create Account</h1>
                <form onSubmit={this.handleSubmit}>
                    <label>Your First Name:
                        <input type="text" value={this.state.value}></input>
                    </label>
                    <label>Email:
                        <input type="text" value={this.state.value}></input> 
                    </label>
                    <label>Password:
                        <input type="text" value={this.state.value}></input>
                    </label>
                </form>
            </React.Fragment>
        );
    }
}

// input: user garden plants (from back end), user name for greeting
// return plants (like plant components)
// same as PlantContainer (make an instance) but with different data // route
// or add it to PlantContainer; use hooks to determine which route to use to render which plants
function GardenContainer() {
    return (
        <div>User garden.
        </div>
    );
}

// first display image, common name, scientific name, and add to garden button
// make individual components clickable to see more info
// pass in garden_id as props to 
function Plant(props) {
    const { plant_id, common_name, scientific_name, region, plant_type,
        flower_color, bloom_period, life_cycle, max_height, notes } = props;

    // click details button to see more details, below
    function displayPlantDetails () {
        console.log(props)
        return (
            <React.Fragment>
                <img src='/static/img/plant/1.jpg' 
                width='200px' />
                <h1>{props.common_name}</h1>
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
    }

    // add plant to garden: need to pass in garden_id as props
    // set state every time you add a plant
    // send data to backend by post request
    function addToGarden () {
        // alert('success');
        // setState // useEffect
        // pass in plant_id and garden_id
        fetch('/add-to-garden', {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(this.state.value)
        })
        .then((response) => response.json())
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
            <button onClick = {displayPlantDetails}>Details</button>
            <button onClick = {addToGarden}>Add to garden</button>
        </React.Fragment>
    );
}

// test Plant component with hard-coded data
// ReactDOM.render(
//     <Plant common_name='Baby blue eyes' scientific_name='Nemophilia menziesii' region='California'/>,
//     document.getElementById('root')
// );


// input (props, region)
// + region
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
            region={plant.region} />
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
// 2. make plant container a class instead of a component
