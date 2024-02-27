import LoginForm from './loginForm.component';
import SignupForm from './signupForm.component';
import img3 from '../../images/food/img3.jpg';

const LoginPage = () => {

    return ( 
    <div className="loginDiv">
        <div className="rightLogin">
      <img src={img3} alt='food' className="responsiveImg2"></img>
      </div>
        <div className="leftLogin">
        <LoginForm />
        <SignupForm />
        </div>
    </div> );
}
 
export default LoginPage;