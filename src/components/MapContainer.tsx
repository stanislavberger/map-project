import { YMaps, Map, Placemark, SearchControl, TypeSelector } from '@pbe/react-yandex-maps';
import { useState, useEffect } from 'react';
import axios from 'axios';

/*

ТЕСТОВЫЙ БЛОК для загрузки на карту

type BaloonInfo = {
    title: string;
    typeOfConst: string;
    price: number;
    geoPosition: any;
}

const BaloonInformation: BaloonInfo[] = [
    {title: 'Одорадского 34', typeOfConst: '3x6', price: 35000, geoPosition: [55.75, 37.57]},
    {title: 'Одорадского 39', typeOfConst: '3x6', price: 35000, geoPosition: [55.751, 37.572]},
    
]
*/

interface MapItem {
    address: string;
    lat: number;
    lon: number;
}

const API_KEY: string = import.meta.env.VITE_YANDEX_MAPS_KEY;

const MapContainer: React.FC = () => {

    const [items, setItems] = useState([]);

    useEffect(() => {

        
        // Fetch data from the GIN server

        
        const fetchData = async () => {
            try {
                const response = await axios.get(import.meta.env.VITE_API_URL);
                setItems(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }; 

        fetchData(); 

    })


    // Firebase connection - try to catch these Data

    /*
    const [mapData, setMapData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const querySnapshot = await getDocs(collection(db, "map_items"));
            const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      
            setMapData(data);

          } catch (error) {
            console.error("Error fetching data:", error);
          }
        };
      
        fetchData();
      }, []);
      */


    /* If checkBox: is true, then filter by (isCheked)*/
    
    return (
        <div className="w-2/3 bg-gray-300">
            <YMaps
                query={{
                    load: "package.full",
                    apikey: API_KEY
            }}
            
            >
                
                <div className='w-full h-screen'>
                    
                    <Map
                        defaultState={{
                        center: [55.75, 37.57],
                        zoom: 15,
                        controls: ["zoomControl", "fullscreenControl"],
                        }}
                        className={'mapfull'}
                        modules={["control.ZoomControl", "control.FullscreenControl"]}
                    > 
                    {
                        items.map((items: MapItem, index: number) => (
                            <Placemark
                            key={index}
                            modules={["geoObject.addon.balloon"]}
                            defaultGeometry={[items.lat, items.lon]}
                            properties={{
                              balloonContentBody:
                                '<p>'+ items.address +'</p>'
                            }}

                        />
                        ))
                    }
                
                    </Map>
                </div>
            </YMaps>
        </div>
    )
}

export default MapContainer