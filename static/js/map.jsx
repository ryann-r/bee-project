function MapPlantContainer() {
    $('#regions_div')[0].style.display='block';

    const isGarden = false;
    const [plantData, setPlantData] = React.useState([]);
    // printRegion is set to userRegion on first render if logged in or clicked region upon subsequent renders
    const [isRegion, setIsRegion] = React.useState('');
    const { setUserData, userRegion: user_region, userId: user_id } = React.useContext(UserContext);
    // change to snake_case if sending to backend

    // get user session data from server, set state and user context
    React.useEffect (() => {
        fetch('/api/user-info')
        .then(result => result.json())
        .then(data => {
            setUserData(data)
        })
    }, []);

    // if user is logged in, render plants from userRegion and set printRegion to userRegion
    React.useEffect(() => {
        if (user_id !== null) {
            fetch('api/plants/' + user_region)
            .then((response) => response.json())
            .then((data) => setPlantData(data.plants))
            .then(setIsRegion(user_region));
        }
        }, []);

    // below: geocharts clickable map
    google.charts.load('visualization', 'current', {
    'packages':['geochart'],
    'callback': drawRegionsMap,
    'mapsApiKey': 'GOOGLE_CHARTS_KEY'
    });
    google.charts.setOnLoadCallback(drawRegionsMap);

    function drawRegionsMap() {
        const data = google.visualization.arrayToDataTable([
            ['US State', 'Number of colonies lost April-June 2020'],
            ['US-AK', null], ['US-AL', 4100], ['US-AR', 1900], ['US-AZ', 1300], ['US-CA', 74000],
            ['US-CO', 2100], ['US-CT', 30], ['US-DE', 8], ['US-FL', 39000], ['US-GA', 10000],
            ['US-HI', 40], ['US-IA', 3600], ['US-ID', 14500], ['US-IL', 1500], ['US-IN', 12000],
            ['US-KS', 440], ['US-KY', 1200], ['US-LA', 1800], ['US-MA', 740], ['US-MD', 680],
            ['US-ME', 1300], ['US-MI', 2600], ['US-MN', 6500], ['US-MO', 390], ['US-MS', 3000],
            ['US-MT', 3800], ['US-NC', 1600], ['US-ND', 17500], ['US-NE', 1800], ['US-NH', null],
            ['US-NJ', 760], ['US-NM', 50], ['US-NV', null], ['US-NY', 4900], ['US-OH', 16500],
            ['US-OK', 16000], ['US-OR', 2500], ['US-PA', 1000], ['US-RI', null], ['US-SC', 1700],
            ['US-SD', 4600], ['US-TN', 1200], ['US-TX', 25000], ['US-UT', 2700], ['US-VA', 1200],
            ['US-VT', 260], ['US-WA', 3100], ['US-WI', 1700], ['US-WV', 570], ['US-WY', 1600]
        ]);
        
        const options = {
            title: 'Hives Lost To Colony Collapse Disorder April-June 2020',
            region: 'US',
            displayMode: 'regions',
            resolution: 'provinces',
            colorAxis: { colors: ['#9181B1', '#1E1929']},
            datalessRegionColor: '#E7E4EE',
            backgroundColor: '#E7E4EE',
            legend: {textStyle:
                {color: '#233A19', fontSize: 14, fontName: 'Lato'}
            },
            tooltip: {textStyle: {
                color: '#233A19',
                fontName: 'Lato',
                fontSize: 14
            }
                
            }
        };

        const chart = new google.visualization.GeoChart(document.getElementById('regions_div'));
        
        function selectHandler() {
            const selectedState = chart.getSelection()[0];
            const regions = {'Great Lakes Region' : ['US-MN', 'US-WI', 'US-OH', 'US-MI'],
            'Maritime Northwest Region' : ['US-WA', 'US-OR'], 
            'Mid-Atlantic Region' : ['US-NC', 'US-VA', 'US-MD', 'US-DE', 'US-NJ', 'US-PA', 'US-DC'],
            'Midwest Region' : ['US-IA', 'US-MS', 'US-IL', 'US-IN'], 
            'Northeast Region' : ['US-ME', 'US-VT', 'US-MA', 'US-NH', 'US-RI', 'US-CT', 'US-NY'],
            'Northern Plains Region' : ['US-ND', 'US-SD', 'US-MT', 'US-WY'],
            'Southeast Region' : ['US-AL', 'US-GA', 'US-KY', 'US-LA', 'US-MS', 'US-SC', 'US-TN'],
            'Southern Plains Region' : ['US-CO', 'US-KS', 'US-OK', 'US-AR', 'US-TX'],
            'California' : ['US-CA'],
            'Hawaii' : ['US-HI'],
            'Alaska' : ['US-AK'],
            'Southwest Region' : ['US-NM', 'US-AZ', 'US-ID'],
            'Florida' : ['US-FL'],
            'Rocky Mountain Region' : ['US-UT', 'US-NV', 'US-ID']};
            
            if (selectedState) {
                const state = data.getValue(selectedState.row, 0);
                
                for (let region in regions) {
                    if (regions[region].includes(state)) {
                        console.log(state + ' in ' + region);
                        setIsRegion(region);
                        
                              
                        fetch('api/plants/' + region)
                            .then((response) => response.json())
                            .then((data) => setPlantData(data.plants));

                        if (plantData.length === 0) {
                            return (
                                <ReactBootstrap.Row className="row justify-content-center m-4">
                                    <span className="m-2"><i className="fas fa-leaf"></i></span>
                                    <h3>Loading...</h3>
                                </ReactBootstrap.Row>
                            );
                        }
                    }
                }
            };
        }

    chart.draw(data, options);
    google.visualization.events.addListener(chart, 'select', selectHandler);   
    };

    // push plant data as DisplayPlantCards to plants array, return plants and text
    const plants = [];
    
    for (const plant of plantData) {
        plants.push(
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
        )
    };

    const mapPopover = (
        <ReactBootstrap.Popover id="map-popover" className="purple-background">
            <ReactBootstrap.Popover.Title className="purple-background" as="h3">It's when worker bees suddenly disappear and the hive dies.</ReactBootstrap.Popover.Title>
            <ReactBootstrap.Popover.Content>
            There are a variety of causes, including the overuse of agricultural neonicotinoid pesticides. 
            Since 2006, about 30% of hives are lost each winter.
            </ReactBootstrap.Popover.Content>
        </ReactBootstrap.Popover>
    );

    const MapPopover = () => (
        <ReactBootstrap.OverlayTrigger trigger="click" placement="top" overlay={mapPopover}>
            <ReactBootstrap.Button className="map-popover-btn btn-sm">What is Colony Collapse Disorder?</ReactBootstrap.Button>
        </ReactBootstrap.OverlayTrigger>
    );

    return (
        <React.Fragment>
            <ReactBootstrap.Container fluid>
                    <ReactBootstrap.Row className="purple-background pb-2">
                        <ReactBootstrap.Col className="pl-4">Number of bee colonies lost to Colony Collapse Disorder April-June 2020</ReactBootstrap.Col>
                        <ReactBootstrap.Col className="col-4 mt-0"><MapPopover /></ReactBootstrap.Col>
                    </ReactBootstrap.Row>
                    <ReactBootstrap.Row className="ml-2 pt-2 pb-2">{!user_id && <h2>Please log in or sign up to collect your favorite native plants in a garden!</h2>}</ReactBootstrap.Row>
                    <ReactBootstrap.Row className="ml-2 pb-2"><h2>Click the map to view native plants by region</h2></ReactBootstrap.Row>
                    <ReactBootstrap.Row className="m-2 pt-4 pb-2">{isRegion && <h1>You're viewing pollinator plants native to: {isRegion}</h1>}</ReactBootstrap.Row>
                    
                    <ReactBootstrap.Row className="row justify-content-md-center mb-4 mt-4">{plants}</ReactBootstrap.Row>

            </ReactBootstrap.Container>
        </React.Fragment>
    );
};

