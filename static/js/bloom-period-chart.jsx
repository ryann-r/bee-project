function BloomPeriodChart (props) {
    const { bloomChartData } = props;
    const chartContainer = React.useRef(null);
    const [chartInstance, setChartInstance] = React.useState(null);

    React.useEffect(() => {
        if (chartContainer && chartContainer.current) {
            const newChartInstance = new Chart(chartContainer.current, bloomChart);
            setChartInstance(newChartInstance)
        }
    }, [chartContainer]);

    const periods = Object.keys(bloomChartData);
    const numbers = Object.values(bloomChartData);

    console.log({periods})
    console.log({numbers})

    const bloomChart = {
        type: 'doughnut',
        data: {
            labels: ['Early', 'Mid', 'Late', 'Year-round'],
            datasets: [{
                label: 'Number of plants',
                backgroundColor: [],
                data: [1, 2, 3, 4],
                borderColor: [],
                borderWidth: 1,
            }]
        },
        options: {
            title: {
                display: true,
                text: 'Garden Bloom Period Distribution'
            }
        }
    }
    console.log(bloomChart)
    return (
        <div>
            <canvas ref={chartContainer} />
        </div>
    )
}