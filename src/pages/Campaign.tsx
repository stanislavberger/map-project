import { getSelectedItemselectedItems } from '../components/Sidebar' 

const Campaign: React.FC = () => {

    const selectedItems = getSelectedItems(filteredItems, isChecked);
    
    console.log(selectedItems);
    
    return(
        <div>
            Страница созданной кампании
            
        </div>
    )
}

export default Campaign