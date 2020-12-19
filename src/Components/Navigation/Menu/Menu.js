import React from 'react'
import {NavLink} from 'react-router-dom'
import Auxiliary from '../../../Fragments/Auxiliary/Auxiliary'
import MenuBackground from "../MenuBackground/MenuBackground";
import classes from './Menu.module.css'


const links = [ // Список навигации в менью.
    {to: '/', label: 'Do Exercises', exact: false},
    {to: '/create', label: 'Create Exercise', exact: true},
]

class Menu extends React.Component {
    linkDraw = links.map((obj, index) => { // Атрибут класса, выводит список навигации менью, итерируя по константе links.
        return (
            <li key={index}><NavLink to={obj.to} exact={obj.exact}
                                     onClick={this.props.clickEventMenuBackground}>{obj.label}</NavLink></li>

        )
    })

    render() {
        const clsMenu = [classes.Menu]
        if (!this.props.isOpen) {
            clsMenu.push(classes.close)
        } // Определение класса в зависимости от this.props.isOpen. Закрывает открывает менью.

        return (
            <Auxiliary>
                <nav className={clsMenu.join(' ')}>
                    <h1>Menu:</h1>
                    <ul> {this.linkDraw} </ul>
                </nav>
                {this.props.isOpen ?
                    <MenuBackground clickEventMenuBackground={this.props.clickEventMenuBackground}/> : null}
            </Auxiliary>
        )
    }
}

/* Fragments/Layout/Layout ---> props
     props.isOpen: Панель навигации. Закрывает и открывает менью.
     props.clickEventMenuBackground: Событие клика за пределами менью. Закрывает менью. ---> props ---> MenuBackground
*/

export default Menu