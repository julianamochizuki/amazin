import React from 'react';
import RegisterForm from '../../components/Register';

type Props = {
  setTokenChanged: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Register(props: Props) {
  const { setTokenChanged } = props;

  return <RegisterForm setTokenChanged={setTokenChanged} />;
}
