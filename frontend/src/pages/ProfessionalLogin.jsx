import React from 'react';
import {
  MDBContainer,
  MDBCol,    
  MDBRow,
  MDBBtn,
  MDBIcon,
  MDBInput,
  MDBCheckbox
}
from 'mdb-react-ui-kit';

function App() {
  return (
    <div 
      style={{ 
        height: '100vh', 
        overflow: 'hidden', 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'flex-start', // Aligning to top, to allow for marginTop adjustment
        marginTop: '0px', // Moves the content down by 50px
      }}
    >
      <MDBContainer fluid className="p-3 my-5" style={{ maxWidth: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

        <MDBRow style={{ height: '100%', justifyContent: 'center', alignItems: 'center' }}>

          <MDBCol col='10' md='6'>
            <img 
              src="https://imagedelivery.net/9sCnq8t6WEGNay0RAQNdvQ/clccj5klf0378p6n4i7bobti5/public" 
              className="img-fluid" 
              alt="Phone image" 
              style={{ borderRadius: '35px' }} // Add border-radius here
            />
          </MDBCol>

          <MDBCol col='4' md='6'>
            <MDBInput 
              wrapperClass='mb-4' 
              label={<span style={{ color: 'white' }}>Email address</span>} // Change label color to white
              id='formControlLg' 
              type='email' 
              size="lg"
            />
            <MDBInput 
              wrapperClass='mb-4' 
              label={<span style={{ color: 'white' }}>Password</span>} // Change label color to white
              id='formControlLg' 
              type='password' 
              size="lg"
            />

            <div className="d-flex justify-content-between mx-4 mb-4">
              <MDBCheckbox 
                name='flexCheck' 
                value='' 
                id='flexCheckDefault' 
                label={<span style={{ color: 'white' }}>Remember me</span>} // Change checkbox label color to white
              />
              <a href="!#" style={{ color: 'white' }}>Forgot password?</a> {/* Change link color to white */}
            </div>

            <MDBBtn className="mb-4 w-100" size="lg">Sign in</MDBBtn>

            <div className="divider d-flex align-items-center my-4">
              <p className="text-center fw-bold mx-3 mb-0" style={{ color: 'white' }}>OR</p> {/* Change OR text color to white */}
            </div>

            <MDBBtn className="mb-4 w-100" size="lg" style={{ backgroundColor: '#3b5998' }}>
              <MDBIcon fab icon="google" className="mx-2"/>
              Sign in with Google
            </MDBBtn>

            <MDBBtn className="mb-4 w-100" size="lg" style={{ backgroundColor: '#55acee' }}>
              <MDBIcon fab icon="twitter" className="mx-2"/>
              Continue with twitter
            </MDBBtn>

          </MDBCol>

        </MDBRow>

      </MDBContainer>
    </div>
  );
}

export default App;
