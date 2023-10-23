'use client';

import { ChangeEvent, FormEvent, useState } from "react";

export default function LoginPage() {
  const [data, setData] = useState({email: '', password: ''});
  const [isValidEmail, setIsValidEmail] = useState(true);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target;

    if (name === 'email' && value) {
      setIsValidEmail(emailRegex.test(value));
    }

    setData({ ...data, [name]: value });
  };

  function login(event: FormEvent<HTMLFormElement>): void {
    // @to-do: remove this after back-end connection is done.
    event.preventDefault()
    if (!isValidEmail) {
      alert('Por favor insira um email válido.');
      return;
    }
    alert('Seu email: ' + data.email + '\n' + 'Sua senha: ' + data.password);
  }

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <form className="flex flex-col justify-center items-center bg-secondary rounded text-white w-[500px] h-[500px]" onSubmit={login}>
        <h3 className="mb-2">Login</h3>
        <div className="text-black flex flex-col gap-y-2 mb-2">
          <input className={`px-2 border-2 rounded ${isValidEmail || !data.email ? '' : 'border-danger'}`} type="text" name="email" id="email" placeholder="Email" onChange={handleChange} />
          <input className="px-2 rounded" type="password" name="password" id="password" placeholder="Senha" onChange={handleChange} />
        </div>
        <button type="submit" className="border rounded bg-highlight px-2">Log in</button>
      </form>
    </div>
  )
}
