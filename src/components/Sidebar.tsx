import axios from "axios";
import { useState, useEffect } from "react";

interface SideBarItems {
    address: string;
    GID: string;
    district: string;
    typeConst: string;
    price: number;
    isChecked: boolean;
}

const SideBar: React.FC = () => {
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

    const sumItems: number = items.length; //SUM of all items
   

    const [isChecked, setIsChecked] = useState<boolean[]>([]);
    
    
    //old solution
    /*
    const handleClick = () => {
      setIsChecked(!isChecked);
    };
    */

    //handleClick for CheckBoxes

    const handleClick = (index: number) => {
        const newCheckedState = [...isChecked]; // create new Array based prev
        newCheckedState[index] = !newCheckedState[index];
        setIsChecked(newCheckedState);
    }

    //counter active checkbox

    const SumCheckBox: number = isChecked.filter((value) => value === true).length;

    

    return(
        <div className="w-1/3">
            <div className="container p-4">
                <div>
                    <h1 className="font-bold text-2xl">Планировщик кампаний</h1>
                </div>
                <div className=" border rounded overflow-hidden">
                    <div className="border-b">
                        <button className="w-full py-2 px-4 bg-gray-800 hover:bg-gray-300 text-left">
                            Формат
                        </button>
                        <div className="py-2 px-4">
                            <p>Здесь можно выбрать форматы</p>
                        </div>
                    </div>
                    <div className="border-b">
                        <button className="w-full py-2 bg-gray-800 hover:bg-gray-300 text-left">
                            Список поверхностей
                        </button>
                        <div className="py-2 h-4/6">
                        <label htmlFor="filterCheckbox">Фильтровать элементы</label>
                            <ul className="w-full">
                                {
                                   items.map((items: SideBarItems, index) => (
                                    <li key={index} className="border-b border-slate-300 border-solid w-full p-4 text-sm">
                                        <p className="text-bold">Адрес: <span className="font-bold">{items.address}</span></p>
                                        <p>GID: <span className="font-bold">{items.GID}</span></p>
                                        <p>Район: <span className="font-bold">{items.district}</span></p>
                                        <p>Тип конструкции: <span className="font-bold">{items.typeConst}</span></p>
                                        <p>Стоимость: <span className="font-bold">{items.price}</span></p>
                                        <input type="checkbox" checked={isChecked[index]} onClick={() => handleClick(index)} onChange={() => {}} />
                                        
                                    </li>
                                   )) 
                                }
                                
                            </ul>
                        </div>
            
                    </div>
                </div>
                <div>
                            ИТОГО: 
                            <p>Всего конструкций: {sumItems}</p>
                            <p>Выделено конструкций: {SumCheckBox}</p>                               
                            
                </div>
            </div>
        </div>
    )
}


export default SideBar


