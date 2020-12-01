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
            console.log(periods);
            // order: early, late, mid, year-round
            
            const bloomChart = {
                type: 'doughnut',
                data: {
                    labels: periods,
                    datasets: [{
                        label: 'Number of plants',
                        backgroundColor: [
                            '#C9E4DE',
                            '#F7D9C4',
                            '#FAEDCB',
                            '#F2C6DE'
                            ],
                        data: values,
                        borderColor: '#788977',
                        borderWidth: 1,
                        hoverBorderColor: '#233A19'

                    }]
                },
                options: {
                    title: {
                        display: true,
                        text: 'Plant Bloom Period Distribution'
                    }
                }
            };
            Chart.defaults.global.defaultFontFamily = 'Lato, sans-serif';
            Chart.defaults.global.defaultFontColor = '#fdf8e1';
            Chart.defaults.global.defaultFontSize = 14;
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