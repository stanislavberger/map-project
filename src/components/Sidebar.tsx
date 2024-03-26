import axios from "axios";
import { useState, useEffect } from "react";
import { Select, Button } from 'antd'


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
    }

    //counter active checkbox

    const SumCheckBox: number = isChecked.filter((value) => value === true).length;
    
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

    //Set conditionals

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
            <div className="flex flex-row justify-center items-center">
                <div className="p-4 w-1/2">
                    <p className="font-bold">ИТОГО: </p> 
                    <p>Всего конструкций: {sumItems} шт.</p>
                    <p>Выделено конструкций: {SumCheckBox} шт.</p>
                    <p>Сумма кампании: <span className="text-lg font-bold">{totalNum} ₽</span></p> 
                </div>
                <div className="w-1/2 flex justify-center align-middle">
                    <Button className="text-white h-10 font-bold border-2">Создать кампанию</Button>
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