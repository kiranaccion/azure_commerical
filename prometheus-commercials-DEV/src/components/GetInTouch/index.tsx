import LeftArrowIcon from '../SVGs/LeftArrowIcon';
import './styles.scss';

interface GetInTouchProps {
  goBack: () => void;
}

export default function GetInTouch({ goBack }: GetInTouchProps) {
  return (
    <div className="contact-form-container">
      <div className="heading">
        <div className="get-in-touch" onClick={goBack}>
          <LeftArrowIcon />
          <p>Get in Touch</p>
        </div>
        <p className="inquires-info">
          For all other inquiries, please fill out the form below and we will get right back to you.
        </p>
      </div>

      <div className="contact-form">
        <div className="names">
          <div className="fname">
            <label htmlFor="fname">First name*</label>
            <input type="text" id="fname" name="fname" />
          </div>
          <div className="lname">
            <label htmlFor="fname">Last name*</label>
            <input type="text" id="fname" name="fname" />
          </div>
        </div>

        <div className="address-email">
          <div className="email">
            <label htmlFor="emailAddress">Email Address*</label>
            <input type="text" id="emailAddress" name="emailAddress" />
          </div>
          <div className="phone">
            <label htmlFor="phoneNumber">Phone Number*</label>
            <input type="text" id="phoneNumber" name="phoneNumber" />
          </div>
        </div>

        <textarea className="tell-us-more" name="tellUsMore" id="" placeholder="Tell us more..." />

        <div className="info-action">
          <div className="legal-links">
            <a>Privacy Notice</a>
            <a>California Privacy Rights</a>
            <a>Online Privacy Policy Portal</a>
            <a>Accessibility Policy</a>
          </div>
          <button className="send-btn">SEND</button>
        </div>
      </div>
    </div>
  );
}
