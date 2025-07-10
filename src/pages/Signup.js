import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google"; // Import GoogleOAuthProvider
import { jwtDecode } from "jwt-decode";

export default function Signup() {
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });
  const navigate = useNavigate();

  const handleSendVerification = async () => {
    if (!email) {
      setMessage({ text: "Please enter your email.", type: "error" });
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/send-verification", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({ text: "Verification code sent to your email.", type: "success" });
        setStep(2);
      } else {
        setMessage({ text: data.error, type: "error" });
      }
    } catch (error) {
      setMessage({ text: "Error sending verification email.", type: "error" });
    }
  };

  const handleVerifyCode = async () => {
    const fullCode = code.join("");
    if (fullCode.length !== 6) {
      setMessage({ text: "Please enter a valid 6-digit code.", type: "error" });
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/verify-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code: fullCode }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({ text: "Verification successful! Set your password.", type: "success" });
        setStep(3);
      } else {
        setMessage({ text: data.error, type: "error" });
      }
    } catch (error) {
      setMessage({ text: "Error verifying code.", type: "error" });
    }
  };

  const handleSignup = async () => {
    if (password !== confirmPassword) {
      setMessage({ text: "Passwords do not match!", type: "error" });
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({ text: "Signup successful! Please log in.", type: "success" });
        setTimeout(() => navigate("/login"), 2000);
      } else {
        setMessage({ text: data.error, type: "error" });
      }
    } catch (error) {
      setMessage({ text: "An error occurred. Please try again.", type: "error" });
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    const decoded = jwtDecode(credentialResponse.credential);
    const { name, email } = decoded;

    try {
      const response = await fetch("http://localhost:5000/api/google-signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: credentialResponse.credential }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({ text: "Google signup successful! Please log in.", type: "success" });
        setTimeout(() => navigate("/login"), 2000);
      } else {
        setMessage({ text: data.error, type: "error" });
      }
    } catch (error) {
      setMessage({ text: "Error with Google signup.", type: "error" });
    }
  };

  const handleGoogleError = () => {
    setMessage({ text: "Google signup failed. Please try again.", type: "error" });
  };

  const handleCodeChange = (index, value) => {
    if (isNaN(value)) return;
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);
    if (value && index < 5) {
      document.getElementById(`code-${index + 1}`).focus();
    }
  };

  const signupContent = (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 flex items-center justify-center p-4">
      <div className="flex flex-col h-[800px] lg:flex-row w-full max-w-5xl bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="w-full lg:w-1/2 p-8 lg:p-12 bg-gradient-to-t from-gray-50 to-white flex flex-col justify-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-6 tracking-wide">
            {step === 1
              ? "Claim Your Property Adventure 🏠"
              : step === 2
              ? "Verify Your Estate Key 🔑"
              : "Secure Your New Home Account"}
          </h2>

          {message.text && (
            <div
              className={`p-4 mb-6 rounded-lg text-center font-medium ${
                message.type === "success"
                  ? "bg-green-50 text-green-700 border border-green-200"
                  : "bg-red-50 text-red-700 border border-red-200"
              }`}
            >
              {message.text}
            </div>
          )}

          {step === 1 && (
            <div className="space-y-6">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Full Name</label>
                <input
                  type="text"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-4 bg-gray-100 text-gray-800 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-500 transition"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Email</label>
                <input
                  type="email"
                  placeholder="yourname@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-4 bg-gray-100 text-gray-800 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-500 transition"
                  required
                />
              </div>
              <button
                onClick={handleSendVerification}
                className="w-full bg-gradient-to-r from-blue-800 to-blue-600 text-white text-lg font-semibold py-3 rounded-lg hover:bg-gradient-to-r hover:from-blue-900 hover:to-blue-700 transition"
              >
                Send Verification Code
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Verification Code</label>
                <div className="flex justify-between gap-2">
                  {code.map((digit, index) => (
                    <input
                      key={index}
                      id={`code-${index}`}
                      type="text"
                      maxLength="1"
                      value={digit}
                      onChange={(e) => handleCodeChange(index, e.target.value)}
                      className="w-12 h-12 text-center text-gray-800 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 transition"
                    />
                  ))}
                </div>
              </div>
              <button
                onClick={handleVerifyCode}
                className="w-full bg-gradient-to-r from-blue-800 to-blue-600 text-white text-lg font-semibold py-3 rounded-lg hover:bg-gradient-to-r hover:from-blue-900 hover:to-blue-700 transition"
              >
                Verify Code
              </button>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-4 bg-gray-100 text-gray-800 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-500 pr-12 transition"
                    required
                  />
                  <span
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-600 cursor-pointer"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                  </span>
                </div>
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Confirm Password</label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full p-4 bg-gray-100 text-gray-800 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-500 pr-12 transition"
                    required
                  />
                  <span
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-600 cursor-pointer"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                  </span>
                </div>
              </div>
              <button
                onClick={handleSignup}
                className="w-full bg-gradient-to-r from-blue-800 to-blue-600 text-white text-lg font-semibold py-3 rounded-lg hover:bg-gradient-to-r hover:from-blue-900 hover:to-blue-700 transition"
              >
                Complete Signup
              </button>
            </div>
          )}

          <div className="flex items-center my-6">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="px-4 text-gray-500 font-medium">OR</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>

          <div className="w-full flex justify-center">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={handleGoogleError}
              render={(renderProps) => (
                <button
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                  className="w-full flex items-center justify-center bg-white border border-gray-300 rounded-lg py-3 text-gray-700 font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-amber-500 transition"
                >
                  <img
                    src="https://www.svgrepo.com/show/355037/google.svg"
                    alt="Google"
                    className="w-6 h-6 mr-3"
                  />
                  Sign up with Google
                </button>
              )}
            />
          </div>

          <p className="text-center text-sm text-gray-600 mt-4">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/login")}
              className="text-blue-800 font-medium hover:underline cursor-pointer"
            >
              Login
            </span>
          </p>
        </div>

        <div className="hidden lg:block w-1/2 relative">
          <img
            src="/Images/2.jpg"
            alt="Real Estate Signup"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-center justify-center">
            <div className="text-center text-white p-6">
              <h3 className="text-3xl font-bold mb-2">Step Into Your Dream Home</h3>
              <p className="text-lg">Sign up to explore premium properties.</p>
            </div>
          </div>
          {message.text && (
            <div
              className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-6 rounded-lg shadow-lg max-w-sm text-center ${
                message.type === "success"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {message.text}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <GoogleOAuthProvider clientId="858488242523-sioe4fi0sjh6dop0n2v1vcl7hdv56d3o.apps.googleusercontent.com">
      {signupContent}
    </GoogleOAuthProvider>
  );
}