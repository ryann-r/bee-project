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
        <ReactBootstrap.Card>
            <ReactBootstrap.Card.Header>Did you know?</ReactBootstrap.Card.Header>
            <ReactBootstrap.Card.Body>
                <blockquote className="blockquote mb-0">
                    <p>{pollinatorFact}</p>
                </blockquote>
                <button variant="success" onClick={handleClick}>Tell me more about pollinators!</button>
            </ReactBootstrap.Card.Body>
        </ReactBootstrap.Card>
    )

        //     <ReactBootstrap.Accordion defaultActiveKey="0">
        //     {/* SECTION 1 */}
        //         <ReactBootstrap.Card>
        //             <ReactBootstrap.Header>
        //                 <ReactBootstrap.Toggle as={ReactBootstrap.Card.Header} eventKey="0">
        //                     Buzz buzz buzz. Did you know...
        //                 </ReactBootstrap.Toggle>
        //             </ReactBootstrap.Header>
        //             <ReactBootstrap.Accordion.Collapse eventKey="0">
        //                 <ReactBootstrap.Card.Body>One in three bites of food exists in great thanks
        //                     to the hard work of pollinators like bees, butterflies, beetles,
        //                     flies, moths, bats, and birds.
        //                 </ReactBootstrap.Card.Body>
        //             </ReactBootstrap.Accordion.Collapse>
        //         </ReactBootstrap.Card>
        //     {/* SECTION 2 */}
        //         <ReactBootstrap.Card>
        //             <ReactBootstrap.Header>
        //                 <ReactBootstrap.Toggle as={ReactBootstrap.Card.Header} eventKey="1">
        //                     I like food. How are they doing in this changing world?
        //                 </ReactBootstrap.Toggle>
        //             </ReactBootstrap.Header>
        //             <ReactBootstrap.Accordion.Collapse eventKey="1">
        //                 <ReactBootstrap.Card.Body>
        //                     Not great. Habitat loss, disease, parasites, and pollutants threaten
        //                     all varieties of pollinators.
        //                 </ReactBootstrap.Card.Body>
        //             </ReactBootstrap.Accordion.Collapse>

        //         </ReactBootstrap.Card>

        //         <ReactBootstrap.Card>
        //             <ReactBootstrap.Header>
        //                 <ReactBootstrap.Toggle as={ReactBootstrap.Card.Header} eventKey="2">
        //                     Tell me more about native bees, please.
        //                 </ReactBootstrap.Toggle>
        //             </ReactBootstrap.Header>
        //             <ReactBootstrap.Accordion.Collapse eventKey="2">
        //                 <ReactBootstrap.Card.Body>
        //                     There are more than 3,500 native bee species in the United States.
        //                     Colony Collapse Disorder occurs when the worker bees, those that gather
        //                     pollen food for the hive, suddenly disappear. There are a variety of causes,
        //                     including the overuse of agricultural neonicotinoid pesticides. Since 2006, 
        //                     about 30% of hives are lost each winter.
        //                 </ReactBootstrap.Card.Body>
        //             </ReactBootstrap.Accordion.Collapse>
        //         </ReactBootstrap.Card>

        //         <ReactBootstrap.Card>
        //             <ReactBootstrap.Header>
        //                 <ReactBootstrap.Toggle as={ReactBootstrap.Card.Header} eventKey="3">
        //                     Can I help?
        //                 </ReactBootstrap.Toggle>
        //             </ReactBootstrap.Header>
        //             <ReactBootstrap.Accordion.Collapse eventKey="3">
        //                 <ReactBootstrap.Card.Body>
        //                     Absolutely! Here's where we come in.
        //                     One of the best things you can do is to plant pollinator-friendly 
        //                     plants native to your region in your garden or window-box.
        //                     Start by exploring (LINK) regional plants, and sign up to collect
        //                     your favorites in a virutal garden.
        //                 </ReactBootstrap.Card.Body>
        //             </ReactBootstrap.Accordion.Collapse>
        //         </ReactBootstrap.Card>
        // </ReactBootstrap.Accordion>
        // )

};