import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import styles from "../Styles/Benefits.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShield, faClock, faMoneyBillTransfer, faGlasses, faFilter, faRunning  } from '@fortawesome/free-solid-svg-icons';

const Benefits = () => {
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <section style={styles} className="BenefitsComponent">
      <hr />
      <Carousel
        responsive={responsive}
        infinite={true}
        className="owl-carousel owl-theme skill-slider"
      >
        <div className="benefit">
        <FontAwesomeIcon icon={faClock} size="2x" className="red-icon"/>
          <div>
            <h5>24/7 Online Support</h5>
            <span>Always available for assistance.</span>
          </div>
        </div>
        <div className="benefit">
          <FontAwesomeIcon icon={faShield} size="2x" className="red-icon"/>
          <div>
            <h5>Secure Payment</h5>
            <span>Accepts all major cards.</span>
          </div>
        </div>
        <div className="benefit">
        <FontAwesomeIcon icon={faMoneyBillTransfer} size="2x" className="red-icon"/>
          <div>
            <h5>Money-Back Guarantee</h5>
            <span>30-day refund policy.</span>
          </div>
        </div>
        <div className="benefit">
        <FontAwesomeIcon icon={faRunning } size="2x" className="red-icon"/>
          <div>
            <h5>Fast and Reliable Service</h5>
            <span>Prompt and dependable assistance.</span>
          </div>
        </div>
        <div className="benefit">
        <FontAwesomeIcon icon={faFilter} size="2x" className="red-icon"/>
          <div>
            <h5>Customizable Options</h5>
            <span>Tailored to your requirements.</span>
          </div>
        </div>
        <div className="benefit">
        <FontAwesomeIcon icon={faGlasses} size="2x" className="red-icon"/>
          <div>
            <h5>User-Friendly Interface</h5>
            <span>Intuitive and easy to use.</span>
          </div>
        </div>
      </Carousel>
    </section>
  );
};

export default Benefits;
