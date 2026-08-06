"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "../../services/api";
import { saveToken } from "../../utils/storage";

export default function LoginPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    login: "",
    password: "",
  });

  function handleChange(event) {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const response = await api("/login", {
      method: "POST",
      body: JSON.stringify(form),
    });

    if (response.ok) {
      saveToken(response.data.token);
      router.push("/dashboard");
    } else {
      alert(response.data.error);
    }
  }

  return (
    <main>
      <h1>Login</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="login"
          placeholder="Username or Email"
          value={form.login}
          onChange={handleChange}
        />

        <br />
        <br />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
        />

        <br />
        <br />

        <button type="submit">Login</button>
      </form>
    </main>
  );
}
