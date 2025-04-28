import React, { useState } from 'react';
import {
  IonButton,
  IonContent,
  IonInput,
  IonPage,
  IonModal,
  IonText,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonTitle,
  IonLabel
} from '@ionic/react';
import { supabase } from '../utils/supabaseClient';
import bcrypt from 'bcryptjs';
import './Register.css'; // Your custom CSS

const Register: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleOpenVerificationModal = () => {
    if (!email.endsWith('@nbsc.edu.ph')) {
      alert('Only @nbsc.edu.ph emails are allowed to register.');
      return;
    }
    if (password !== confirmPassword) {
      alert('Passwords do not match.');
      return;
    }
    setShowVerificationModal(true);
  };

  const doRegister = async () => {
    setShowVerificationModal(false);

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      alert('Account creation failed: ' + error.message);
      return;
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const { error: insertError } = await supabase.from('users').insert([{
      username,
      user_email: email,
      user_firstname: firstName,
      user_lastname: lastName,
      user_password: hashedPassword,
    }]);

    if (insertError) {
      alert('Failed to save user data: ' + insertError.message);
      return;
    }

    setShowSuccessModal(true);
  };

  const InputField = ({
    label,
    value,
    setValue,
    type,
    placeholder
  }: {
    label: string;
    value: string;
    setValue: React.Dispatch<React.SetStateAction<string>>;
    type: string;
    placeholder: string;
  }) => (
    <IonInput
      label={label}
      labelPlacement="stacked"
      fill="outline"
      type={type}
      placeholder={placeholder}
      value={value}
      onIonInput={(e) => setValue(e.detail.value!)}
      style={{ marginTop: '15px' }}
    />
  );

  return (
    <IonPage>
      <IonContent className="ion-padding">
        <div className="animated-container" style={{ maxWidth: '400px', margin: '0 auto', width: '100%' }}>
          {/* Logo GIF */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '10px' }}>
            <img
              src="https://www.gifcen.com/wp-content/uploads/2022/03/pepe-the-frog-gif-1.gif"
              alt="Logo"
              style={{ width: '120px', height: '120px', objectFit: 'contain' }}
            />
          </div>

          <h1 style={{ textAlign: 'center' }}>Create your account</h1>

          <InputField label="Username" value={username} setValue={setUsername} type="text" placeholder="Enter a unique username" />
          <InputField label="First Name" value={firstName} setValue={setFirstName} type="text" placeholder="Enter your first name" />
          <InputField label="Last Name" value={lastName} setValue={setLastName} type="text" placeholder="Enter your last name" />
          <InputField label="Email" value={email} setValue={setEmail} type="email" placeholder="youremail@nbsc.edu.ph" />

          {/* Password Input */}
          <IonLabel>Password</IonLabel>
          <IonInput
            type="password"
            fill="outline"
            placeholder="Enter password"
            value={password}
            onIonInput={(e) => setPassword(e.detail.value!)}
            style={{ marginTop: '10px' }}
          />

          <IonLabel style={{ marginTop: '15px' }}>Confirm Password</IonLabel>
          <IonInput
            type="password"
            fill="outline"
            placeholder="Confirm password"
            value={confirmPassword}
            onIonInput={(e) => setConfirmPassword(e.detail.value!)}
            style={{ marginTop: '10px' }}
          />

          <IonButton
            className="glow-button"
            onClick={handleOpenVerificationModal}
            expand="block"
            shape="round"
            style={{ marginTop: '20px' }}
          >
            Register
          </IonButton>

          <IonButton
            className="glow-clear-button"
            routerLink="/it35-lab"
            expand="block"
            fill="clear"
            shape="round"
          >
            Already have an account? Sign in
          </IonButton>
        </div>

        {/* Verification Modal */}
        <IonModal isOpen={showVerificationModal} onDidDismiss={() => setShowVerificationModal(false)}>
          <IonContent className="ion-padding">
            <IonCard className="ion-padding" style={{ marginTop: '25%' }}>
              <IonCardHeader>
                <IonCardTitle>User Registration Details</IonCardTitle>
                <hr />
                <IonCardSubtitle>Username</IonCardSubtitle>
                <IonCardTitle>{username}</IonCardTitle>

                <IonCardSubtitle>Email</IonCardSubtitle>
                <IonCardTitle>{email}</IonCardTitle>

                <IonCardSubtitle>Name</IonCardSubtitle>
                <IonCardTitle>{firstName} {lastName}</IonCardTitle>
              </IonCardHeader>
              <IonCardContent />
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginRight: '5px' }}>
                <IonButton
                  className="glow-clear-button"
                  fill="clear"
                  onClick={() => setShowVerificationModal(false)}
                >
                  Cancel
                </IonButton>
                <IonButton
                  className="glow-button"
                  color="primary"
                  onClick={doRegister}
                >
                  Confirm
                </IonButton>
              </div>
            </IonCard>
          </IonContent>
        </IonModal>

        {/* Success Modal */}
        <IonModal isOpen={showSuccessModal} onDidDismiss={() => setShowSuccessModal(false)}>
          <IonContent className="ion-padding" style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            textAlign: 'center',
          }}>
            <IonTitle>Registration Successful</IonTitle>
            <IonText>
              <p>Your account has been created successfully.</p>
              <p>Please check your email address.</p>
            </IonText>
            <IonButton
              className="glow-button"
              routerLink="/it35-lab"
              routerDirection="back"
              color="primary"
            >
              Go to Login
            </IonButton>
          </IonContent>
        </IonModal>
      </IonContent>
    </IonPage>
  );
};

export default Register;
