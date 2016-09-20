import React from 'react';
import './RepoList.scss';
import RepoListContainer from '../../routes/CoreLayout/containers/RepoListContainer'

export default class RepoListTransition extends React.Component {
    
    constructor() {
        super();
        this.state = {
            offsetTop: 0,
        };
        
    }
    
    static propTypes = {
        
    }
    
    componentWillMount() {
        
    }
    
    componentDidMount() {
        
       
        
        
    }
    
    componentWillReceiveProps(nextProps) {
        
    }
    
    componentWillUnmount() {
        
    }
    
    onTransitionWillStart(data) {
        
        this.setState({
            offsetTop: data.scrollTop,
        });
        
    }
    
    onTransitionDidEnd() {
        this.setState({ offsetTop: 0 });
        
        // Show search, need a delay to trigger CSS animation
        // setTimeout(() => this.setState({ showSearch: true }), 50);
        //
        // setTimeout(() => {
        //     // Get user profile
        //     this.props.searchUserRepos(this.props.params.username, this.state.searchText, this.props.repoListReducer.page)
        // }, 300);
        
        // Hack the footer
        this.hackTheFooter();
    }
    
    hackTheFooter() {
        const oldFooter = document.querySelector('.footer');
        const newFooter = oldFooter.cloneNode(true);
        oldFooter.style.display = 'none';
        newFooter.classList.remove('original');
        document.querySelector('#repo-list-page #scroll-wrapper').appendChild(newFooter);
    }
    
      
    render() {
        
        return (
            <div
                id="repo-list-page"
                className="transition-item"
                style={{ top: this.state.offsetTop }}
            >
                <RepoListContainer params={this.props.params} />
            </div>
        );
    }
}
