import Wrapper from "../assets/wrappers/LandingPage";
import main from "../assets/images/main.svg";
import { Link } from "react-router-dom";
import { Logo } from "../components";

function Landing() {
  return (
    <Wrapper>
      <nav>
        <Logo />
      </nav>
      <div className="container page">
        <div className="info">
          <div>
            <h1>
              job <span>tracking</span> app
            </h1>
          </div>
          <p>
            I'm baby raw denim cold-pressed waistcoat crucifix palo santo,
            scenester cray. Keytar af tonx four loko, fit neutral milk hotel
            literally. Blue bottle solarpunk keffiyeh, intelligentsia iPhone
            YOLO jawn godard vinyl lumbersexual meggings authentic post-ironic
            chillwave cold-pressed.
          </p>
          <Link to="register" className="btn register-link">
            Register
          </Link>
          <Link to="login" className="btn">
            Login / Demo Users
          </Link>
          <img src={main} alt="main" className="main main-img" />
        </div>
      </div>
    </Wrapper>
  );
}

export default Landing;
