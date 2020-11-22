function GardenContainer() {
    $('#regions_div')[0].style.display='none';
    const isGarden = true;
    const {setUserData, userId: user_id, fname} = React.useContext(UserContext);
    const [plantData, setPlantData] = React.useState([]);
    const [gardenTip, setGardenTip] = React.useState([]);
    // get data (array) from server and pass to GardenBloomChart component as prop
    // const [bloomChartData, setBloomChartData] = React.useState([]);
    // get data (array) from server and pass to FlowerColorChart component as prop
    // const [flowerColorData, setFlowerColorData] = React.useState([]);
    
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
            <DisplayPlantCards
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

    let message;
    // if a user is signed in and has 0 plants in their garden
    if (user_id && plantData.length === 0) {
        message = <div>Your garden is empty. Explore pollinator plants native to your region and add them.</div>;
    } // if a user is not logged in
    if (!user_id) {
        message = <div>Please log in or sign up to continue.</div>
    }
    
    return (
        <React.Fragment>
            {user_id && <h1>{ fname }'s Garden</h1>}
            <h2>{message}</h2>
            {user_id && <p>{gardenTip}</p>}
            <button onClick={handleClick}>Give me another tip!</button>
            {user_id && gardenPlants}
            {user_id && <BloomPeriodChart />}
            {user_id && <FlowerColorChart />}
        </React.Fragment>
    );
}