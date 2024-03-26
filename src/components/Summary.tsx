const Summary: React.FC = (props) => {
    return(
        <div>
            ИТОГО: 
            <p>Всего конструкций: {sumItems} шт.</p>
            <p>Выделено конструкций: {SumCheckBox} шт.</p>
            <p>Сумма кампании: <span className="text-lg font-bold">{totalNum} ₽</span></p>
        </div>
    )
}

export default Summary;