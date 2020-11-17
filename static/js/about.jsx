function About() {
    $('#regions_div')[0].style.display='none';
    return (
        <React.Fragment>
        <h1>Buzz buzz. Did you know...</h1>
        <div>One in three bites of food exists in great thanks to the hard work
            of pollinators like bees, butterflies, beetles, flies, moths, 
            bats, and birds.
        </div>
        <h2>I like food. How are they doing in this changing world?</h2>
        <div>Not great. Habitat loss, disease, parasites, and pollutants threaten
            all varieties of pollinators.
        </div>
        <h2>Tell me more about native bees, please.</h2>
        <div>There are more than 3,500 native bee species in the United States.
        Colony Collapse Disorder occurs when the worker bees, those that gather
        pollen food for the hive, suddenly disappear. There are a variety of causes,
        including the overuse of agricultural neonicotinoid pesticides. Since 2006, 
        about 30% of hives are lost each winter.
        </div>
        <h2>Can I help?</h2>
        <div>Absolutely! Here's where we come in.
            <p>One of the best things you can do is to plant pollinator-friendly 
                plants native to your region in your garden or window-box.</p>
            <p>Start by exploring (LINK) regional plants, and sign up to collect
                your favorites in a virutal garden.
            </p>
                </div>
        </React.Fragment>
    )
};