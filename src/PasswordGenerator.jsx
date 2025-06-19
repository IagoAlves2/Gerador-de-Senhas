import React, { useState } from 'react';
import './PasswordGenerator.css';

function PasswordGenerator() {
  const [length, setLength] = useState(12);
  const [includeLower, setIncludeLower] = useState(true);
  const [includeUpper, setIncludeUpper] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [password, setPassword] = useState('');
  const [copySuccess, setCopySuccess] = useState(false);
  const [strength, setStrength] = useState('');

  const getRandomLower = () =>
    String.fromCharCode(Math.floor(Math.random() * 26) + 97);
  const getRandomUpper = () =>
    String.fromCharCode(Math.floor(Math.random() * 26) + 65);
  const getRandomNumber = () =>
    String.fromCharCode(Math.floor(Math.random() * 10) + 48);
  const getRandomSymbol = () => {
    const symbols = '!@#$%^&*(){}[]=<>/,.';
    return symbols[Math.floor(Math.random() * symbols.length)];
  };

  const randomFunc = {
    lowercase: getRandomLower,
    uppercase: getRandomUpper,
    numbers: getRandomNumber,
    symbols: getRandomSymbol
  };

  const generatePassword = () => {
    let generated = '';
    const types = [
      { lowercase: includeLower },
      { uppercase: includeUpper },
      { numbers: includeNumbers },
      { symbols: includeSymbols }
    ].filter(item => Object.values(item)[0]);

    if (types.length === 0) {
      alert('Selecione pelo menos um tipo de caractere!');
      return;
    }

    for (let i = 0; i < length; i++) {
      const type = types[i % types.length];
      const funcName = Object.keys(type)[0];
      generated += randomFunc[funcName]();
    }

    setPassword(generated);
    checkStrength(generated);
    setCopySuccess(false);
  };

  const checkStrength = (pwd) => {
    let score = 0;
    if (pwd.length >= 8) score++;
    if (/[A-Z]/.test(pwd)) score++;
    if (/[0-9]/.test(pwd)) score++;
    if (/[^A-Za-z0-9]/.test(pwd)) score++;

    const status = ['Fraca', 'Fraca', 'Média', 'Forte', 'Muito Forte'];
    setStrength(status[score]);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password).then(() => {
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    });
  };

  return (
    <div className="container">
      <h2>Gerador de Senhas</h2>

      <label>
        Tamanho da senha:
        <input type="number" min="4" max="50" value={length} onChange={e => setLength(e.target.value)} />
      </label>

      <label><input type="checkbox" checked={includeLower} onChange={() => setIncludeLower(!includeLower)} /> Letras minúsculas</label>
      <label><input type="checkbox" checked={includeUpper} onChange={() => setIncludeUpper(!includeUpper)} /> Letras maiúsculas</label>
      <label><input type="checkbox" checked={includeNumbers} onChange={() => setIncludeNumbers(!includeNumbers)} /> Números</label>
      <label><input type="checkbox" checked={includeSymbols} onChange={() => setIncludeSymbols(!includeSymbols)} /> Símbolos</label>

      <button onClick={generatePassword}>Gerar Senha</button>

      <input type="text" value={password} readOnly placeholder="Sua senha segura aparecerá aqui" />
      <button onClick={copyToClipboard}>Copiar Senha</button>
      {copySuccess && <div className="copy-msg">Copiado com sucesso!</div>}

      {password && <div className="strength">Força da senha: <strong>{strength}</strong></div>}
    </div>
  );
}

export default PasswordGenerator;
