import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

import API from "../../api/API";
import { useLoadingContext } from "@/context/loading/LoadingContext";
import { useUserContext } from "@/context/user/UserContext";
import { useToast } from "@/components/shared/toast/ToastProvider";

import { MdOutlinePassword } from "react-icons/md";

import { FaUser } from "react-icons/fa";
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
      navigate("/");
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
        navigate("/");
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
  }, []);

  return (
    <div className="flex items-center justify-center h-full w-full">
      <div className="max-w-[90%]">
        <div className="flex bg-white px-5 sm:px-10 py-10 w-full">
          <div className="flex flex-col w-full md:w-1/2">
            <h1 className="text-3xl text-center">Login</h1>
            <div className="md:border-r-1 border-primary-500 w-[100%]">
              <div
                onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                className="bg-white py-4 px-4 box-border"
              >
                <div className="flex flex-col my-4">
                  <InputFieldLine
                    icon={<FaUser />}
                    type="text"
                    id="User"
                    placeholder="Usuário"
                    className="w-full input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />

                  <PasswordFieldLine
                    widthField="mt-4"
                    inputClass={"w-full"}
                    icon={<MdOutlinePassword />}
                    placeholder="Senha"
                    id="Pwd"
                    value={password}
                    feedback={false}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <div className="flex flex-col text-center gap-2 my-4">
                  <div>
                    <p className="text-sm text-gray-500 wrap">
                      Não tem uma conta?{" "}
                      <a
                        href="/register"
                        className="text-blue-500 hover:underline"
                      >
                        Solicite acesso
                      </a>
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">
                      Esqueceu sua senha?{" "}
                      <a
                        href="/reset-password"
                        className="text-blue-500 hover:underline"
                      >
                        Redefina sua senha
                      </a>
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
          <p className="text-sm text-gray-500">
            Ao clicar em <b>Login</b>, você concorda com nossos{" "}
            <a href="/terms" className="text-blue-500 hover:underline">
              Termos de Serviço
            </a>{" "}
            e{" "}
            <a href="/privacy" className="text-blue-500 hover:underline">
              Política de Privacidade
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
