import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";

import API from "../../api/API";
import { useLoadingContext } from "@/context/loading/LoadingContext";
import { useUserContext } from "@/context/user/UserContext";
import { useToast } from "@/components/shared/toast/ToastProvider";

import { Button } from "primereact/button";

import PasswordFieldLine from "../../components/shared/input/passwordfield/PasswordFieldLine";
import InputFieldLine from "../../components/shared/input/inputfield/InputFieldLine";
import login from "../../service/login";

const Login = () => {
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");

  const { AttAuth, attUser } = useUserContext();
  const { attIsLoading } = useLoadingContext();
  const { showToast } = useToast();

  const navigate = useNavigate();

  const Login = async (credentials) => {
    try {
      attIsLoading(true);
      let data = await login(credentials.email, credentials.password);

      await localStorage.setItem("token", data.token);
      attUser(data.ip, data.name, data.scopo);

      attIsLoading(false);
      navigate("/services");
    } catch (error) {
      showToast(
        "error",
        "Credenciais inválidas",
        `${JSON.stringify(error.response.data.message)}`
      );
      AttAuth(false);
      attIsLoading(false);
    }
  };

  const verifyToken = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw { message: "Token não encontrado" };
      }

      let response = await API.get("/auth");
      if (response.status === 200) {
        navigate("/services");
      }
      AttAuth(true);
    } catch (error) {
      AttAuth(false);

      if (error.response?.status === 401) {
        localStorage.removeItem("token");
      }
      console.log(
        `necessário fazer login: ${
          error.response?.data.message || error.message
        }`
      );
    }
  };

  let handleSubmit = () => {
    Login({ email, password });
  };

  useEffect(() => {
    verifyToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex items-center justify-center h-full w-full">
      <div className="max-w-[90%]">
        <div className="flex bg-white px-5 sm:px-10 py-10 w-full">
          <div className="flex flex-col w-full md:w-1/2">
            <h1 className="text-3xl text-center">Login</h1>
            <div className="md:border-r-1 border-primary w-[100%]">
              <div
                onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                className="bg-white py-4 px-4 box-border"
              >
                <div className="flex flex-col my-4">
                  <InputFieldLine
                    icon={<i className="pi pi-user"> </i>}
                    type="text"
                    id="User"
                    placeholder="Usuário"
                    className="w-full input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />

                  <PasswordFieldLine
                    fieldClass="mt-4"
                    inputClass={"w-full"}
                    icon={<i className="pi pi-key"> </i>}
                    placeholder="Senha"
                    id="Pwd"
                    value={password}
                    feedback={false}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <div className="flex flex-col text-center gap-2 my-4">
                  <div>
                    <p className="text-sm text-text-muted wrap">
                      Não tem uma conta?{" "}
                      <Link
                        to="/register"
                        className="text-text-secondary hover:underline"
                      >
                        Solicite acesso
                      </Link>
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-text-muted">
                      Esqueceu sua senha?{" "}
                      <Link
                        to="/reset-password"
                        className="text-text-secondary hover:underline"
                      >
                        Redefina sua senha
                      </Link>
                    </p>
                  </div>
                </div>
                <Button
                  onClick={handleSubmit}
                  label="Login"
                  className="btn-primary w-full text-center"
                />
              </div>
            </div>
          </div>

          <div className="login-image overflow-hidden md:block hidden md:w-1/2">
            <img src="/login.jpg" alt="Login IMG" className="h-90 w-90" />
          </div>
        </div>

        <div className="text-center">
          <p className="text-sm text-text-muted">
            Ao clicar em <b>Login</b>, você concorda com nossos{" "}
            <Link to="/terms" className="text-text-secondary hover:underline">
              Termos de Serviço
            </Link>{" "}
            e{" "}
            <Link to="/privacy" className="text-text-secondary hover:underline">
              Política de Privacidade
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
