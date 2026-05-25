import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { Avatar } from "primereact/avatar";
import { Link, useNavigate } from "react-router";

import { useEffect, useState } from "react";
import logo from "../../assets/img/logo.png";
import { useUserContext } from "@/context/user/UserContext";

const Header = () => {
  const { user, AttAuth, getServices, services } = useUserContext();
  const [groupedServices, setGroupedServices] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    if (user.auth) {
      getServices();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  useEffect(() => {
    const grouped = services.reduce((acc, curr) => {
      const tag = curr.tag || "Outros";
      if (!acc[tag]) acc[tag] = [];
      acc[tag].push(curr);
      return acc;
    }, {});
    setGroupedServices(grouped);
  }, [services]);

  const logout = () => {
    localStorage.removeItem("token");
    AttAuth(false);
    navigate("/");
  };

  return (
    <header className="shadow-primary text-text-secondary shadow-md font-bold h-20 flex items-center justify-between flex-row py-4 px-8 z-50">
      <div className="flex flex-row items-end">
        <Link  to="#" className="w-16 bg-white rounded-md">
          <img src={logo} alt="" className="h-12 m-auto p-0" />
        </Link >
      </div>
      <div className="flex flex-row justify-between items-center">
        {user.auth ? (
          <>
            <div className="flex flex-row items-center mr-10">
              <Menu as="div" className="relative">
                <MenuButton className="cursor-pointer">Serviços</MenuButton>

                {/* <MenuButton className="cursor-pointer"><Link  to="/services"><i className="pi pi-home ml-4 font-bold text-3xl"></i></Link ></MenuButton> */}

                <MenuItems className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white pb-1 ring-1 shadow-lg ring-black/5 transition focus:outline-none">
                  {Object.keys(groupedServices).length > 0 &&
                    Object.entries(groupedServices).map(([tag, services]) => (
                      <div key={tag}>
                        <div className="px-4 py-2 text-xs font-semibold bg-secondary text-on-secondary hover:bg-secondary-hover uppercase">
                          {tag}
                        </div>
                        {services.map((service) => (
                          <MenuItem key={service.id}>
                            <Link 
                              to={service.url}
                              className="block px-4 py-2 text-sm text-text-muted hover:bg-cancel"
                            >
                              {service.name}
                            </Link >
                          </MenuItem>
                        ))}
                      </div>
                    ))}
                </MenuItems>
              </Menu>
            </div>

            <Menu as="div" className="relative">
              <MenuButton className="cursor-pointer">
                <Avatar label="U" size="xlarge" className="w-10 h-10" />
              </MenuButton>
              <MenuItems className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 ring-1 shadow-lg ring-black/5 transition focus:outline-none">
                <MenuItem>
                  <Link 
                    to="/services/config"
                    className="block px-4 py-2 text-sm text-text-muted hover:bg-gray-100"
                  >
                    Perfil
                  </Link >
                </MenuItem>
                <MenuItem>
                  <Link 
                    to="/services/config"
                    className="block px-4 py-2 text-sm text-text-muted hover:bg-gray-100"
                  >
                    Configurações
                  </Link >
                </MenuItem>
                <MenuItem>
                  <Link 
                    to="#"
                    onClick={logout}
                    className="block px-4 py-2 text-sm text-red-700 hover:bg-red-100"
                  >
                    Sair
                  </Link >
                </MenuItem>
              </MenuItems>
            </Menu>
          </>
        ) : (
          <h2 className="text-xl">Itapecerica da Serra</h2>
        )}
      </div>
    </header>
  );
};

export default Header;
