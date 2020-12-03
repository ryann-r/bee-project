function AboutPollinators() {
    $('#regions_div')[0].style.display='none';

    const [pollinatorFact, setPollinatorFact] = React.useState('');

    // fetch initial pollinator fact on first render
    React.useEffect(() => {
        fetch('/api/pollinator-facts')
        .then((response) => response.json())
        .then((data) => setPollinatorFact(data.pollinator_fact))
    }, []);
    // fetch pollinator fact with button click
    const handleClick = (event) => {
        event.preventDefault();
        fetch('/api/pollinator-facts')
        .then((response) => response.json())
        .then((data) => setPollinatorFact(data.pollinator_fact));
    }

    return (
        <React.Fragment>
            <ReactBootstrap.Container>
                <ReactBootstrap.Col>
                    <ReactBootstrap.Row className="row justify-content-center m-4"><span className="m-2"><i className="fas fa-leaf"></i></span></ReactBootstrap.Row>
                    <ReactBootstrap.Row className="row justify-content-center m-4 pb-5"><h2>Did you know?</h2></ReactBootstrap.Row>
                    <ReactBootstrap.Row className="row justify-content-center text-center m-2 pollinator-fact"><p>{pollinatorFact}</p></ReactBootstrap.Row>
                    <ReactBootstrap.Row className="row justify-content-center mb-4 pb-5">
                        <ReactBootstrap.Button
                            className="btn-tip"
                            variant="outline-light"
                            onClick={handleClick}>Tell me more about pollinators!
                        </ReactBootstrap.Button>
                    </ReactBootstrap.Row>
                </ReactBootstrap.Col>
            </ReactBootstrap.Container>

            <ReactBootstrap.Container fluid className="cream-background">
                <ReactBootstrap.Col className="text-center mt-4 mb-4">
                    <ReactBootstrap.Row className="m-8 hr-green"></ReactBootstrap.Row>
                <ReactBootstrap.Row className="row justify-content-center pt-5 mb-4"><h2>Buzz buzz buzz.</h2></ReactBootstrap.Row>
                    <ReactBootstrap.Row className="row justify-content-center m-4">
                        <p className="m-2">One in three bites of food exists in great thanks
                            to the hard work of pollinators like bees, butterflies, beetles,
                            flies, moths, bats, and birds.</p>
                    </ReactBootstrap.Row>
                </ReactBootstrap.Col>

                <ReactBootstrap.Col className="text-center">
                <ReactBootstrap.Row className="row justify-content-center m-4 pt-5"><h2>I like food. How are they doing in this changing world?</h2></ReactBootstrap.Row>
                    <ReactBootstrap.Row className="row justify-content-center m-4">
                        <p className="m-2">Not great. Habitat loss, disease, parasites, and pollutants threaten
                            all varieties of pollinators.</p>
                    </ReactBootstrap.Row>
                </ReactBootstrap.Col>

                <ReactBootstrap.Col className="text-center">
                <ReactBootstrap.Row className="row justify-content-center m-4 pt-5"><h2>Tell me more about native bees, please.</h2></ReactBootstrap.Row>
                    <ReactBootstrap.Row className="row justify-content-center m-4">
                        <p className="m-2">There are more than 3,500 native bee species in the United States.
                                Colony Collapse Disorder occurs when the worker bees, those that gather
                                pollen food for the hive, suddenly disappear. There are a variety of causes,
                                including the overuse of agricultural neonicotinoid pesticides. Since 2006, 
                                about 30% of hives are lost each winter.</p>
                    </ReactBootstrap.Row>
                </ReactBootstrap.Col>

                <ReactBootstrap.Col className="text-center">
                <ReactBootstrap.Row className="row justify-content-center m-4 pt-5"><h2>Can I help?</h2></ReactBootstrap.Row>
                    <ReactBootstrap.Row className="row justify-content-center m-4">
                        <p className="m-2 pb-5">Absolutely! Here's where we come in.
                                One of the best things you can do is to plant pollinator-friendly 
                                plants native to your region in your garden or window-box.
                                Start by exploring regional plants, and sign up to collect
                                your favorites in a virutal garden.</p>
                    </ReactBootstrap.Row>
                </ReactBootstrap.Col>
            </ReactBootstrap.Container>
        </React.Fragment>
    ) 
};