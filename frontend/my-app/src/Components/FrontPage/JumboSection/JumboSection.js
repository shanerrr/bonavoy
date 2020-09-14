import React from 'react'
import { Button } from '../Button/Button'
import { Link } from 'react-router-dom'
import './JumboSection.css'

function JumboSection({
    lightBg,
    topLine,
    lightText,
    lightTextDesc,
    headline,
    description,
    buttonLabel,
    img,
    alt,
    imgStart
  }) {
    return (
      <>
        <div
          className={lightBg ? 'home-jumbo-section' : 'home-jumbo-section darkBg'}
        >
          <div className='container'>
            <div
              className='row home-jumbo-row'
              style={{
                display: 'flex',
                flexDirection: imgStart === 'start' ? 'row-reverse' : 'row'
              }}
            >
              <div className='col'>
                <div className='home-jumbo-text-wrapper'>
                  <div className='top-line'>{topLine}</div>
                  <h1 className={lightText ? 'heading' : 'heading dark'}>
                    {headline}
                  </h1>
                  <p
                    className={
                      lightTextDesc
                        ? 'home-jumbo-subtitle'
                        : 'home-jumbo-subtitle dark'
                    }
                  >
                    {description}
                  </p>
                  <Link to='/sign-up'>
                    <Button buttonSize='btn--wide' buttonColor='blue'>
                      {buttonLabel}
                    </Button>
                  </Link>
                </div>
              </div>
              <div className='col'>
                <div className='home-jumbo-img-wrapper'>
                  <img src={img} alt={alt} className='home-jumbo-img' />
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
  
  export default JumboSection;