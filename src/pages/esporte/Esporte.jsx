import { useParams } from "react-router"

const Esporte = () => {
    return (
        <div>Esporte {useParams().id}</div>
    )
}

export default Esporte