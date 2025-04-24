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
      <IonContent className='ion-padding'>
        <IonGrid style={{ height: '100vh', paddingTop: '10%' }}>
          <IonRow justify="center" align="center">
            {/* Avatar Section */}
            <IonCol size="12" sizeMd="4" style={{ display: 'flex', justifyContent: 'center' }}>
              <IonAvatar
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '150px',
                  height: '150px',
                  borderRadius: '50%',
                  overflow: 'hidden',
                }}
              >
                {/* Replace IonIcon with an <img> tag to display the frog GIF */}
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
            <IonCol size="12" sizeMd="6">
              <h1 style={{ textAlign: 'center' }}>Welcome!</h1>
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

              <IonButton onClick={doLogin} expand="full" shape="round" style={{ marginBottom: '10px' }}>
                Login
              </IonButton>

              <IonButton routerLink="/it35-lab/register" expand="full" fill="clear" shape="round">
                Don't have an account? Register here
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>

        {/* IonAlert for displaying login errors */}
        <IonAlert
          isOpen={showAlert}
          onDidDismiss={() => setShowAlert(false)}
          header="Login Failed"
          message={errorMessage}
          buttons={['OK']}
        />

        {/* IonToast for success message */}
        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message="Login successful! Redirecting..."
          duration={1500}
          position="top"
          color="primary"
        />
      </IonContent>
    </IonPage>
  );
};

export default Login;
