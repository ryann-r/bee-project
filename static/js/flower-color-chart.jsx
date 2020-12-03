function FlowerColorChart () {
    const chartContainer = React.useRef(null);
    const [chartInstance, setChartInstance] = React.useState(null);

    // possibly need to index keys/values to ensure the correct colors and values are associated
    // with the correct color in the options
    React.useEffect(() => {
        fetch('/api/garden-plant-flower-colors')
        .then((response) => response.json())
        .then((data) => {
            let colors = [];
            let values = [];
            colors = Object.keys(data.garden_flower_colors);
            values = Object.values(data.garden_flower_colors);
            console.log(colors)
            // order: blue, brown, green, orange, pink, purple, red, white, yellow
            const flowerColorChart = {
                type: 'doughnut',
                data: {
                    labels: colors,
                    datasets: [{
                        label: 'Number of plants',
                        backgroundColor: [
                            '#C6DEF1',
                            '#E2CFC4',
                            '#C9E4DE',
                            '#F7D9C4',
                            '#F2C6DE',
                            '#DBCDF0',
                            '#F9C6C9',
                            '#FFFFFF',
                            '#FAEDCB'
                        ],
                        data: values,
                        borderColor: '#233A19',
                        borderWidth: 1,
                        hoverBorderColor: '#788977'
                    }]
                },
                options: {
                    title: {
                        display: true,
                        text: 'Flower Color Distribution'
                    }
                }
            };

            if (chartContainer && chartContainer.current) {
                const newChartInstance = new Chart(chartContainer.current, flowerColorChart);
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