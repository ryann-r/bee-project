function Home() {
    $('#regions_div')[0].style.display='none';
    const {userId, fname} = React.useContext(UserContext);
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
            {userId ? <div>Welcome, {fname}</div> : <div>Welcome, visitor</div>}
            <img src='/static/img/plant/clover-bee.jpg' width='900px'></img>
            <div>{pollinatorFact}</div>
            <button onClick={handleClick}>Tell me more about pollinators!</button>
        </React.Fragment> 
    );
}