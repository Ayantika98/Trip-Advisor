import React, { useEffect, useState } from "react";
import { CssBaseline, Grid } from "@material-ui/core";
import Header from './Header/Header';
import List from './List/List';
import Map from './Map/Map';
import { getPlacesData } from "./api/index";

const App = () => {
    const [places, setPlaces] = useState([]);
    const [filteredPlaces, setFilteredPlaces] = useState([]);
    const [coords, setCoords] = useState({});
    const [bounds, setBounds] = useState(null);
    const [childChicked, setChildClicked] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [type, setType] = useState('restaurants');
    const [rating, setRating] = useState(0);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
            setCoords({ lat: latitude, lng: longitude });
        })
    }, []);

    useEffect(() => {
        const filteredPlaces = places?.filter((place) => place?.rating > rating);
        setFilteredPlaces(filteredPlaces);
    }, [rating]);

    useEffect(() => {
        getPlacesData(type, bounds?.ne, bounds?.sw)
            .then((data) => {
                setPlaces(data);
                setFilteredPlaces([]);
                setIsLoading(false);
            })
    }, [type, coords, bounds]);

    return (
        <>
            <CssBaseline />
            <Header />
            <Grid container spacing={3} style={{ width: '100%' }}>
                <Grid item xs={12} md={4}>
                    <List
                        places={filteredPlaces?.length ? filteredPlaces : places}
                        childChicked={childChicked}
                        isLoading={isLoading}
                        type={type}
                        setType={setType}
                        rating={rating}
                        setRating={setRating}
                    />
                </Grid>
                <Grid item xs={12} md={8}>
                    <Map
                        setCoords={setCoords}
                        setBounds={setBounds}
                        coords={coords}
                        places={filteredPlaces?.length ? filteredPlaces : places}
                        setChildClicked={setChildClicked}
                    />
                </Grid>
            </Grid>
        </>
    )
}

export default App;