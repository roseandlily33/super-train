import { useState } from 'react';
import DishTypes from './dishTypes.router';
import Appetizers from '../../components/dishPages/Appetizers';
import Pasta from '../../components/dishPages/Pasta';
import Entrees from '../../components/dishPages/Entrees';
import Desserts from '../../components/dishPages/Desserts';

export default function Dishes() {

    const [currentType, setCurrentPage] = useState('Appetizers');

    const renderType = () => {

        if (currentType === 'Appetizers') {
            return <Appetizers />;
        }
        if (currentType === 'Entrees') {
            return <Entrees />;
        }
        if (currentType === 'Desserts') {
            return <Desserts />;
        }
            return <Pasta />;
    };

    const handleTypeChange = (type) => setCurrentPage(type);

    return (
        <div>
            <DishTypes currentType={currentType} handleTypeChange={handleTypeChange} />
            {renderType()}
        </div>
    ); 


} 