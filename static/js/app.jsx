
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

ReactDOM.render(<App />, document.getElementById('root'));

function About() {
    return (
        <div>Something about a web app.</div>
    )
};

function Region() {
    return (
        <div>Have you ever been to electric lady land?</div>
    )
};


// give to /plant/<plant_id>
// add plant_type, bloom_period, etc later after component is tested
function Plant(props) {
    const { plant } = props;
    return (
        <div>
            <h1>{plant.common_name}</h1>
            <p>{plant.scientific_name}</p>
            <p>{plant.region}</p>
        </div>
    )
}

// starting with hard coded test data; need to get data from db eventually
ReactDOM.render(
    <Plant common_name='Baby blue eyes' scientific_name='Nemophilia menziesii' region='California'/>,
    document.getElementById('root')
);