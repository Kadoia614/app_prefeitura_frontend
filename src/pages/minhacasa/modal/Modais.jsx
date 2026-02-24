import Cadastro_ExcludeModal from "./Cadastro_ExcludeModal";
import Cadastro_Modal from "./Cadastro_Modal";
import PropTypes from "prop-types";

const Modais = ({openEdit, setOpenEdit, openExclude, setOpenExclude}) => {
    return (
        <>
            <Cadastro_Modal openModalEdit={openEdit} setOpenModalEdit={setOpenEdit} />
            <Cadastro_ExcludeModal isOpen={openExclude} setIsOpen={setOpenExclude} />
        </>
    )
}

Modais.propTypes  = {
    openEdit: PropTypes.bool.isRequired,    
    setOpenEdit: PropTypes.func.isRequired,
    openExclude: PropTypes.bool.isRequired,
    setOpenExclude: PropTypes.func.isRequired,
}

export default Modais;