import styles from "../Styles/Banner.css";

const Banner = () => {
  return (
    <div style={styles} className="card">
      <h1>Welcome to my store</h1>
      <div className="card-photo"></div>
      <div className="card-title">
        Shahar faradyan <br />
        <span>Fullstack dev &amp; Backend dev</span>
      </div>
      <div className="card-socials">
        <a href="https://www.facebook.com/shahar.faradyan" className="card-socials-btn facebook">
          <i className="fa-brands fa-facebook fa-2xl"></i>
        </a>
        <a href="https://github.com/IamShaharFar" className="card-socials-btn github">
          <i className="fa-brands fa-github fa-2xl"></i>
        </a>
        <a href="https://www.linkedin.com/in/shahar-faradyan/" className="card-socials-btn linkedin">
          <i className="fa-brands fa-linkedin fa-2xl"></i>
        </a>
      </div>
    </div>
  );
};

export default Banner;
