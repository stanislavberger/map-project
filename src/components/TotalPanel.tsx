import { Button } from "antd";

interface totalNumbers {
    totalNum: number;
    totalChecked: number;
    totalSum: number;
}

const TotalPanel: React.FC<totalNumbers> = (props) => {
    const { totalNum, totalChecked, totalSum } = props;
    
    return (
        <>
            <div className="flex flex-row justify-center items-center">
                <div className="p-4 w-1/2">
                    <p className="font-bold">ИТОГО: </p> 
                    <p>Всего конструкций: {totalNum} шт.</p>
                    <p>Выделено конструкций: {totalChecked} шт.</p>
                    <p>Сумма кампании: <span className="text-lg font-bold">{totalSum} ₽</span></p> 
                </div>
                <div className="w-1/2 flex justify-center align-middle">
                    <Button className="text-white h-10 font-bold border-2">Создать кампанию</Button>
                </div>
            </div>
        </>
    )
}

export default TotalPanel;
