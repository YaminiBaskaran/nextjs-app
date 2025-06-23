import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";
import { supabase } from "@/lib/supabaseClient";

export default function Login() {
  const [values, setValues] = useState({
    email: "",
    password: ""
  });
  const [errors, setErrors] = useState<{ message?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    const { email, password } = values;

    const { data:authData, error:authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });


    if (authError) {
      setErrors({ message: authError.message });
    } else {
      router.push("/userhome");
    }
    setIsSubmitting(false);
  };

  return (
    <div className="flex h-screen bg-blue-500 justify-center items-center">
      <div className="w-1/2 bg-white rounded-lg p-6 shadow-lg">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block mb-1 font-semibold">Email</label>
            <input
              id="email"
              type="email"
              placeholder="Enter Email"
              value={values.email}
              onChange={(e) => setValues({ ...values, email: e.target.value })}
              className="w-full border border-gray-300 p-2 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block mb-1 font-semibold">Password</label>
            <input
              id="password"
              type="password"
              placeholder="********"
              value={values.password}
              onChange={(e) => setValues({ ...values, password: e.target.value })}
              className="w-full border border-gray-300 p-2 rounded"
              required
            />
          </div>
          {errors.message && <p className="text-red-500 mb-4">{errors.message}</p>}
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </button>
        </form>
        <Link href="/signup" className="text-blue-600 underline mt-4 block">
          Don't have an account? Register here.
        </Link>
      </div>
    </div>
  );
}
