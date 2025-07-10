import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Eye icons

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(30);
  const [canResendCode, setCanResendCode] = useState(false);
  const navigate = useNavigate();
  const [isCodeSent, setIsCodeSent] = useState(false);

  // Clear message after 10 seconds
  useEffect(() => {
    if (message.text) {
      const timer = setTimeout(() => setMessage({ text: "", type: "" }), 10000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  // Timer countdown logic
  useEffect(() => {
    if (resendTimer > 0 && !canResendCode) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(timer);
    } else if (resendTimer === 0) {
      setCanResendCode(true);
    }
  }, [resendTimer, canResendCode]);

  // Handle login
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ text: "", type: "" });
    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        setMessage({ text: "Login successful! Redirecting...", type: "success" });
        setTimeout(() => navigate("/"), 2000);
      } else {
        setMessage({ text: data.error || "Login failed", type: "error" });
      }
    } catch (error) {
      setMessage({ text: "Error connecting to server.", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  // Handle sending verification code
  const handleSendVerificationCode = async () => {
    if (!email) {
      setMessage({ text: "Please enter your email.", type: "error" });
      return;
    }
    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/send-verification", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      if (response.ok) {
        setMessage({ text: "Verification code sent to your email.", type: "success" });
        setIsCodeSent(true);
        setIsForgotPassword(2);
        setCanResendCode(false);
        setResendTimer(30);
      } else {
        setMessage({ text: data.error || "Failed to send verification code.", type: "error" });
      }
    } catch (error) {
      setMessage({ text: "Error connecting to the server.", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  // Handle password reset
  const handleResetPassword = async () => {
    if (newPassword !== confirmNewPassword) {
      setMessage({ text: "Passwords do not match!", type: "error" });
      return;
    }
    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, newPassword, verificationCode: code.join("") }),
      });
      const data = await response.json();
      if (response.ok) {
        setMessage({ text: "Password reset successful! Please log in.", type: "success" });
        setIsForgotPassword(false);
      } else {
        setMessage({ text: data.error, type: "error" });
      }
    } catch (error) {
      setMessage({ text: "Error resetting password.", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  // Handle Google login
  const responseGoogle = async (response) => {
    console.log("Google response:", response);
    if (response.credential) {
      try {
        const res = await fetch("http://localhost:5000/api/google-signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token: response.credential }),
        });
        const data = await res.json();
        if (res.ok) {
          localStorage.setItem("user", JSON.stringify(data.user));
          setMessage({ text: "Google login successful! Redirecting...", type: "success" });
          setTimeout(() => navigate("/"), 2000);
        } else {
          setMessage({ text: data.error || "Google login failed.", type: "error" });
        }
      } catch (error) {
        console.error("Google login fetch error:", error);
        setMessage({ text: "Error connecting to server.", type: "error" });
      }
    } else {
      setMessage({ text: "Google login failed. No token received.", type: "error" });
    }
  };

  // Handle verification code input
  const handleCodeChange = (index, value) => {
    if (isNaN(value)) return;
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);
    if (value && index < 5) {
      document.getElementById(`code-${index + 1}`).focus();
    }
  };

  return (
    <GoogleOAuthProvider clientId="858488242523-sioe4fi0sjh6dop0n2v1vcl7hdv56d3o.apps.googleusercontent.com">
      <div className="min-h-screen w-full bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 flex items-center justify-center p-4">
        {/* Main Container */}
        <div className="flex flex-col lg:flex-row w-full max-w-5xl h-[800px] bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Left Side: Form */}
          <div className="w-full lg:w-1/2 p-8 lg:p-12 bg-gradient-to-t from-gray-50 to-white flex flex-col justify-center">
            <h2 className="text-4xl font-bold text-gray-800 mb-6 tracking-wide">
              {isForgotPassword === false
                ? "Unlock Your Property Journey 🏡"
                : isForgotPassword === 1
                ? "Reset Your Key 🔑"
                : "Secure Your New Home Password"}
            </h2>

            {/* Message Display */}
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

            {/* Login Form */}
            {isForgotPassword === false && (
              <form onSubmit={handleLogin} className="space-y-6">
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

                <div className="text-right">
                  <button
                    type="button"
                    onClick={() => setIsForgotPassword(1)}
                    className="text-blue-800 text-sm font-medium hover:underline"
                  >
                    Forgot Password?
                  </button>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-800 to-blue-600 text-white text-lg font-semibold py-3 rounded-lg hover:bg-gradient-to-r hover:from-blue-900 hover:to-blue-700 transition disabled:bg-amber-400"
                  disabled={loading}
                >
                  {loading ? "Entering..." : "Login to Your Estate"}
                </button>

                {/* OR Divider */}
                <div className="flex items-center my-4">
                  <div className="flex-grow border-t border-gray-300"></div>
                  <span className="px-4 text-gray-500 font-medium">OR</span>
                  <div className="flex-grow border-t border-gray-300"></div>
                </div>

                {/* Google Login */}
                <GoogleLogin
                  onSuccess={responseGoogle}
                  onError={() => setMessage({ text: "Google login failed.", type: "error" })}
                  render={(renderProps) => (
                    <button
                      onClick={renderProps.onClick}
                      disabled={renderProps.disabled || loading}
                      className="w-full flex items-center justify-center bg-white border border-gray-300 rounded-lg py-3 text-gray-700 font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-amber-500 transition"
                    >
                      <img
                        src="https://developers.google.com/identity/images/g-logo.png"
                        alt="Google Logo"
                        className="w-6 h-6 mr-3"
                      />
                      Login with Google
                    </button>
                  )}
                />

                <p className="text-center text-sm text-gray-600">
                  New to our estate?{" "}
                  <Link to="/signup" className="text-blue-800 font-medium hover:underline">
                    Sign Up
                  </Link>
                </p>
              </form>
            )}

            {/* Forgot Password Form */}
            {isForgotPassword === 1 && (
              <div className="space-y-6">
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
                  onClick={handleSendVerificationCode}
                  className="w-full bg-gradient-to-r from-blue-800 to-blue-600 text-white text-lg font-semibold py-3 rounded-lg hover:bg-gradient-to-r hover:from-blue-900 hover:to-blue-700 transition disabled:bg-amber-400"
                  disabled={loading || !canResendCode}
                >
                  {loading
                    ? "Sending..."
                    : canResendCode
                    ? "Send Verification Code"
                    : `Resend in ${resendTimer}s`}
                </button>

                <p className="text-center text-sm">
                  <button
                    onClick={() => setIsForgotPassword(false)}
                    className="text-blue-800 font-medium hover:underline"
                  >
                    Back to Login
                  </button>
                </p>
              </div>
            )}

            {/* Verification Code and New Password Form */}
            {isForgotPassword === 2 && (
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
                  onClick={handleSendVerificationCode}
                  disabled={!canResendCode || loading}
                  className={`w-full py-2 text-sm font-medium rounded-lg ${
                    canResendCode
                      ? "bg-gradient-to-r from-blue-800 to-blue-600 text-white hover:bg-gradient-to-r hover:from-blue-900 hover:to-blue-700"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  {canResendCode ? "Resend Code" : `Resend in ${resendTimer}s`}
                </button>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">New Password</label>
                  <div className="relative">
                    <input
                      type={showNewPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full p-4 bg-gray-100 text-gray-800 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-500 pr-12 transition"
                      required
                    />
                    <span
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-600 cursor-pointer"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                    >
                      {showNewPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Confirm New Password</label>
                  <div className="relative">
                    <input
                      type={showConfirmNewPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={confirmNewPassword}
                      onChange={(e) => setConfirmNewPassword(e.target.value)}
                      className="w-full p-4 bg-gray-100 text-gray-800 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-500 pr-12 transition"
                      required
                    />
                    <span
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-600 cursor-pointer"
                      onClick={() => setShowConfirmNewPassword(!showConfirmNewPassword)}
                    >
                      {showConfirmNewPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                    </span>
                  </div>
                </div>

                <button
                  onClick={handleResetPassword}
                  className="w-full bg-gradient-to-r from-blue-800 to-blue-600 text-white text-lg font-semibold py-3 rounded-lg hover:bg-gradient-to-r hover:from-blue-900 hover:to-blue-700 transition disabled:bg-amber-400"
                  disabled={loading}
                >
                  {loading ? "Resetting..." : "Set New Password"}
                </button>

                <p className="text-center text-sm">
                  <button
                    onClick={() => setIsForgotPassword(1)}
                    className="text-blue-800 font-medium hover:underline"
                  >
                    Back to Verification
                  </button>
                </p>
              </div>
            )}
          </div>

          {/* Right Side: Image */}
          <div className="hidden lg:block w-1/2 relative">
            <img
              src="/Images/2.jpg" // Replace with a real estate-themed image
              alt="Real Estate Login"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-center justify-center">
              <div className="text-center text-white p-6">
                <h3 className="text-3xl font-bold mb-2">Your Dream Home Awaits</h3>
                <p className="text-lg">Login to explore exclusive properties.</p>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default Login;