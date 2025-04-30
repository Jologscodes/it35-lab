import {
  IonAlert,
  IonAvatar,
  IonButton,
  IonContent,
  IonInput,
  IonInputPasswordToggle,
  IonPage,
  IonToast,
  useIonRouter,
  IonGrid,
  IonRow,
  IonCol
} from '@ionic/react';
import { useState } from 'react';
import { supabase } from '../utils/supabaseClient';

const Login: React.FC = () => {
  const navigation = useIonRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showToast, setShowToast] = useState(false);

  const doLogin = async () => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setErrorMessage(error.message);
      setShowAlert(true);
    } else {
      setShowToast(true);
      setTimeout(() => {
        navigation.push('/it35-lab/app', 'forward', 'replace');
      }, 300);
    }
  };

  return (
    <IonPage>
      <IonContent className='ion-padding glowing-background'>
        <IonGrid style={{ height: '100vh', paddingTop: '10%' }}>
          <IonRow style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            {/* Avatar Section */}
            <IonCol size="12" sizeMd="4" style={{ display: 'flex', justifyContent: 'center' }}>
              <IonAvatar
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '200px',
                  height: '200px',
                  borderRadius: '50%',
                  overflow: 'hidden',
                }}
              >
                <img
                  src="https://i.pinimg.com/originals/cc/9d/d3/cc9dd3a99a069fa5a2548d8f57f4d5d8.gif"
                  alt="Frog"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
              </IonAvatar>
            </IonCol>

            {/* Form Section */}
            <IonCol size="12" sizeMd="6" className="floating-container">
              <h1 className="jollibee-logo">WELCOME MA FRIEND! 🍔</h1>
              <IonInput
                label="Email"
                labelPlacement="floating"
                fill="outline"
                type="email"
                placeholder="Enter Email"
                value={email}
                onIonChange={(e) => setEmail(e.detail.value!)}
                style={{ marginBottom: '10px' }}
              />
              <IonInput
                fill="outline"
                type="password"
                placeholder="Enter Password"
                value={password}
                onIonChange={(e) => setPassword(e.detail.value!)}
                style={{ marginBottom: '20px' }}
              >
                <IonInputPasswordToggle slot="end" />
              </IonInput>

              <IonButton
                onClick={doLogin}
                expand="full"
                shape="round"
                className="glow-button"
              >
                Login
              </IonButton>

              <IonButton
                routerLink="/it35-lab/register"
                expand="full"
                fill="clear"
                shape="round"
                className="glow-button-outline"
              >
                Don't have an account? SIGN UP HERE
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>

        {/* Alert for login errors */}
        <IonAlert
          isOpen={showAlert}
          onDidDismiss={() => setShowAlert(false)}
          header="Login Failed"
          message={errorMessage}
          buttons={['OK']}
        />

        {/* Toast for success */}
        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message="Login successful! Redirecting..."
          duration={1500}
          position="top"
          color="primary"
        />
      </IonContent>

      <style>
        {`
          @keyframes floatAnimation {
            0% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
            100% { transform: translateY(0); }
          }

          .floating-container {
            animation: floatAnimation 3s ease-in-out infinite;
          }

          .jollibee-logo {
            font-size: 4rem;
            font-weight: bold;
            text-align: center;
            color: #fff;
            font-family: 'Comic Sans MS', 'Fredoka', 'Segoe UI', sans-serif;
            text-shadow: 3px 3px #ffd700;
            letter-spacing: 1.5px;
            margin-bottom: 30px;
          }

          .glowing-background {
            background-color: #1e1e1e; /* Smooth dark tone */
            color: #ffffff;
            box-shadow: inset 0 0 15px #ff9800;
          }

          .glow-button {
            background-color: #ff9800; /* Softer orange */
            color: #fff;
            border: none;
            box-shadow: 0 0 12px rgba(255, 152, 0, 0.6);
            transition: 0.3s;
          }

          .glow-button:hover {
            box-shadow: 0 0 20px rgba(255, 152, 0, 0.9);
          }

          .glow-button-outline {
            border: 2px solid #ff9800;
            color: #ff9800;
            background: transparent;
            box-shadow: 0 0 10px rgba(255, 152, 0, 0.4);
            transition: 0.3s;
          }

          .glow-button-outline:hover {
            background-color: rgba(255, 152, 0, 0.1);
            box-shadow: 0 0 20px rgba(255, 152, 0, 0.7);
          }
        `}
      </style>
    </IonPage>
  );
};

export default Login;
