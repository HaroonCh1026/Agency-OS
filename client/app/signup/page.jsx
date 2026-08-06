"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "../../services/api";

export default function SignupPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
    password_confirmation: "",
  });

  function handleChange(event) {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const response = await api("/signup", {
      method: "POST",
      body: JSON.stringify(form),
    });

    if (response.ok) {
      alert("Account created successfully");
      router.push("/login");
    } else {
      alert(response.data.errors.join("\n"));
    }
  }

  return (
    <main>
      <h1>Signup</h1>

      <form onSubmit={handleSubmit}>
        <input
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
        />

        <br /><br />

        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        />

        <br /><br />

        <input
          name="phone"
          placeholder="Phone"
          value={form.phone}
          onChange={handleChange}
        />

        <br /><br />

        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
        />

        <br /><br />

        <input
          name="password_confirmation"
          type="password"
          placeholder="Confirm Password"
          value={form.password_confirmation}
          onChange={handleChange}
        />

        <br /><br />

        <button type="submit">
          Create Account
        </button>
      </form>
    </main>
  );
}