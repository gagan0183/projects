import './index.scss';
import Loader from 'react-loaders'
import AnimatedLetters from '../AnimatedLetters'
import { useEffect, useRef, useState } from 'react'
import emailjs from '@emailjs/browser'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'

const Contact = () => {
  const [letterClass, setLetterClass] = useState('text-animate');
  const refForm = useRef();

  useEffect(() => {
    setTimeout(() => {
      setLetterClass("text-animate-hover");
    }, 3000);
  }, []);

  const sendEmail = (e) => {
    e.preventDefault()

    emailjs.sendForm('gmail', 'template_1w70avc', refForm.current, 'uTk838PWEFW-9fgCn').then(() => {
      alert('Message succesffully sent!')
      window.location.reload(false)
    }, () => {
      alert('Failed to send the message, please try again!');
    })
  }

  return (
    <>
      <div className='container contact-page'>
        <div className='text-zone'>
          <h1>
            <AnimatedLetters letterClass={letterClass} strArray={['C', 'o', 'n', 't', 'a','c','t',' ','m','e']} idx={15}/>
          </h1>
          <p>This is contacts</p>
          <div className='contact-form'>
            <form ref={refForm} onSubmit={sendEmail}>
              <ul>
                <li className='half'>
                  <input type='text' name='name' placeholder='Name' required/>
                </li>
                <li className='half'>
                  <input type='email' name='email' placeholder='Email' required/>
                </li>
                <li>
                  <input placeholder='Subject' type='text' name='subject' required />
                </li>
                <li>
                  <textarea placeholder='Message' name='message' required></textarea>
                </li>
                <li>
                  <input type='submit' className='flat-button' value='SEND'/>
                </li>
              </ul>
            </form>
          </div>
        </div>
        <div className='info-map'>
          Gagan bhullar,
          <br />
          Canada
          <br />
          Edmonton
          <br />
          <span>g.deepsingh1@gmail.com</span>
        </div>
        <div className='map-wrap'>
          <MapContainer center={[53.456584, -113.404595]} zoom={13}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"></TileLayer>
            <Marker position={[53.456584, -113.404595]}>
              <Popup>Gagan lives here</Popup>
            </Marker>
          </MapContainer>
        </div>
      </div>
      <Loader type='pacman' />
    </>
  )
}

export default Contact;
