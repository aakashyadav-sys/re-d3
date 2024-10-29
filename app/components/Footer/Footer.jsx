import Image from 'next/image';
import  './Footer.css';
import { followUsArray ,quickLinksArray ,servicesArray }  from  './links'

export const Footer = () => {
    const year = new Date().getFullYear();
    




  return (
    <footer>
    <div className="footer-main">
      <div className="container">
        <div className="footer-parent">
          <div className="footer-logo">
            <a href="/">
              {/* <Image /> */}
            </a>
          </div>

          <div className="footer-quick-links">
            <h4>QUICK LINKS</h4>
            <ul className="menu-quick-links">
            {quickLinksArray.map((linkItem, index) => (
                  <li key={index}>
                    <a href={linkItem.link}>{linkItem.name}</a>
                  </li>
                ))}
            </ul>
          </div>

          <div className="footer-services">
            <h4>SERVICES</h4>
            <ul>
            {servicesArray.map((serviceItem, index) => (
                  <li key={index}>
                    <a href={serviceItem.link}>{serviceItem.name}</a>
                  </li>
                ))}
            </ul>
          </div>

          <div className="follow-us">
            <h4>FOLLOW US</h4>
            <ul>
            {followUsArray.map((socialItem, index) => (
                  <li key={index}>
                    <a href={socialItem.url} target="_blank" rel="noopener noreferrer">
                      <Image src={socialItem.imgSrc} alt={socialItem.alt} className='' width={200} height={200}  />
                    </a>
                  </li>
                ))}
            </ul>

            <div className="download-profile">
              <h4>DOWNLOAD COMPANY PROFILE</h4>
              <a href="#">Download</a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div className="copy-right">
      <div className="container">
        <p>
          Copyright © {year} &nbsp; All rights reserved | 
          <a href="https://ar-creations.in/clients/expressway-group">Expressway Shipping</a>
        </p>
      </div>
    </div>
  </footer>
  )
}
