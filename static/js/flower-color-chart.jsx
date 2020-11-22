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
            
            const flowerColorChart = {
                type: 'doughnut',
                data: {
                    labels: colors,
                    datasets: [{
                        label: 'Number of plants',
                        backgroundColor: [
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(255, 159, 64, 0.2)',
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(248, 202, 250, 0.2',
                            'rgba(255, 255, 255, 0.2)',
                            'rgba(145, 132, 132, 0.2)'
                        ],
                        data: values,
                        borderColor: [],
                        borderWidth: 1,
                    }]
                },
                options: {
                    title: {
                        display: true,
                        text: 'Garden Flower Color Distribution'
                    }
                }
            };

            if (chartContainer && chartContainer.current) {
                const newChartInstance = new Chart(chartContainer.current, flowerColorChart);
                setChartInstance(newChartInstance);
            }
        });
    }, []);

    // { 'Blue': 0, 'Purple': 0, 'Yellow': 0,
    //   'Green': 0, 'Orange': 0, 'Red': 0,
    //   'Pink': 0, 'White': 0, 'Brown': 0 }
    return (
        <div>
            <canvas ref={chartContainer} />
        </div>
    )
}