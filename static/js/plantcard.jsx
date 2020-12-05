function PlantCard (props) {
    const { plant_id, common_name, scientific_name, region, plant_type,
    flower_color, bloom_period, life_cycle, max_height, notes, image_url, isGarden } = props;
    // get session user region
    const {userId, userRegion} = React.useContext(UserContext);
    // isAdded initial state is true if from garden component, false if from map component
    // updated based on add / remove activity, used to show add / remove buttons conditionally
    const [isAdded, setIsAdded] = React.useState(isGarden);
    // isAddClicked is true if add button is clicked; used to deactivate add button after click
    const [isAddClicked, setIsAddClicked] = React.useState(false);
    // isRemoveClicked is true if remove button is clicked; used to deactivate remove button after click
    const [isRemoveClicked, setIsRemoveClicked] = React.useState(false);
    // inGardenPlants is an array of plant_ids of plants in a users garden
    const [inGardenPlants, setInGardenPlants] = React.useState([]);

    // check if plant is in user's garden on first render
    // if so, set isInGarden to true to prevent adding the same plant repeatedly
    React.useEffect(() => {
        fetch('/api/garden-plant-ids')
        .then((response) => response.json())
        .then((data) => setInGardenPlants(data.garden_plant_ids))
    }, []);

    // post request to add plant to user garden
    // set IsAdded to true to record that plant is now in user garden, used to show remove button
    // set IsAddClicked to true to disable add button
    const addToGarden = (event) => {
        event.preventDefault();
        // assuming request is successful and show remove button
        // check if plant is in user garden, if so alert that plant is already in garden
        // and don't add. otherwise POST to add plant to users garden in db.
        if (inGardenPlants.includes(plant_id)) {
            alert("This plant is already in your garden.");
        } else {
            setIsAdded(true);
            setIsAddClicked(true);
            fetch('/api/add-to-garden', {
                    method: 'POST',
                    body: JSON.stringify( { plant_id } ),
                    headers: { 'Content-Type': 'application/json' },
                })
                // .then(() => setIsAdded(true));
                // if you want to do error handling, do setIsAdded here
                // alert message saying sucess or not 
            alert(common_name + " was added to your garden.");
        }}

    function AddToast({ toggle }) {
        return (
            <ReactBootstrap.Toast onClose={() => toggle(false)}>
                <ReactBootstrap.Toast.Header>
                    <img src="holder.js/20x20?text=%20" className="rounded mr-2" alt="" />
                    <strong className="mr-auto">Success!</strong>
                    <small>just now</small>
                </ReactBootstrap.Toast.Header>
                <ReactBootstrap.Body>You added {common_name} to your garden!</ReactBootstrap.Body>
            </ReactBootstrap.Toast>
        )
    }

    // post request to remove plant from user garden
    // set isRemoveClicked to true to disable remove button after removed from garden
    // set isAdded to false to record that the plant is no longer in the garden, to show add to garden button again
    const removeFromGarden = (event) => {
        event.preventDefault();
        // assuming request is successful and show add button
        setIsAdded(false);
        setIsRemoveClicked(true);
        fetch('/api/remove-from-garden', {
                method: 'POST',
                body: JSON.stringify({ plant_id }),
                headers: { 'Content-Type': 'application/json' },
            })
            .then(() => {
                if (isGarden) {
                window.location.reload();
            }});
            // .then(() => setIsAdded(false));
            // if you want to do error handling, do setIsAdded here
            // flash message says "{common_name} was removed from your garden"
        }

    const popover = (
        <ReactBootstrap.Popover id="non-native-popover" className="cream-popover">
            <ReactBootstrap.Popover.Title className="cream-popover" as="h3">Use native plants!</ReactBootstrap.Popover.Title>
            <ReactBootstrap.Popover.Content>
                You're only able to add plants native to your region to your garden.
                Native plants best serve your local pollinators and ecosystem.
            </ReactBootstrap.Popover.Content>
        </ReactBootstrap.Popover>
    );

    const NonNativePopover = () => (
        <ReactBootstrap.OverlayTrigger trigger="click" placement="top" overlay={popover}>
            <ReactBootstrap.Button className="btn-popover" block="true">Why can't I add this plant?</ReactBootstrap.Button>
        </ReactBootstrap.OverlayTrigger>
    );

    let message;
    if (userId && region !== userRegion) {
        message = <NonNativePopover />
        // message to display when exploring plants not in a users region
    };

    
    return (        
        <React.Fragment>
        <ReactBootstrap.CardDeck className="mt-4 mb-4">
        <ReactBootstrap.Card className="plantcards h-100 shadow-sm rounded ml-4 mr-4 mb-4" border="dark" style={{ width: '20rem' }}>
            <div className="embed-responsive embed-responsive-1by1">
            <ReactBootstrap.Card.Img className="plant-image card-img-top embed-responsive-item" variant="top" src={image_url} />
            </div>
            <ReactBootstrap.Card.Body className="body d-flex flex-column">
                <div className="d-flex mb-2 justify-content-between"></div>
                    <ReactBootstrap.Card.Title className="card-title mb-2"><h4>{common_name}</h4></ReactBootstrap.Card.Title>
                    <ReactBootstrap.Card.Subtitle className="card-subtitle mb-2 text-muted"><h5><i>{scientific_name}</i></h5></ReactBootstrap.Card.Subtitle>
            <ReactBootstrap.Card.Text>{notes}</ReactBootstrap.Card.Text>
            <ReactBootstrap.Card.Text><strong>Plant type:</strong> <i>{plant_type}</i></ReactBootstrap.Card.Text>
            <ReactBootstrap.Card.Text><strong>Bloom period:</strong> <i>{bloom_period}</i></ReactBootstrap.Card.Text>
            <ReactBootstrap.Card.Text><strong>Flower color:</strong> <i>{flower_color}</i></ReactBootstrap.Card.Text>
            <ReactBootstrap.Card.Text><strong>Life cycle:</strong> <i>{life_cycle}</i></ReactBootstrap.Card.Text>
            <ReactBootstrap.Card.Text><strong>Maximum height (ft):</strong> <i>{max_height}</i></ReactBootstrap.Card.Text>
            <ReactBootstrap.Card.Text><strong>Native to:</strong> <i>{region}</i></ReactBootstrap.Card.Text>
                {/* if plant is in user region and has not been added to garden, show button, otherwise show message */}
                {/* disable if it has been clicked with isAddClicked removed */}
                {/* message & info popover is displayed if logged in but not in a user's region */}
                {region === userRegion && !isAdded ?
                    <button
                    className="mt-auto btn-primary"
                    disabled={isAddClicked}
                    variant="success"
                    onClick={addToGarden}
                    block="true">Add to garden</button> :
                    <div className="mt-auto">{message}</div> }
                {/* if in the /garden page, show the remove from garden button, otherwise no button */}
                {/* disable if it has been clicked with isRemoveClicked */}
            {isAdded && <button
                className="mt-auto btn-primary"
                variant="success"
                block="true"
                disabled={isRemoveClicked}
                onClick={(event) => { if (window.confirm("Are you sure you want to remove " + common_name + " from your garden?"))
                removeFromGarden(event)}}>Remove from garden</button>}
            </ReactBootstrap.Card.Body>
        </ReactBootstrap.Card>
        </ReactBootstrap.CardDeck>
        </React.Fragment>
    );
}