import React from 'react'
import { IndexLink, Link } from 'react-router'
import Header from '../Header'
import Toast from '../Toast';
import Footer from '../Footer';
import './MainContent.scss'
import classNames from 'classnames';
import PageTransition from 'react-router-page-transition';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

export default class MainContent extends React.Component {
    
    constructor() {
        super();
        this.state = {
            scrollTop: 0,
            toast: null, // object shape: { message: 'example', timeout: 3000, button: <Example /> }
        };
        
        this.onPageLoad = this.onPageLoad.bind(this)
    }

    static propsTypes = {
        mainContentReducer: React.PropTypes.object.isRequired,

    }
    
    componentDidMount() {
        
    }

    shouldComponentUpdate(nextProps, nextState){

        return (
            nextProps.mainContentReducer != this.props.mainContentReducer ||
            nextProps.open != this.props.open ||
            nextProps.route != this.props.route ||
            nextState.scrollTop != this.state.scrollTop
        )

    }
    
    componentWillReceiveProps(next) {
        
        // We only need to update the scrollTop when page change
        if (next.open === this.props.open) {
            this.setState({
                // Caution: this force layout
                scrollTop: document.getElementById('scroll-section').scrollTop//this.refs.scrollSection.scrollTop || 
            });
        }


    }
    
    onPageLoad() {
        // Caution: this force layout
        this.refs.scrollSection.scrollTop = 0;
    }
    
    render() {

        var { startPosition, repoData } = this.props.mainContentReducer

        return (
            <div
                id="main-content"
                className={classNames({
          open: this.props.open,
          full: this.props.full,
        })}
            >
                {this.state.toast ?
                    <ReactCSSTransitionGroup
                        transitionName="list"
                        transitionAppear
                        transitionAppearTimeout={500}
                        transitionEnterTimeout={500}
                        transitionLeaveTimeout={500}
                    >
                        <Toast toast={this.state.toast} />
                    </ReactCSSTransitionGroup>
                    : null}
                <Header route={this.props.route} />
                <div
                    id="scroll-section"
                    ref="scrollSection"
                >
                    <PageTransition
                        timeout={300}
                        onLoad={this.onPageLoad}
                        data={{
                          scrollTop: this.state.scrollTop,
                          detailPageData: {
                            startPosition,
                            repoData
                          }
                        }}
                    >
                        {this.props.children}
                    </PageTransition>
                    <Footer />
                </div>
            </div>
        );
    }
    
}