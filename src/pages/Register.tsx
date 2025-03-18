import { 
    IonAvatar,
    IonButton,
    IonContent, 
    IonInput, 
    IonInputPasswordToggle, 
    IonItem, 
    IonPage, 
    useIonRouter
  } from '@ionic/react';
  import React, { useState } from 'react';
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