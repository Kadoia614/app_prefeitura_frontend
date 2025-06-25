import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router";
import { Toast } from "primereact/toast";

import API from "../../service/API";
import { useUserContext } from "@/context/UserContext";

import { MdOutlinePassword } from "react-icons/md";

import { FaUser } from "react-icons/fa";
import { Button } from "primereact/button";

import PasswordFieldLine from "../shared/input/passwordfield/PasswordFieldLine";
import InputFieldLine from "../shared/input/inputfield/InputFieldLine";

const Login = () => {
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");

  let { AttAuth, AttScopo, scopo } = useUserContext();

  const navigate = useNavigate();
  const toast = useRef(null);

  const Login = async (data) => {
    try {
      let response = await API.post("/auth/login", {
        credentials: {
          password: data.password,
          email: data.email,
        },
      });

      let token = response.data.token;
      await localStorage.setItem("token", token);
      console.log("Authenticado com sucesso");
      AttAuth(true);
      AttScopo(response.data.scopo);
      console.log("scopo", scopo);
      navigate("/");
    } catch (error) {
      if (error.status === 401) {
        toast.current.show({
          severity: "error",
          summary: "Error Message",
          detail: "Invalid credentials ",
          life: 3000,
        });
      } else {
        toast.current.show({
          severity: "error",
          summary: "Error Message",
          detail: "Error ao realizar login",
          life: 3000,
        });
      }
      AttAuth(false);
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
            <img src="/public/login.jpg" alt="Login IMG" className="h-90 w-90" />
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
      <Toast ref={toast} />
    </div>
  );
};

export default Login;
