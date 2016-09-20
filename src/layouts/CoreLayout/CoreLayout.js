import React from 'react'
import NavMenu from '../../components/NavMenu'
import MainContent from '../../components/MainContent'
import MenuOpenStateHandler from '../../components/MenuOpenStateHandler';
import MenuFullStateHandler from '../../components/MenuFullStateHandler';
import classes from './CoreLayout.scss'
import '../../styles/core.scss'
import { matchParams } from '../../utils/routes'
import FastClick from 'fastclick'

class CoreLayout extends React.Component {

    static propTypes = {
        children : React.PropTypes.element.isRequired,
        routes : React.PropTypes.array.isRequired,
        closeNavMenu: React.PropTypes.func.isRequired,
        coreLayoutReducer: React.PropTypes.object.isRequired,
        // updateCoreData: React.PropTypes.func.isRequired,
    }

    componentDidMount() {

        FastClick.attach (document.body)

    }

    componentWillReceiveProps(nextProps){

        const { coreLayoutReducer } = nextProps
        
        if(coreLayoutReducer.backActionCount > this.props.coreLayoutReducer.backActionCount){
            const path = matchParams(coreLayoutReducer.backRoute, this.props.params);
            this.context.router.push(path);
        }

        // this.props.updateCoreData(
        //     document.getElementById('scroll-section').scrollTop)

    }

    componentWillUnmount() {
    }

    render() {

        var { children, routes, closeNavMenu } = this.props
        

        return (
            <div style={{overflow:'hidden', height:'100%', width: '100%'}}>
                <MenuOpenStateHandler />
                <MenuFullStateHandler />
                <div
                    id="menu-overlay"
                    onClick={closeNavMenu}
                ></div>
                <NavMenu />
                <MainContent
                    route={routes[routes.length - 1].path}
                    location={routes.location}
                >
                    {children}
                </MainContent>
            </div>
        );
    }
}

CoreLayout.contextTypes = {
    router: React.PropTypes.object.isRequired,
};
export default CoreLayout;

// export const CoreLayout = ({ children, routes }) => (
//     <div className='container '>
//         <div className={classes.mainContainer}>
//             <div>
//                 <MenuOpenStateHandler />
//                 <MenuFullStateHandler />
//                 <div
//                     id="menu-overlay"
//                     onClick={() => action.onNext({ name: ACTIONS.CLOSE_NAV_MENU })}
//                 ></div>
//                 <NavMenu />
//                 <MainContent
//                     route={routes[routes.length - 1].path}
//                     location={routes.location}
//                 >
//                     {children}
//                 </MainContent>
//             </div>
//         </div>
//     </div>
// )
//
//
// CoreLayout.propTypes = {
//     children : React.PropTypes.element.isRequired,
//     routes : React.PropTypes.array.isRequired
// }
//
// export default CoreLayout
