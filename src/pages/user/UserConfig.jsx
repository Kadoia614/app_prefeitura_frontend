import { useState } from "react";
import { Button } from "primereact/button";

import Avatar from "../../assets/img/avatar2.svg";

import { FaUser } from "react-icons/fa";
import { MdOutlinePassword } from "react-icons/md";

import InputField from "@/components/shared/input/inputfield/InputField";
import PasswordField from "@/components/shared/input/passwordfield/PasswordField";
import { useUserContext } from "../../context/user/UserContext";

import { alterPassword } from "../../service/alter_password";

import { useLoadingContext } from "../../context/loading/LoadingContext";

import { useToast } from "@/components/shared/toast/ToastProvider";

const UserConfig = () => {
  const { user } = useUserContext();
  const { attIsLoading } = useLoadingContext();
  const { showToast } = useToast();

  const [userInfo, setUserInfo] = useState({
    password: "",
    new_password: "",
    confirm_new_password: "",
  });

  const handleSubmit = async () => {
    try {
      attIsLoading(true);
      await alterPassword(userInfo.new_password, userInfo.password);
      showToast("success", "Sucesso", "Senha alterada com sucesso!");
    } catch (error) {
      showToast("error", "Erro", "Erro ao alterar senha", error.message);
    } finally {
      attIsLoading(false);
    }
  };

  return (
    <div id="UserConfig" className="p-15">
      <div className="mx-auto user-card shadow-2xl rounded-md p-4 w-150 flex items-center flex-col">
        <img
          src={Avatar}
          alt="Avatar"
          className="rounded-full overflow-hidden w-50"
        />
        <br />
        <div id="UserData">
          <div className="flex flex-col gap-4 w-full py-4">
            <div>
              <InputField
                icon={<FaUser />}
                id={"UsernameAlter"}
                placeholder="Usuário"
                className="w-full input"
                label={"Username"}
                disabled={true}
                value={user.name}
                onChange={() => alert("Para de graça")}
              ></InputField>

              <PasswordField
                id={"PasswordAlter"}
                icon={<MdOutlinePassword />}
                label={"Senha Atual"}
                placeholder="Senha Atual..."
                feedback={false}
                value={userInfo.password}
                onChange={(e) =>
                  setUserInfo({ ...userInfo, password: e.target.value })
                }
              ></PasswordField>

              <PasswordField
                id={"NewPassword"}
                icon={<MdOutlinePassword />}
                label={"Nova Senha"}
                placeholder="Nova Senha"
                feedback={true}
                invalid={
                  userInfo.new_password !== userInfo.confirm_new_password
                }
                value={userInfo.new_password}
                onChange={(e) =>
                  setUserInfo({ ...userInfo, new_password: e.target.value })
                }
              ></PasswordField>

              <PasswordField
                id={"ConfirmNewPassword"}
                icon={<MdOutlinePassword />}
                label={"Confirme a Nova Senha"}
                placeholder="Nova Senha"
                feedback={true}
                invalid={
                  userInfo.new_password !== userInfo.confirm_new_password
                }
                value={userInfo.confirm_new_password}
                onChange={(e) =>
                  setUserInfo({
                    ...userInfo,
                    confirm_new_password: e.target.value,
                  })
                }
              ></PasswordField>
            </div>
            <Button
              disabled={
                !userInfo.password ||
                !userInfo.new_password ||
                userInfo.new_password !== userInfo.confirm_new_password
              }
              onClick={() => handleSubmit()}
              label="Salvar"
              className="btn-primary w-full text-center"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserConfig;
