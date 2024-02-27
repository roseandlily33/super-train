import React from 'react';
import { StyledMenuButtonContainer} from './menu.styles';

function DishTypes({ currentType, handleTypeChange }) {
    return (
        <StyledMenuButtonContainer>
            <button className="button" 
                onClick={() => handleTypeChange('Appetizers')}
            >
                Appetizers
            </button>
            <button className="button"
                onClick={() => handleTypeChange('Entrees')}
            >Entrees</button>
            <button className="button"
                onClick={() => handleTypeChange('Desserts')}
            >Desserts</button>
            <button className="button"
                onClick={() => handleTypeChange('Pasta')}
            >Pasta</button>

        </StyledMenuButtonContainer>

    );
}

export default DishTypes;