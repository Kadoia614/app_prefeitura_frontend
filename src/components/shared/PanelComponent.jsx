import {Panel} from "primereact/panel";
import PropTypes from "prop-types"

export default function PanelComponent(props) {
    return <Panel {...props} >{props.children}</Panel>;
}

PanelComponent.propTypes = {
    children: PropTypes.node,
}