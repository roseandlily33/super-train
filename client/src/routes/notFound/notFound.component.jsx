import { StyledNotFound, StyledNotFoundLink } from './notFound.styles';

const NotFound = () => {

    return ( 
        <StyledNotFound>
            <h4>Sorry the page you are looking for cannot be found</h4>
            <StyledNotFoundLink to='/Home'>Home</StyledNotFoundLink>
        </StyledNotFound>
    );
}
 
export default NotFound;