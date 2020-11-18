function FlowerColorChart (props) {
    const { flowerColorData } = props;
    const chartContainer = React.useRef(null);
    const [chartInstance, setChartInstance] = React.useState(null);

    React.useEffect(() => {
        if (chartContainer && chartContainer.current) {
            const newChartInstance = new Chart(chartContainer.current, flowerColorChart);
            setChartInstance(newChartInstance)
        }
    }, [chartContainer]);

    const flowerColors = Object.keys(flowerColorData);
    const numbers = Object.values(flowerColorData);

    const flowerColorChart = {
        type: 'doughnut',
        data: {
            labels: flowerColors,
            datasets: [{
                label: 'Number of plants',
                backgroundColor: [
                ],
                data: numbers,
                borderColor: [],
                borderWidth: 1,
            }]
        },
        options: {
            title: {
                display: true,
                text: 'Flower Color Distribution'
            }
        }
    }
    return (
        <div>
            <canvas ref={chartContainer} />
        </div>
    )
}