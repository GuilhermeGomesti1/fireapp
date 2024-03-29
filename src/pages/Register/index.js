import { useState } from "react";
import { Link } from "react-router-dom";
import { auth } from "../../firebaseConnection";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { async } from "@firebase/util";
import { toast } from "react-toastify";
export default function Register() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate();

  async function handleRegister(e) {
    e.preventDefault();
    if (!email || email.trim().length === 0 || !password || password.trim().length === 0) {
      toast.warn("Preencha todos os campos");
      return;
    }
    
    if (password.length < 6) {
      toast.warn("A senha deve ter no mínimo 6 caracteres");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Email inválido");
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate('/admin', { replace: true });
    } catch (error) {
      console.log("Erro ao fazer o cadastro:", error.message);
    }
  }

  return (
    <div className="home-container">
      <h1>Cadastre</h1>
      <span>Vamos criar sua conta!</span>
      <form className="form" onSubmit={handleRegister}>
        <input type="text" placeholder="Digite seu email" value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password" placeholder="********" value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Cadastrar</button>

      </form>

      <Link className="button-link" to="/">
        Já possui uma conta? Faça o login!
      </Link>


    </div>
  )
}