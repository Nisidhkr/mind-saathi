import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, googleProvider } from "../firebase";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth";

export default function Auth() {
  const [isSignup, setIsSignup] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const backendBaseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

  async function saveUserToBackend(user, displayName) {
    try {
      const idToken = await user.getIdToken();
      await fetch(`${backendBaseUrl}/api/auth/firebase-register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${idToken}`,
        },
        body: JSON.stringify({ name: displayName || user.displayName || "" }),
      });
    } catch (e) {
      console.error("Failed to save user to backend", e);
    }
  }

  async function trackUserLogin(user, loginMethod) {
    try {
      const idToken = await user.getIdToken();
      await fetch(`${backendBaseUrl}/api/auth/track-login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${idToken}`,
        },
        body: JSON.stringify({ loginMethod }),
      });
      sessionStorage.setItem('loginTracked', 'true');
      console.log("Login tracked successfully");
    } catch (e) {
      console.error("Failed to track login", e);
    }
  }

  async function handleEmailAuth(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      if (isSignup) {
        const cred = await createUserWithEmailAndPassword(auth, email, password);
        if (name) {
          await updateProfile(cred.user, { displayName: name });
        }
        await saveUserToBackend(cred.user, name);
        await trackUserLogin(cred.user, "email");
      } else {
        const cred = await signInWithEmailAndPassword(auth, email, password);
        await saveUserToBackend(cred.user);
        await trackUserLogin(cred.user, "email");
      }
      // Redirect to dashboard after successful authentication
      navigate("/dashboard");
    } catch (e) {
      setError(e.message || "Authentication failed");
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogle() {
    setLoading(true);
    setError("");
    try {
      const cred = await signInWithPopup(auth, googleProvider);
      await saveUserToBackend(cred.user);
      await trackUserLogin(cred.user, "google");
      // Redirect to dashboard after successful authentication
      navigate("/dashboard");
    } catch (e) {
      setError(e.message || "Google sign-in failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex justify-center items-center py-16">
      <div className="w-full max-w-md bg-white border border-gray-200 rounded-3xl p-8 shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-6">{isSignup ? "Create account" : "Welcome back"}</h1>
        {error && (
          <div className="mb-4 rounded-xl border border-red-200 bg-red-50 text-red-700 px-4 py-3 text-sm">
            {error}
          </div>
        )}
        <form onSubmit={handleEmailAuth} className="space-y-4">
          {isSignup && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input value={name} onChange={(e) => setName(e.target.value)} type="text" className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-perylene-600" placeholder="Your name" required />
            </div>
          )}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-perylene-600" placeholder="you@example.com" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-perylene-600" placeholder="••••••••" required />
          </div>
          <button type="submit" disabled={loading} className="w-full py-3 bg-perylene-600 text-white font-semibold rounded-xl hover:bg-perylene-700 transition-all duration-200 disabled:opacity-60">
            {loading ? "Please wait..." : isSignup ? "Sign up" : "Log in"}
          </button>
        </form>
        <div className="my-6 text-center text-sm text-gray-500">or</div>
        <button onClick={handleGoogle} disabled={loading} className="w-full py-3 border-2 border-gray-300 text-white font-semibold rounded-xl hover:bg-gray-50 transition-all duration-200 disabled:opacity-60">
          Continue with Google
        </button>
        <div className="mt-6 text-center text-sm text-gray-600">
          {isSignup ? "Already have an account?" : "New here?"} {" "}
          <button onClick={() => setIsSignup(!isSignup)} className="text-white font-semibold hover:underline">
            {isSignup ? "Log in" : "Create one"}
          </button>
        </div>
      </div>
    </div>
  );
}


