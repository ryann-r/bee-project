
function App() {
        //<nav> // navigation bar that users can click to go to other links on server.py
        //<p><a href='/routename'>Word</a></p> (wrap in p to put links on a different line)
        //</nav>
    return (
        <React.Fragment>
        <div>Buzz buzz buzz.</div>

        <nav>
            <ReactRouterDOM.BrowserRouter>
                <p>
                    <ReactRouterDOM.Link to='/about'>About</ReactRouterDOM.Link>
                </p>
                <p>
                    <ReactRouterDOM.Link to='/region'>Find Plants by Region</ReactRouterDOM.Link>
                </p>
                <ReactRouterDOM.Switch>
                    <ReactRouterDOM.Route path='/about'>
                        <About />
                    </ReactRouterDOM.Route>
                    <ReactRouterDOM.Route path='/region'>
                                {/* need to add route for each region -- use /region/<region> ? get region from map? */}
                        <Region />
                    </ReactRouterDOM.Route>
                </ReactRouterDOM.Switch>
            </ReactRouterDOM.BrowserRouter>
        </nav>
        </React.Fragment>
        )
}

// dynamic routes -- look at docs, make request for plant_id from db using useeffect

ReactDOM.render(<App />, document.getElementById('root'));

function About() {
    return (
        <div>Something about a web app.</div>
    )
};

function Region() {
    return (
        <div>List of regions, each a link to another page.
            Add ReactRouterDOM to app component.
            Eventually replace with clickable map.
        </div>
    )
};


// give to /plant/<plant_id>
// add plant_type, bloom_period, etc later after component is tested
// because getting data from db, use db id instead of plant so {plantdb.common_name} ??
function Plant(props) {
    const { common_name, scientific_name, region } = props; //destructuring
    return (
        <div className="plant">
            <h1>Common Name: {common_name}</h1>
            <p>Scientific Name: {scientific_name}</p>
            <p>Region: {region}</p>
            {/* include image -- to fetch from api */}
        </div>
    )
}

// starting with hard coded test data; need to get data from db eventually

ReactDOM.render(
    <Plant common_name='Baby blue eyes' scientific_name='Nemophilia menziesii' region='California'/>,
    document.getElementById('root')
);



// possible pass in a plant as a prop instead of listing all props (common_name, etc) ? look up syntax
// connect to database plantdb for data
function PlantContainer(props) {
    const plants = [];
    for (const plant in plantData) {
        console.log(plant)
        plants.push(
            <Plant
            key={plant.plant_id}
            common_name={plant.common_name} 
            scientific_name={plant.scientific_name}
            region={plant.region}/>
        );
    }

    return (
        <React.Fragment>
            {plants}
        </React.Fragment>
    )
}

// ReactDOM.render(props) {
//     <PlantContainer plantData={Plants}/>,
//     document.getElementById('root')
// };