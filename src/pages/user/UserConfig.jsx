import { useState } from "react";
import { Button } from "primereact/button";

import Avatar from "../../assets/img/avatar2.svg";

import { FaUser } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { MdOutlinePassword } from "react-icons/md";

import InputField from "@/components/shared/input/inputfield/InputField";
import PasswordField from "@/components/shared/input/passwordfield/PasswordField";

const UserConfig = () => {
  const [userInfo, setUserInfo] = useState({
    username: "",
    password: "",
    new_password: "",
    confirm_new_password: "",
  });

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
          <form className="flex flex-col gap-4 w-full py-4">
            <div>
              <InputField
                icon={<FaUser />}
                id={"UsernameAlter"}
                placeholder="Usuário"
                className="w-full input"
                label={"Username"}
                disabled={true}
                value={userInfo.username}
                onChange={(e) =>
                  setUserInfo({ ...userInfo, username: e.target.value })
                }
              ></InputField>

              <PasswordField
                id={"PasswordAlter"}
                icon={<MdOutlinePassword />}
                label={"Password"}
                placeholder="Senha"
                feedback={false}
                value={userInfo.password}
                onChange={(e) =>
                  setUserInfo({ ...userInfo, password: e.target.value })
                }
              ></PasswordField>

              <PasswordField
                id={"NewPassword"}
                icon={<MdOutlinePassword />}
                label={"New Password"}
                placeholder="Senha"
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
                label={"Confirm New Password"}
                placeholder="Senha"
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
              !userInfo.confirm_new_password ||
              userInfo.new_password !== userInfo.confirm_new_password
            }
              onClick={() => alert("Falta terminar")}
              label="Salvar"
              className="btn-primary w-full text-center"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserConfig;
