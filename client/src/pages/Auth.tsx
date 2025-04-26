import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Spinner } from "react-bootstrap";
import { toast } from "react-toastify";
import Header from "../components/Header";
import { signIn, signUp } from "../services/authService";

export default function AuthPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        await signIn(email, password);
        toast.success("Login realizado com sucesso!");
        navigate("/chat");
      } else {
        if (!username.trim()) {
          toast.warning("Por favor, insira um username.");
          return;
        }
        await signUp(email, password, username);
        toast.success("Cadastro realizado! Bem-vindo(a)!");
        navigate("/chat");
      }
    } catch (err: any) {
      console.error("Erro na autenticação:", err.message);
      toast.error(err.message || "Erro inesperado. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <div className="container d-flex flex-column justify-content-center align-items-center" style={{ minHeight: "75vh" }}>
        <div className="w-100" style={{ maxWidth: "400px" }}>
          <h2 className="text-center mb-4" style={{ color: "#000000" }}>
            {isLogin ? "Login" : "Cadastro"}
          </h2>

          <Form onSubmit={handleSubmit}>
            {!isLogin && (
              <Form.Group className="mb-3" controlId="formUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Escolha seu nome de usuário"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </Form.Group>
            )}

            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Digite seu email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-4" controlId="formPassword">
              <Form.Label>Senha</Form.Label>
              <Form.Control
                type="password"
                placeholder="Digite sua senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>

            <Button
              type="submit"
              variant="dark"
              className="w-100"
              disabled={loading}
            >
              {loading ? <Spinner animation="border" size="sm" /> : isLogin ? "Entrar" : "Cadastrar"}
            </Button>
          </Form>

          <div className="text-center mt-3">
            <Button
              variant="link"
              onClick={() => setIsLogin(!isLogin)}
              style={{ textDecoration: "none", color: "#000000" }}
            >
              {isLogin ? "Não tem conta? Cadastre-se" : "Já tem conta? Faça login"}
            </Button>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="d-flex flex-column justify-content-center align-items-center px-4 py-3 mt-5 border-top">
        <div className="text-black text-center mb-2">
          CHAT FURIA © 2025
        </div>
        <div className="d-flex gap-3">
          <a href="https://twitter.com/furiagg" className="text-black" target="_blank" rel="noopener noreferrer">
            <i className="bi bi-twitter fs-5" />
          </a>
          <a href="https://instagram.com/furiagg" className="text-black" target="_blank" rel="noopener noreferrer">
            <i className="bi bi-instagram fs-5" />
          </a>
          <a href="https://youtube.com/c/furia" className="text-black" target="_blank" rel="noopener noreferrer">
            <i className="bi bi-youtube fs-5" />
          </a>
          <a href="https://wa.me/5511993404466" className="text-black" target="_blank" rel="noopener noreferrer">
            <i className="bi bi-whatsapp fs-5" />
          </a>
        </div>
      </footer>
    </>
  );
}
