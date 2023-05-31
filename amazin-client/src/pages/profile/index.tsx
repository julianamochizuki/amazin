import React, { useState } from 'react';
import UserAccount from '../../components/UserAccount';
import ChangePassword from '../../components/UserAccount/ChangePassword';

type Props = {
  setTokenChanged: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Profile(props: Props) {
  const { setTokenChanged } = props;
  const [view, setView] = useState('PROFILE');

  return (
    <>
      {view === 'PROFILE' && (
        <UserAccount setView={setView} setTokenChanged={setTokenChanged} />
      )}
      {view === 'CHANGE_PASSWORD' && <ChangePassword setView={setView} />}
    </>
  );
}
