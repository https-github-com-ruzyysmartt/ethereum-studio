import onClickOutside from 'react-onclickoutside';
import { h, Component } from 'preact';
import PropTypes from 'prop-types';


/**
 * Simple wrapper component over the react-onclickoutside to maek easier the usage of the component
 */
class DropdownBasic extends Component {
    render() {
        return (
            <div>
                { this.props.children }
            </div>
        )
    }
}
export const Dropdown = onClickOutside(DropdownBasic);

Dropdown.proptypes = {
    handleClickOutside: PropTypes.func.isRequired,
}

/**
 * Helper component to handle the state of showing/hiding a dropdown
 */
export class DropdownContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showMenu: false,
        }

        this.showMenu = this.showMenu.bind(this);
        this.closeMenu = this.closeMenu.bind(this);
    }

    showMenu(event) {
        event.preventDefault();
        event.stopPropagation();

        this.setState({ showMenu: true });
      }

    closeMenu() {
        this.setState({ showMenu: false });
    }

    render() {
        let { dropdownContent, ...props } = this.props;
        return (
        <div onClick={this.showMenu} {...props}>
            { this.props.children }
            { this.state.showMenu ?
                    <Dropdown
                        handleClickOutside={this.closeMenu}>
                        { dropdownContent }
                    </Dropdown>
                : null }
        </div>
        )
    }
}
