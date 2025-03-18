
import { 
    IonButton,
    IonButtons,
      IonContent, 
      IonHeader, 
      IonMenuButton, 
      IonPage, 
      IonTitle, 
      IonToolbar, 
      useIonRouter
  } from '@ionic/react';
import { useState } from 'react';
  
  const Login: React.FC = () => {
    const navigation = useIonRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  
    const doLogin = () => {
      if (!email || !password) {
        alert('Please enter your email and password.');
        return;
      }
      navigation.push('/it35-lab/app', 'forward', 'replace'); 
    };
  
    const doSignup = () => {
      navigation.push('/Register', 'forward', 'replace'); 
    };
  
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Login</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className='ion-padding'>
            <IonButton onClick={() => doLogin()} expand="full">
                Login
            </IonButton>
        </IonContent>
      </IonPage>
    );
  };
  
  export default Login;