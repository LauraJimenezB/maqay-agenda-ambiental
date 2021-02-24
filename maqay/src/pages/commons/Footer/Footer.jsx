import React from "react";
import "./Footer.css";
import logomaqay from "../../../assets/img/logoFooter.png";

const Footer = () => {
  return (
    <footer>
      <div className='footer-logo'>
        <a href='https://www.maqay.org/' className='footer-logo'>
          <img src={logomaqay} alt={logomaqay}></img>
        </a>
      </div>
      <div className='footer-nosotros'>
        <span>NOSOTROS</span>
        <p>La Agenda Ambiental 2021 es un proyecto de la ONG Maqay puedes revisar la metodología para su construcción aquí.</p>
      </div>
      <div className='footer-social-links'>
        <span>EQUIPO</span>
        <div className='list-social-links'>
          <a href='https://www.instagram.com/200org/'>
            <i className='fab fa-instagram-square'></i><p>200pe</p>
          </a>
          <a href='https://www.linkedin.com/in/lesliechavezp/'>
            <i className='fab fa-linkedin'></i><p>Leslie Chávez</p>
          </a>

          <a href='https://www.linkedin.com/in/dalejandra-cruzacosta/'>
            <i className='fab fa-linkedin'></i><p>Alejandra Cruz</p>
          </a>

          <a href='https://github.com/yajepanta/maqay-agenda-ambiental'>
            <i className='fab fa-github-square'></i><p>Yajeleth Panta</p>
          </a>

          <a href='https://www.linkedin.com/in/ivy-feraco-56477ba/'>
            <i className='fab fa-linkedin'></i><p>Ivy Feraco</p>
          </a>
          <a href='https://www.linkedin.com/in/laurajimenezb/'>
            <i className='fab fa-linkedin'></i><p>Laura Jimenez</p>
          </a>
        </div>
      </div>
      <div className='footer-contacto'>
        <p>CONTACTO</p>
        <span>Si tienes dudas, consultas o quieres participar de la iniciativa
        escríbenos a</span>
        <a href='mailto:hola@maqay.org'>
            <i className='far fa-envelope'></i><p>hola@maqay.org</p>
        </a>
        <a href='https://www.instagram.com/200org/'>
            <i className='fab fa-instagram-square'></i><p>ong.maqay</p>
        </a>
        <a href='https://www.instagram.com/200org/'>
            <i className='fab fa-facebook-square'></i><p>ong.maqay</p>
        </a>
      </div>
    </footer>
  );
};

export default Footer;
