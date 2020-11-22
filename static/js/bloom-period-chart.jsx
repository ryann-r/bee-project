function BloomPeriodChart () {
    const chartContainer = React.useRef(null);
    const [chartInstance, setChartInstance] = React.useState(null);

    React.useEffect(() => {
        fetch('/api/garden-plant-bloom-periods')
        .then((response) => response.json())
        .then((data) => {
            let periods = [];
            let values = [];
            periods = Object.keys(data.garden_bloom_periods);
            values = Object.values(data.garden_bloom_periods);
            
            const bloomChart = {
                type: 'doughnut',
                data: {
                    labels: periods,
                    datasets: [{
                        label: 'Number of plants',
                        backgroundColor: [],
                        data: values,
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
            };
            
            if (chartContainer && chartContainer.current) {
                const newChartInstance = new Chart(chartContainer.current, bloomChart);
                setChartInstance(newChartInstance);
            }
        });
    }, []);
    return (
        <div>
            <canvas ref={chartContainer} />
        </div>
    )
}