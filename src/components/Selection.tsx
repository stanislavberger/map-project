import React from 'react';

interface SelectedItemsPageProps {
    selectedItems: SideBarItems[]; // массив выбранных элементов
}

const Selection: React.FC<SelectedItemsPageProps> = ({ selectedItems }) => {
    return (
        <div>
            <h2>Выбранные элементы:</h2>
            <ul>
                {selectedItems.map((item, index) => (
                    <li key={index}>
                        <p>Адрес: {item.address}</p>
                        <p>Тип конструкции: {item.typeConst}</p>
                        <p>Стоимость: {item.price}</p>
                        {/* Добавьте другие данные для отображения */}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Selection;