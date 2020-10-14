// add content for main.html

import React from react


function App() {
    return (
        <div>Buzz buzz buzz.</div>
        //<nav> // navigation bar that users can click to go to other links on server.py
            //<p><a href='/routename'>Word</a><p> (wrap in p to put links on a different line)
        //</nav>
        <nav>
            <ReactRouterDOM.BrowserRouter>
                <p>
                    <ReactRouterDOM.Link to='/about'>About</ReactRouterDOM.Link>
                </p>
                <p>
                    <ReactRouterDOM.Link to='/search_by_region'>Find Plants by Region</ReactRouterDOM.Link>
                </p>
                <ReactRouterDOM.Switch>
                    <ReactRouterDOM.Route path='/about'>
                        <About />
                    </ReactRouterDOM.Route>
                    <ReactRouterDOM.Route path='/search_by_region'>
                        <FindByRegion />
                    </ReactRouterDOM.Route>
                </ReactRouterDOM.Switch>
            </ReactRouterDOM.BrowserRouter>
            
        </nav>
    )
}

ReactDOM.render(<App />, document.getElementById('root'))

funciton About() {
    return (
    <div>Something about a web app</div>
    )
};

// ReactDOM.render(<About />, document.getElementById('')) 
// do I need this for other pages / components other than the homepage ?
