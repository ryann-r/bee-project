// // kitchen sink

// // from return of DisplayPlantCards

// <div className="page-container">
//             <PlantCard
//             plant_id={plant_id}
//             common_name={common_name}
//             image_url={image_url}
//             scientific_name={scientific_name}
//             plant_type={plant_type}
//             flower_color={flower_color}
//             bloom_period={bloom_period}
//             life_cycle={life_cycle}
//             max_height={max_height}
//             notes={notes}
//             region={region}
//             user_region={user_region}
//             user_id={user_id} />
//             <footer>
//             </footer>
//         </div>
//     );
// }

// // add user_id to props
// function PlantCard (props) {
//     const { plant_id, common_name, scientific_name, region, plant_type,
//     flower_color, bloom_period, life_cycle, max_height, notes, 
//     image_url, user_region } = props;
    
//     const [flipped, setFlipped] = React.useState(false);

//     const handleMouseOver = () => {
//         setFlipped(!flipped);
//     }

//     return (
//         <div onMouseOver={handleMouseOver}
//         className={flipped ? "card-container flipped" : "card-container"}>
            
//             <Front
//             common_name={common_name} 
//             image_url={image_url} 
//             scientific_name={scientific_name} />
            
//             <Back
//             plant_id={plant_id}
//             common_name={common_name} 
//             image_url={image_url} 
//             scientific_name={scientific_name}
//             plant_type={plant_type} 
//             flower_color={flower_color} 
//             bloom_period={bloom_period}
//             life_cycle={life_cycle}
//             max_height={max_height}
//             notes={notes}
//             user_region={user_region} 
//             region={region} 
//             user_region={user_region} />
//         </div>
//         );
// }


// function Front (props) {
//     const { common_name, scientific_name, image_url } = props;

//     return (
//         <div className="front">
//             <ImageArea image_url={image_url} common_name={common_name}/>
//             <MainArea common_name={common_name}
//             scientific_name={scientific_name}/>
//         </div>
//     )
// }

// //pass in region and session user_region for conditional button
// function Back (props) {
//     const { plant_id, common_name, scientific_name, plant_type,
//     flower_color, bloom_period, life_cycle, max_height, notes,
//     region, user_region } = props;
    
//     // post request to add plant to user garden
//     const addToGarden = (event) => {
//         event.preventDefault();
//         fetch('/api/add-to-garden', {
//                 method: 'POST',
//                 body: JSON.stringify( { plant_id } ),
//                 headers: { 'Content-Type': 'application/json' },
//             })
//     }
//     // post request to remove plant from user garden
//     const removeFromGarden = (event) => {
//         event.preventDefault();
//         fetch('/api/remove-from-garden', {
//                 method: 'POST',
//                 body: JSON.stringify({ plant_id }),
//                 headers: { 'Content-Type': 'application/json' },
//             });
//     }
//     // conditional button: if plant region != user_region hide button
//     // toggle between addToGarden and removeFromGarden buttons
//     // if user: button
//         // if user_region !== plant region, disable button or alert "cannot add to garden, not native to your region"
//                                 // need to use state?
//         // else:
//             // toggle addToGarden and removeFromGarden: based on plants in garden (session?) OR 

//     return (
//         <div className="back">
//             <h1>{common_name}</h1>
//             <p>{scientific_name}</p>
//             <p>Plant type: {plant_type}</p>
//             <p>Flower color: {flower_color}</p>
//             <p>Bloom period: {bloom_period}</p>
//             <p>Life cycle: {life_cycle}</p>
//             <p>Maximum height (ft): {max_height}</p>
//             <p>Notes: {notes}</p>
//             <p>plant_id: {plant_id}</p>
//             <button onClick={addToGarden}>Add to garden</button>
//             <button onClick={removeFromGarden}>Remove from garden</button>
//             {/* disabled={addPlant} --> will this disable after added to state? */}
//         </div>
//     )
// }


// function ImageArea (props) {
//     const { image_url, common_name } = props;
//     return (
//         <div className="image-container">
//             <img className="card-image"
//             src={image_url} alt={common_name} width='400px'></img>
//         </div>
//     )
// }

// function MainArea (props) {
//     const { common_name, scientific_name } = props;
//     return (
//         <div className="main-area">
//             <div className="plant-card">
//                 <h1>{common_name}</h1>
//                 <p>{scientific_name}</p>
//                 <p className="read-more">Hover to see more details</p>
//             </div>
//         </div>
//     )
// }