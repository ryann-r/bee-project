function DisplayPlantCards (props) {
    const { plant_id, common_name, scientific_name, region, plant_type,
    flower_color, bloom_period, life_cycle, max_height, notes, image_url, isGarden } = props;
    // get session user region
    const {userRegion} = React.useContext(UserContext);
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
            alert("This plant is already in your garden!");
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
    // CHANGE: confirm remove popupbefore actually removing
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
            alert(common_name + " removed from your garden.");
        }
    let message;
    if (region !== userRegion) {
        message = <p>This plant is not native to your region.</p>
        // message to display when exploring plants not in a users region
        // add 'click to learn more' --> raises a bootstrap alert with explanation
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
        <ReactBootstrap.CardDeck>
        <ReactBootstrap.Card border="dark" style={{ width: '10rem' }}>
        <ReactBootstrap.Card.Img variant="top" src={image_url} />
        <ReactBootstrap.Card.Body>
            <ReactBootstrap.Card.Title><p>{common_name}</p> <p>{scientific_name}</p></ReactBootstrap.Card.Title>
            {/* italicize scientific name */}
            <ReactBootstrap.Card.Text>
                {notes}
            </ReactBootstrap.Card.Text>
        </ReactBootstrap.Card.Body>
        <ReactBootstrap.ListGroup className="list-group-flush">
            <ReactBootstrap.ListGroupItem>Native to: {region}</ReactBootstrap.ListGroupItem>
            <ReactBootstrap.ListGroupItem>Plant type: {plant_type}</ReactBootstrap.ListGroupItem>
            <ReactBootstrap.ListGroupItem>Bloom period: {bloom_period}</ReactBootstrap.ListGroupItem>
            <ReactBootstrap.ListGroupItem>Life cycle: {life_cycle}</ReactBootstrap.ListGroupItem>
            <ReactBootstrap.ListGroupItem>Flower color: {flower_color}</ReactBootstrap.ListGroupItem>
            <ReactBootstrap.ListGroupItem>Maximum height (ft): {max_height}</ReactBootstrap.ListGroupItem>
        </ReactBootstrap.ListGroup>
        <ReactBootstrap.Card.Body>
            {/* if plant is in user region and has not been added to garden, show button, otherwise show message */}
            {/* disable if it has been clicked with isAddClicked removed */}
            {region === userRegion && !isAdded ? <button disabled={isAddClicked}
            variant="outline-dark" onClick={addToGarden}>Add to garden</button> :
            <div>{message}</div> }
            {/* if in the /garden page, show the remove from garden button, otherwise no button */}
            {/* disable if it has been clicked with isRemoveClicked */}
            {isAdded && <button disabled={isRemoveClicked} variant="outline-danger"
            onClick={removeFromGarden}>Remove from garden</button>}
        </ReactBootstrap.Card.Body>
        </ReactBootstrap.Card>
        </ReactBootstrap.CardDeck>
    );
}

// TERNARY button: conditional button. can't use if / else inside of jsx. basically like an if/else. 
// saying: if condition is true, do the first thing before the colon, if false do the thing after the colon
// if you want it to be conditionally rendered, not an alternative:
    // {region === userRegion && <button variant="primary" onClick={addToGarden}>Add to garden</button>}
// conditional does "short circuiting". if you have &&, if the first is false, it'll only do the second if the first is true
// react won't render what's false
// OR put null in p tag