import React from 'react';
import LoginForm from '../../components/LoginForm';

type Props = {
  setTokenChanged: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Login(props: Props) {
  const { setTokenChanged } = props;

  return <LoginForm setTokenChanged={setTokenChanged} />;
}
