function GardenContainer() {
    $('#regions_div')[0].style.display='none';
    const isGarden = true;
    const {setUserData, userId: user_id, fname} = React.useContext(UserContext);
    const [plantData, setPlantData] = React.useState([]);
    const [gardenTip, setGardenTip] = React.useState([]);
    
    // get user session data from server, set user context
    React.useEffect (() => {
        fetch('/api/user-info')
        .then(result => result.json())
        .then(data => {
            setUserData(data)
        })
    }, []);

    // if user_id is none, don't fetch data but display message
    // if user_id, fetch garden plants, set to plantData
    React.useEffect(() => {
        if (user_id) {
            fetch('/api/garden/' + user_id)
            .then((response) => response.json())
            .then((data) => setPlantData(data.plants))
    }}, []);
    
    // fetch random garden tip on first render
    React.useEffect(() => {
        fetch('/api/garden-tips')
        .then((response) => response.json())
        .then((data) => setGardenTip(data.garden_tip))
    }, []);

    //fetch random garden tip on button click
    const handleClick = (event) => {
        event.preventDefault();
        fetch('/api/garden-tips')
        .then((response) => response.json())
        .then((data) => setGardenTip(data.garden_tip))
    };

    // push plant data as DisplayPlantCards to gardenPlants array, return gardenPlants
    const gardenPlants = [];

    for (const plant of plantData) {
        gardenPlants.push(
            <PlantCard
            key={plant.plant_id}
            plant_id={plant.plant_id}
            common_name={plant.common_name} 
            scientific_name={plant.scientific_name}
            region={plant.region}
            plant_type={plant.plant_type}
            flower_color={plant.flower_color}
            bloom_period={plant.bloom_period}
            life_cycle={plant.life_cycle}
            max_height={plant.max_height}
            notes={plant.notes}
            image_url={plant.image_url}
            isGarden={isGarden} />
        );
    }

    const bloomPopover = (
        <ReactBootstrap.Popover id="bloom-period-popover">
            <ReactBootstrap.Popover.Title as="h3">Why bloom period?</ReactBootstrap.Popover.Title>
            <ReactBootstrap.Popover.Content>
                Keep pollinators happy all year long by including plants that bloom in all seasons.
                Aim for an even distribution of Early, Mid, and Late blooming plants.
            </ReactBootstrap.Popover.Content>
        </ReactBootstrap.Popover>
    );

    const BloomPopover = () => (
        <ReactBootstrap.OverlayTrigger trigger="click" placement="right" overlay={bloomPopover}>
            <ReactBootstrap.Button className="btn-popover btn-sm">Why bloom time?</ReactBootstrap.Button>
        </ReactBootstrap.OverlayTrigger>
    );

    const colorPopover = (
        <ReactBootstrap.Popover id="flower-color-popover">
            <ReactBootstrap.Popover.Title as="h3">Why flower color?</ReactBootstrap.Popover.Title>
            <ReactBootstrap.Popover.Content>
                Different pollinators are attracted to different colors. For example, bees tend to like
                blues and yellows. Attract diverse pollinators by including a variety of flower colors.
            </ReactBootstrap.Popover.Content>
        </ReactBootstrap.Popover>
    );

    const ColorPopover = () => (
        <ReactBootstrap.OverlayTrigger trigger="click" placement="right" overlay={colorPopover}>
            <ReactBootstrap.Button className="btn-popover btn-sm">Why flower color?</ReactBootstrap.Button>
        </ReactBootstrap.OverlayTrigger>
    );


    let message;
    // if a user is signed in and has 0 plants in their garden
    if (user_id && plantData.length === 0) {
        message = <div>Your garden is empty. Explore pollinator plants native to your region and add them.</div>;
    } // if a user is not logged in
    if (!user_id) {
        message = <div>Please log in or sign up to continue.</div>
    }
    // else {
    //     message = <div>Explore pollinator plants to add to your garden!</div>
    // }

    
    
    return (
        <React.Fragment>
            <ReactBootstrap.Container className="background-fixed">
                <ReactBootstrap.Row className="row justify-content-md-center">{user_id && <h1 className="white-text">{ fname }'s Garden</h1>}</ReactBootstrap.Row>
                <ReactBootstrap.Row className="row justify-content-md-center"><h2 className="white-text">{message}</h2></ReactBootstrap.Row>
                
                <ReactBootstrap.Row className="mb-2">
                    
                    <ReactBootstrap.Col>
                        
                        {user_id && plantData.length !== 0 && <BloomPeriodChart />}
                        <ReactBootstrap.Row className="row justify-content-md-center">{user_id && plantData.length !==0 && <BloomPopover />}</ReactBootstrap.Row>
                    </ReactBootstrap.Col>
                    <ReactBootstrap.Col>
                        {user_id && plantData.length !== 0 && <FlowerColorChart />}
                        <ReactBootstrap.Row className="row justify-content-md-center">{user_id && plantData.length !== 0 && <ColorPopover />}</ReactBootstrap.Row>
                    </ReactBootstrap.Col>
                </ReactBootstrap.Row>
                <ReactBootstrap.Row className="row justify-content-md-center">{user_id && gardenPlants}
                    <ReactBootstrap.Col xs={3} className="col-md-auto card-title mb-4" key={`${gardenPlants.plant_id}`}/>
                </ReactBootstrap.Row>
                <ReactBootstrap.Row className="row justify-content-md-center">
                    <ReactBootstrap.Card className="gardening-tip shadow-sm rounded mt-4" border="dark" style={{ width: '40rem' }}>
                        <ReactBootstrap.Card.Header><h3 className="white-text mb-2">Gardening Tip:</h3></ReactBootstrap.Card.Header>
                        <ReactBootstrap.Card.Body>
                            <blockquote className="blockquote mb-2">
                                <p className="white-text">{gardenTip}</p>
                            </blockquote>
                            <ReactBootstrap.Button
                                className="btn-tip"
                                variant="outline-light"
                                onClick={handleClick}>Give me another tip!
                            </ReactBootstrap.Button>
                        </ReactBootstrap.Card.Body>
                    </ReactBootstrap.Card>
                </ReactBootstrap.Row>
            </ReactBootstrap.Container>
        </React.Fragment>
    );
}