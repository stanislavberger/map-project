import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { Select } from 'antd'
import TotalPanel from "./TotalPanel";



interface SideBarItems {
    address: string;
    GID: string;
    district: string;
    typeConst: string;
    price: number;
    img: string;
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

        // create new Array checked Items
        /*
        const newItems = [...items];

        if (newCheckedState[index] = true) {
            newItems[index].isChecked = true;
        }

        const isCheckedItems = [...newItems.filter(newItems => newItems.isChecked)]
        */
    }


    //counter active checkbox

    const sumCheckBox: number = isChecked.filter((value) => value === true).length;
   
    //unique values const

    const [selectedDistrict, setSelectedDistrict] = useState<string | null>(null);
    const [selectedTypeConst, setSelectedTypeConst] = useState<string | null>(null);

    // send to SELECTORS
   const uniqueDistricts:string[]= Array.from(new Set(items.map((item: SideBarItems) => item.district)));
   const uniqueTypeConst:string[] = Array.from(new Set(items.map((item: SideBarItems) => item.typeConst)));

    const handleDistrictChange = (value: string) => {
        setSelectedDistrict(value === 'Все элементы' ? null : value);
    }
    const handleTypeConstChange = (value: string) => {
        setSelectedTypeConst(value === 'Все элементы' ? null : value);
    }

    //Set conditionals and filter for District and Type of Constructions

   const filteredItems: SideBarItems[] = items.filter((items: SideBarItems) => {
        if (selectedDistrict && items.district !== selectedDistrict) {
            return false;
        }
        if (selectedTypeConst && items.typeConst !== selectedTypeConst) {
            return false;
        }
        return true;
    }); 
    
    //counter pirce

    const totalPrice = (filteredItems: { price: number }[], isChecked: boolean[]) => {
        let totalNum = 0;
        for (let i = 0; i <filteredItems.length; i++) {
            if (isChecked[i]) {
                totalNum += filteredItems[i].price;
            }
        }
        return totalNum;
    }

    let totalNum: number = totalPrice(filteredItems, isChecked);

    // Filtered Array and Selected
    /*
    const selectedItems = filteredItems.reduce((selected, item, index) => {
        if (isChecked[index]) {
            selected.push(item);
        }
        return selected;
    }, []);
    
    */
    
   
    /*
    export const getSelectedItems = (filteredItems, isChecked) => {
        const selectedItems = filteredItems.reduce((selected, item, index) => {
            if (isChecked[index]) {
                selected.push(item);
            }
            return selected;
        }, []);
    
        console.log(selectedItems);
    };
    */


    return(
        <div className="md:w-1/3 md:h-screen sm:w-full sm:h-auto sm:relative sm:z-0">
            <div className="pl-4 pt-5 mb-2">
                <h1 className="font-bold text-2xl">Планировщик кампаний</h1>
            </div>
            <div className="md:container p-4 h-4/5 overflow-y-auto sm:w-full sm:m-auto sm:mt-auto">
                <div className="md:border rounded overflow-hidden sm:w-full">
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
                    <div className="border-b sm:w-full" >
                        <button className="w-full py-2 bg-gray-800 hover:bg-gray-300 text-left">
                            Список поверхностей
                        </button>
                        <div className="py-2 h-4/6">
                        <label htmlFor="filterCheckbox">Фильтровать элементы</label>
                            <ul className="w-full">
                                {
                                   filteredItems.map((items: SideBarItems, index) => (
                                    <li key={index} className="border-b border-slate-300 border-solid w-full p-4 text-sm flex flex-row sm:p-2">
                                        <div className="flex w-1/3">
                                            <input className="mr-3 sm:mr-2" type="checkbox" checked={isChecked[index]} onClick={() => handleClick(index)} onChange={() => {}} />
                                            <img src={items.img} alt="" className="object-contain rounded-sm" />
                                        </div>
                                        <div className="flex w-2/3 flex-col pl-9">
                                            <p className="text-bold">Адрес: <span className="font-bold">{items.address}</span></p>
                                            <p>GID: <span className="font-bold">{items.GID}</span></p>
                                            <p>Район: <span className="font-bold">{items.district}</span></p>
                                            <p>Тип конструкции: <span className="font-bold">{items.typeConst}</span></p>
                                            <p>Стоимость: <span className="font-bold">{items.price}</span></p>
                                            
                                        </div>
                                        
                                    </li>
                                   )) 
                                }
                                
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <TotalPanel
                totalNum={sumItems}
                totalChecked={sumCheckBox}
                totalSum={totalNum}
            />

        </div>
    )
}


export default SideBar
