function Home() {
    $('#regions_div')[0].style.display='none';
    const {userId, fname} = React.useContext(UserContext);

    return (
        <React.Fragment>
            <ReactBootstrap.Container fluid className="background-image">
                <ReactBootstrap.Row>
                    <ReactBootstrap.Col className="d-flex justify-content-end m-2">
                        <span>{userId ? <h1 className="white-text">Welcome back, {fname}!</h1> : <h1 className="white-text">Welcome!</h1>}</span>
                    </ReactBootstrap.Col>
                </ReactBootstrap.Row>
                <ReactBootstrap.Row className="d-flex flex-row-reverse">
                    <ReactBootstrap.Col className="align-text-end d-flex col-lg-4 col-md-4 m-2 justify-content-end">
                        <span><h3 className="white-text lato-font">Pollinators are responsible for one in three bites of food</h3></span>
                    </ReactBootstrap.Col>
                </ReactBootstrap.Row>
                <ReactBootstrap.Row className="d-flex flex-row-reverse">
                    <ReactBootstrap.Col className="align-text-end d-flex col-lg-4 col-md-4 mt-8 m-2 justify-content-end">
                        <span><h3 className="white-text lato-font">Support local pollinators by finding native plants for your garden or window-box</h3></span>
                    </ReactBootstrap.Col>
                </ReactBootstrap.Row>
            </ReactBootstrap.Container>

            <ReactBootstrap.Container fluid>
                <ReactBootstrap.Row className="row justify-content-center m-4 pt-5"><h2>Pollinator Plant Finder</h2></ReactBootstrap.Row>
                <ReactBootstrap.Row className="pt-5 pb-5">
                    <ReactBootstrap.Col className="col-lg-4 col-md-4 text-center">
                        <span className="m-2"><i className="fas fa-search"></i></span>
                        <h4 className="m-2">Explore</h4>
                        <p className="m-2">Discover regionally native plants across the US that support local pollinators.
                            Get informed about bee Colony Collapse Disorder statistics in each state.</p>
                        
                    </ReactBootstrap.Col>
                    <ReactBootstrap.Col className="col-lg-4 col-md-4 text-center">
                        <span className="m-2"><i className="fas fa-seedling"></i></span>
                        <h4 className="m-2">Collect</h4>
                        <p className="m-2">Register to save your favorite plants to a virtual garden space! In the interest of conservation,
                            you'll only be able to add plants native to your region.</p>
                        
                    </ReactBootstrap.Col>
                    <ReactBootstrap.Col className="col-lg-4 col-md-4 text-center">
                        <span className="m-2"><i className="fas fa-bug"></i></span>
                        <h4 className="m-2">Learn</h4>
                        <p className="m-2">Receive feedback about your garden plant selection, so that you can create a haven for a diverse
                            array of pollinators throughout the year.</p>
                    </ReactBootstrap.Col>
                </ReactBootstrap.Row> 
                <ReactBootstrap.Row className="row justify-content-center m-5 pt-8">
                    <a href="https://github.com/ryann-r/pollinator-plants-project" target="_blank"><span className="m-2"><i class="fab fa-github"></i></span></a>
                    <a href="https://www.linkedin.com/in/ryann-r" target="_blank"><span className="m-2"><i className="fab fa-linkedin"></i></span></a>
                    </ReactBootstrap.Row>   
            </ReactBootstrap.Container>
        </React.Fragment> 
    );
}