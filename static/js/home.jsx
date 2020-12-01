function Home() {
    $('#regions_div')[0].style.display='none';
    const {userId, fname} = React.useContext(UserContext);

    return (
        <React.Fragment>
            <ReactBootstrap.Container className="background-image">
                {/* <img className="img-responsive" src='/static/img/blackandwhitehome.jpg'></img> */}
                <ReactBootstrap.Row>
                    <ReactBootstrap.Col className="col-sm home-welcome">
                        <span>{userId ? <h1 className="white-text">Welcome back, {fname}!</h1> : <h1 className="white-text">Welcome, visitor</h1>}</span>
                    </ReactBootstrap.Col>
                </ReactBootstrap.Row>
            </ReactBootstrap.Container> 
            <ReactBootstrap.Container>
                <ReactBootstrap.Row className="row justify-content-center">
                    <h2>Pollinator Plant Finder</h2>
                </ReactBootstrap.Row>
                <ReactBootstrap.Row>
                    <ReactBootstrap.Col className="col-lg-4 col-md-4">
                        <h4>Explore</h4>
                        <p>Discover plants native to anywhere in the US that support hard-working pollinators.
                            Get informed about pollinator conservation status across the country.
                        </p>
                    </ReactBootstrap.Col>
                    <ReactBootstrap.Col className="col-lg-4 col-md-4">
                        <h4>Collect</h4>
                        <p>Save your favorite plants to a virtual garden space! In the interest of conservation,
                            you'll only be able to add plants native to your region.
                        </p>
                    </ReactBootstrap.Col>
                    <ReactBootstrap.Col className="col-lg-4 col-md-4">
                        <h4>Learn</h4>
                        <p>Receive feedback about your garden plant selection, so that you can create a haven for a diverse
                            array of pollinators throughout the year.
                        </p>
                    </ReactBootstrap.Col>
                </ReactBootstrap.Row>    
            </ReactBootstrap.Container>
        </React.Fragment> 
    );
}