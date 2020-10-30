// //"""Google charts geochart map."""

// google.charts.load('visualization', 'current', {
// 'packages':['geochart'],
// 'callback': drawRegionsMap,
// 'mapsApiKey': 'GOOGLE_MAPS_KEY'
// });
// google.charts.setOnLoadCallback(drawRegionsMap);

// function drawRegionsMap() {
//     const data = google.visualization.arrayToDataTable([
//         ['US State', 'Color'],
//         ['US-AK', 1], ['US-AL', 2], ['US-AR', 3], ['US-AZ', 4], ['US-CA', 5],
//         ['US-CO', 6], ['US-CT', 7], ['US-DE', 8], ['US-FL', 9], ['US-GA', 10],
//         ['US-HI', 11], ['US-IA', 12], ['US-ID', 13], ['US-IL', 14], ['US-IN', 15],
//         ['US-KS', 16], ['US-KY', 17], ['US-LA', 18], ['US-MA', 19], ['US-MD', 20],
//         ['US-ME', 21], ['US-MI', 22], ['US-MN', 23], ['US-MO', 24], ['US-MS', 25],
//         ['US-MT', 26], ['US-NC', 27], ['US-ND', 28], ['US-NE', 29], ['US-NH', 30],
//         ['US-NJ', 31], ['US-NM', 32], ['US-NV', 33], ['US-NY', 34], ['US-OH', 35],
//         ['US-OK', 36], ['US-OR', 37], ['US-PA', 38], ['US-RI', 39], ['US-SC', 40],
//         ['US-SD', 41], ['US-TN', 42], ['US-TX', 43], ['US-UT', 44], ['US-VA', 45],
//         ['US-VT', 46], ['US-WA', 47], ['US-WI', 48], ['US-WV', 49], ['US-WY', 50]
//     ]);

//     // change values to reflect number of threatened native bees in each state

    
//     const options = {
//         title: 'North American bees and pollinator plants',
//         region: 'US',
//         displayMode: 'regions',
//         resolution: 'provinces',
//         colorAxis: { colors: ['#FFB6C1', '#b11226'] }
//     };

//     const chart = new google.visualization.GeoChart(document.getElementById('regions_div'));
    
//     function selectHandler() {
//         const selectedState = chart.getSelection()[0];
//         const regions = {'Great Lakes Region' : ['US-MN', 'US-WI', 'US-OH', 'US-MI'],
//         'Maritime Northwest Region' : ['US-WA', 'US-OR'], 
//         'Mid-Atlantic Region' : ['US-NC', 'US-VA', 'US-MD', 'US-DE', 'US-NJ', 'US-PA', 'US-DC'],
//         'Midwest Region' : ['US-IA', 'US-MS', 'US-IL', 'US-IN'], 
//         'Northeast Region' : ['US-ME', 'US-VT', 'US-MA', 'US-NH', 'US-RI', 'US-CT', 'US-NY'],
//         'Northern Plains Region' : ['US-ND', 'US-SD', 'US-MT', 'US-WY'],
//         'Southeast Region' : ['US-AL', 'US-GA', 'US-KY', 'US-LA', 'US-MS', 'US-SC', 'US-TN'],
//         'Southern Plains Region' : ['US-CO', 'US-KS', 'US-OK', 'US-AR', 'US-TX'],
//         'California' : ['US-CA'], 'Hawaii' : ['US-HI'], 'Alaska' : ['US-AK'],
//         'Southwest Region' : ['US-NM', 'US-AZ', 'US-ID']}

//         if (selectedState) {
//             const state = data.getValue(selectedState.row, 0);
//             console.log(state);
//             for (region in regions) {
//                 if (regions[region].includes(state)) {
//                     console.log(state + ' in ' + region)
//                     fetch('/api/plants/' + region);
//                     // make region a variable to pass into PlantContainer
//                     // export to app.jsx & import into app.jsx
//                     // or move map to app.jsx
//                 }
//             }   

//         };
//     }
    

//     chart.draw(data, options);
//     google.visualization.events.addListener(chart, 'select', selectHandler);
       
// };