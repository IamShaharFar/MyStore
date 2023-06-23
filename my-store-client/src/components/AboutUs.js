import React from 'react';

const AboutUs = () => {
    return (
        <section className="container-fluid bg-white">
          <div className="row">
            <div className="col-md-12 text-center">
              <h2 className="text-primary mb-4" style={{ fontSize: '3rem', fontWeight: 'bold' }}>
                About Us
              </h2>
              <div className="title-underline"></div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 offset-md-3">
              <p>
                We are a team of full-stack developers passionate about e-commerce web projects. Our goal is to provide exceptional solutions that meet the needs of businesses and customers alike.
              </p>
              <p>
                With years of experience in the industry, we understand the intricacies of building successful online stores. From front-end design to back-end development, we cover every aspect of the project to deliver a seamless user experience.
              </p>
              <p>
                Our expertise includes creating responsive and visually appealing interfaces, implementing secure payment gateways, optimizing website performance, and integrating inventory management systems.
              </p>
            </div>
          </div>
        </section>
      );
};

export default AboutUs;