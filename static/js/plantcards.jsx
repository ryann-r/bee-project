function PlantCards (props) {
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
        <ReactBootstrap.Popover id="non-native-popover">
            <ReactBootstrap.Popover.Title as="h3">Use native plants!</ReactBootstrap.Popover.Title>
            <ReactBootstrap.Popover.Content>
                You're only able to add plants native to your region to your garden,
                to best serve your local pollinators and ecosystem.
            </ReactBootstrap.Popover.Content>
        </ReactBootstrap.Popover>
    );

    const NonNativePopover = () => (
        <ReactBootstrap.OverlayTrigger trigger="click" placement="right" overlay={popover}>
            <ReactBootstrap.Button variant="info">Click for more info</ReactBootstrap.Button>
        </ReactBootstrap.OverlayTrigger>
    );

    let message;
    if (userId && region !== userRegion) {
        message = <p>This plant is not native to your region. <NonNativePopover /></p>
        // message to display when exploring plants not in a users region
    };
    // STYLE ALERT USING BOOTSTRAP
    // const InGardenAlert () {
    //     const [show, setShow] = useState(true);
    
    //     if (show) {
    //         return (
    //             <ReactBootstrap.Alert variant="warning" onClose={() => setShow(false)} dismissible>
    //                 <ReactBootstrap.Alert.Heading>This plant is already in your garden!</ReactBootstrap.Alert.Heading>
    //                 <p>Add other plants to keep a diverse array pollinators happy.</p>
    //             </ReactBootstrap.Alert>
    //         );
    //     }
    //     return <ReactBootstrap.Button onClick={() => setShow(true)}></ReactBootstrap.Button>
    // }

    // add alert messages 
    
    return (        
        // add className to bootstrap components
        <ReactBootstrap.Card className="h-100 shadow-sm bg-white rounded" border="dark" style={{ width: '18rem' }}>
            <ReactBootstrap.Card.Img variant="top" src={image_url} />
            <ReactBootstrap.Card.Body className="d-flex flex-column">
                <div className="d-flex mb-2 justify-content-between"></div>
                    <ReactBootstrap.Card.Title className="mb-0 font-weight-bold">{common_name}</ReactBootstrap.Card.Title>
                    <ReactBootstrap.Card.Subtitle className="mb-0 font-italic">{scientific_name}</ReactBootstrap.Card.Subtitle>
                    {notes}
            <ReactBootstrap.Card.Text>Plant type: {plant_type}</ReactBootstrap.Card.Text>
            <ReactBootstrap.Card.Text>Bloom period: {bloom_period}</ReactBootstrap.Card.Text>
            <ReactBootstrap.Card.Text>Flower color: {flower_color}</ReactBootstrap.Card.Text>
            <ReactBootstrap.Card.Text>Life cycle: {life_cycle}</ReactBootstrap.Card.Text>
            <ReactBootstrap.Card.Text>Maximum height (ft): {max_height}</ReactBootstrap.Card.Text>
            <ReactBootstrap.Card.Text>Native to: {region}</ReactBootstrap.Card.Text>
                {/* if plant is in user region and has not been added to garden, show button, otherwise show message */}
                {/* disable if it has been clicked with isAddClicked removed */}
                {/* message & info popover is displayed if not in a user's region */}
                {region === userRegion && !isAdded ?
                    <button
                    className="mt-auto font-weight-bold"
                    disabled={isAddClicked}
                    variant="success"
                    onClick={addToGarden}>Add to garden</button> :
                    <div>{message}</div> }
                {/* if in the /garden page, show the remove from garden button, otherwise no button */}
                {/* disable if it has been clicked with isRemoveClicked */}
                {isAdded && <button
                    className="mt-auto font-weight-bold"
                    variant="success"
                    block="true"
                    //above: display all the way across card
                    disabled={isRemoveClicked}
                    onClick={(event) => { if (window.confirm("Are you sure you want to remove " + common_name + " from your garden?"))
                    removeFromGarden(event)}}>Remove from garden</button>}
            </ReactBootstrap.Card.Body>
        </ReactBootstrap.Card>
    );
}