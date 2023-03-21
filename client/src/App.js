import { useState, useEffect } from "react";

import './App.css';

import SightingsForm from "./SightingsForm";
import SightingsGrid from "./SightingsGrid";
import { getSightings } from "./SightingService";

function App() {

  const [birdSightings, setBirdSightings] = useState([]);

  useEffect(() => {
    getSightings().then((allSightings) => {
      setBirdSightings(allSightings);
    })
  }, []);

  const addSighting = (sighting) => {
    setBirdSightings([...birdSightings, sighting]);
  }

  const updateSighting = (id) => {
    const newSightings = [...birdSightings];

    getSightings(id)
      .then((sighting) => {
        for (let i = 0; i < newSightings.length; i++) {
          if (newSightings[i]._id === id) {
            newSightings[i] = sighting;
          }
      }

      setBirdSightings(newSightings);
    });
  };

  const removeSighting = (id) => {
    const sightingsToKeep = birdSightings.filter(sighting => sighting._id !== id)
    setBirdSightings(sightingsToKeep);
  }

  return (
    <>
      <SightingsForm addSighting={addSighting} />
      <SightingsGrid sightings={birdSightings} removeSighting={removeSighting} updateSighting={updateSighting}/>
    </>
  );
}

export default App;
