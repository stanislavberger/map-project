import axios from "axios";
import { useState, useEffect } from "react";
import { Select } from 'antd'

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
    
    //unique values const

    const [selectedDistrict, setSelectedDistrict] = useState<string | null>(null);
    const [selectedTypeConst, setSelectedTypeConst] = useState<string | null>(null);

    // send to SELECTORS
   const uniqueDistricts = Array.from(new Set(items.map(item => item.district)));
   const uniqueTypeConst = Array.from(new Set(items.map(item => item.typeConst)));

    const handleDistrictChange = (value: string) => {
        setSelectedDistrict(value === 'Все элементы' ? null : value);
    }
    const handleTypeConstChange = (value: string) => {
        setSelectedTypeConst(value === 'Все элементы' ? null : value);
    }

    //Set conditionals

   const filteredItems = items.filter(items => {
        if (selectedDistrict && items.district !== selectedDistrict) {
            return false;
        }
        if (selectedTypeConst && items.typeConst !== selectedTypeConst) {
            return false;
        }
        return true;
    }); 
    
    //counter pirce
    const totalPrice = () => {
        let totalNum = 0;
        for (let i = 0; i <filteredItems.length; i++) {
            if (isChecked[i]) {
                totalNum += filteredItems[i].price;
            }
        }
        return totalNum;
    }

    let totalNum: number = totalPrice(filteredItems);


    return(
        <div className="w-1/3">
            <div className="container p-4">
                <div>
                    <h1 className="font-bold text-2xl">Планировщик кампаний</h1>
                </div>
                <div className=" border rounded overflow-hidden">
                    <div className="border-b">
                        <button className="w-full py-2 px-4 bg-gray-800 hover:bg-gray-300 text-left">
                            Список фильтров
                        </button>
                        <div className="py-2 px-4">
                            <Select 
                                defaultValue="Выберите тип конструкии"
                                className="bg-gray-900 font-white"
                                options={uniqueTypeConst.map(type => ({ value: type, label: type }))}
                                onChange={handleTypeConstChange}
                            />
                            <Select 
                                defaultValue="Выберите район"
                                options={uniqueDistricts.map(district => ({ value: district, label: district }))}
                                onChange={handleDistrictChange}
                            />
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
                                   filteredItems.map((items: SideBarItems, index) => (
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
                            <p>Сумма кампании: {totalNum}</p>                                  
                            
                </div>
            </div>
        </div>
    )
}


export default SideBar


/* 
{[
                                    {value: 'Щиты 6х3 Статика', label: 'Щиты 6х3 Статика'},
                                    {value: 'Щиты 6х3 Digital', label: 'Щиты 6х3 Digital'},
                                    {value: 'Ситиформат 1,2х1,8', label: 'Ситиформат 1,2х1,8'},
                                    {value: 'Пиллары 1,4х3', label: 'Пиллары 1,4х3'},
                                    {value: 'Ситиборды 2,7х3,7', label: 'Ситиборды 2,7х3,7'},
                                    {value: 'Супресайты 5х12', label: 'Супресайты 5х12'},
                                ]}
*/