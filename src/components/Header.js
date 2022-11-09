import React,{ Component } from "react";

class Header extends Component {
    render(){
        return(
<div>
    <img data-testid="header-profile-picture" src="" alt="perfil" />
    <p data-testid="header-player-name"></p>
    <p data-testid="header-score">0</p>
</div>
        )
    }
}

export default Header;