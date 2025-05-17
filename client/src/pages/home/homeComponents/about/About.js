import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './About.css';

const About = () => {
  return (
    <section className="about-container position-relative" style={{ minHeight: '180vh' }}>
      <div className="detail-container" id="about-section">
        <div className="title">About Us</div>
        <div className="description">
          EZHU is a transformative digital platform born in Sri Lanka with a mission to connect talented skilled workers, visionary investors, and everyday users on a single unified platform. Our goal is to foster grassroots entrepreneurship, empower marginalized communities, and build a sustainable future through collaboration and innovation. By bridging the gap between opportunity and talent, EZHU enables skilled individuals to showcase their abilities, attract funding, and access resources that help bring their ideas to life. For investors, it provides a transparent ecosystem to discover impactful projects and support local development. The platform also offers users the ability to engage, hire, or support workers and initiatives in their own communities. At its core, EZHU is more than just a digital tool—it is a movement to uplift lives, strengthen communities, and ignite economic empowerment from the ground up.
        </div>
      </div>
    </section>
  );
};

export default About;