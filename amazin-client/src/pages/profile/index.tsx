import React, { useState } from 'react';
import UserAccount from '../../components/UserAccount';
import ChangePassword from '../../components/UserAccount/ChangePassword';

export default function Profile() {
  const [view, setView] = useState('PROFILE');
  
  return (
    <>
      {view === 'PROFILE' && <UserAccount setView={setView} />}
      {view === 'CHANGE_PASSWORD' && <ChangePassword setView={setView} />}
    </>
  );
}
