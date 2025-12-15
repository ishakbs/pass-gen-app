import { useState } from "react";
import AdUnit from "./component/AdUnit";

const App = () => {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(12);
  const [includeUppercase, setIncludeUppercase] = useState(false);
  const [includeLowercase, setIncludeLowercase] = useState(false);
  const [includeNumbers, setIncludeNumbers] = useState(false);
  const [includeSymbols, setIncludeSymbols] = useState(false);

  const UPPERCASE = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const LOWERCASE = "abcdefghijklmnopqrstuvwxyz";
  const NUMBERS = "0123456789";
  const SYMBOLS = "!@#$%^&*()_+-=[]{}|;:,.<>?";

  const generatePassword = () => {
    let characters = "";
    if (includeUppercase) characters += UPPERCASE;
    if (includeLowercase) characters += LOWERCASE;
    if (includeNumbers) characters += NUMBERS;
    if (includeSymbols) characters += SYMBOLS;

    if (!characters) {
      setPassword("");
      return;
    }

    let newPassword = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      newPassword += characters[randomIndex];
    }

    setPassword(newPassword);
  };

  const getPasswordStrength = (pwd: string) => {
    let score = 0;
    if (!pwd) return score;
    if (pwd.length >= 8) score += 1;
    if (pwd.length >= 12) score += 1;
    if (/[A-Z]/.test(pwd)) score += 1;
    if (/[a-z]/.test(pwd)) score += 1;
    if (/[0-9]/.test(pwd)) score += 1;
    if (/[\!\@\#\$\%\^\&\*\(\)\_\+\-\=\[\]\{\}\|;:,.<>?]/.test(pwd)) score += 1;
    return score;
  };

  const getStrengthColor = (score: number) => {
    switch (score) {
      case 0:
      case 1:
        return "bg-red-500";
      case 2:
        return "bg-orange-400";
      case 3:
        return "bg-yellow-400";
      case 4:
        return "bg-green-300";
      case 5:
      case 6:
        return "bg-green-600";
      default:
        return "bg-gray-300";
    }
  };

  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    if (!password) return;
    navigator.clipboard.writeText(password).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  };

  return (
    <div className="min-h-screen w-screen bg-gray-100 flex flex-col items-center justify-start px-4 pt-10 space-y-6">
      
      {/* Card */}
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6 relative">
        <h1 className="text-2xl font-bold text-gray-900 text-center mb-2">
          Password Generator
        </h1>
        <p className="text-gray-500 text-center mb-6">
          Create strong and secure passwords
        </p>

        {/* Password strength meter */}
        <div className="w-full mb-4">
          {password && (
            <div className="h-2 w-full bg-gray-300 rounded mt-2">
              <div
                className={`${getStrengthColor(getPasswordStrength(password))} h-2 rounded transition-all duration-500`}
                style={{ width: `${(getPasswordStrength(password) / 6) * 100}%` }}
              />
            </div>
          )}
        </div>

        {/* Length slider */}
        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2">
            Password Length: {length}
          </label>
          <input
            type="range"
            min="8"
            max="32"
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
        </div>

        {/* Checkboxes */}
        <div className="mb-6 space-y-2">
          <label className="flex items-center space-x-3">
            <input
              type="checkbox"
              checked={includeUppercase}
              onChange={() => setIncludeUppercase(!includeUppercase)}
              className="h-4 w-4 text-blue-600 rounded cursor-pointer"
            />
            <span className="text-gray-700">Include Uppercase Letters</span>
          </label>

          <label className="flex items-center space-x-3">
            <input
              type="checkbox"
              checked={includeLowercase}
              onChange={() => setIncludeLowercase(!includeLowercase)}
              className="h-4 w-4 text-blue-600 rounded cursor-pointer"
            />
            <span className="text-gray-700">Include Lowercase Letters</span>
          </label>

          <label className="flex items-center space-x-3">
            <input
              type="checkbox"
              checked={includeNumbers}
              onChange={() => setIncludeNumbers(!includeNumbers)}
              className="h-4 w-4 text-blue-600 rounded cursor-pointer"
            />
            <span className="text-gray-700">Include Numbers</span>
          </label>

          <label className="flex items-center space-x-3">
            <input
              type="checkbox"
              checked={includeSymbols}
              onChange={() => setIncludeSymbols(!includeSymbols)}
              className="h-4 w-4 text-blue-600 rounded cursor-pointer"
            />
            <span className="text-gray-700">Include Symbols</span>
          </label>
        </div>

        {/* Password display */}
        <div className="bg-gray-100 w-full rounded-lg p-3 text-center font-mono text-lg mb-4">
          {password || "************"}
        </div>

        {/* Copy Button with animated tooltip */}
        <div className="relative">
          <button
            onClick={copyToClipboard}
            className="w-full py-2 bg-transparent text-gray-900 border rounded-xl font-semibold hover:bg-gray-200 cursor-pointer transition duration-500"
          >
            Copy to Clipboard
          </button>

          <span
            className={`absolute top-0 right-0 mt-1 mr-2 text-sm bg-black text-white px-2 py-1 rounded transition-opacity duration-700 ${
              copied ? "opacity-100" : "opacity-0"
            }`}
          >
            Copied!
          </span>
        </div>

        {/* Generate button */}
        <button
          onClick={generatePassword}
          className="w-full mt-6 py-3 bg-blue-700 text-white rounded-xl cursor-pointer font-semibold hover:bg-blue-800 transition duration-500"
        >
          Generate Password
        </button>
      </div>

      {/* AdUnit under the card */}
      <div className="w-full flex justify-center">
        <AdUnit />
      </div>
    </div>
  );
};

export default App;
