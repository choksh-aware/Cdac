import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Input from '../components/Input';
import { validateEmail } from '../util/Validation';
import axiosConfig from '../util/axiosConfig';
import API_ENDPOINTS from '../util/apiEndpoints';
import { LoaderCircle } from 'lucide-react';
import { AppContext } from '../context/AppContext';
import login_image from '../assets/login.jpeg';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { setUser } = useContext(AppContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!validateEmail(email)) {
      setError("Please enter your valid email");
      return;
    }
    if (!password.trim()) {
      setError("Please enter your password");
      return;
    }

    setError("");

    try {
      const response = await axiosConfig.post(API_ENDPOINTS.LOGIN, { email, password });
      const { token, user } = response.data;
      if (token) {
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        setUser(user);
        navigate("/dashboard");
      }
    } catch (err) {
      if (err.response && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        console.error("Something went wrong", err);
        setError(err.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen w-full flex items-center justify-center bg-gray-200">
      {/* Gray background wrapper */}
      <div className="max-w-5xl w-full min-h-[600px] bg-white rounded-xl shadow-lg overflow-hidden grid grid-cols-1 md:grid-cols-2">
        
        {/* Left Side - Form */}
        <div className="p-10 flex flex-col justify-center">
          <h3 className="text-3xl font-bold text-slate-900 mb-2 text-left">Welcome Back</h3>
          <p className="text-sm text-gray-600 mb-8 text-left">
            It’s great to see you again your space is waiting.
          </p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              value={email}
              onChange={(target) => setEmail(target.value)}
              label="Email Address"
              placeholder="yourname@example.com"
              type="text"
            />
            <Input
              value={password}
              onChange={(target) => setPassword(target.value)}
              label="Password"
              placeholder="********"
              type="password"
            />

            {error && <p className="text-red-500 text-sm text-center mt-2">{error}</p>}

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full px-6 py-3 flex justify-center items-center gap-2 
               bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-lg 
                shadow-md transition-all duration-300
                 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {isLoading ? (
                <>
                  <LoaderCircle className="animate-spin w-5 h-5" size={20} />
                  Logging in...
                </>
              ) : (
                "Sign In"
              )}
            </button>

            <p className="text-sm text-gray-600 text-center mt-4">
              Don't have an account?
              <Link to="/signup" className="text-indigo-500 hover:underline ml-1">Sign up</Link>
            </p>
          </form>
        </div>

        {/* Right Side - Image */}
        <div className="hidden md:flex items-center justify-center bg-gradient-to-r from-purple-500 to-indigo-600">
          <img src={login_image} alt="Login Illustration" className="w-full h-full object-cover" />
        </div>
      </div>
    </div>
  );
};

export default Login;
