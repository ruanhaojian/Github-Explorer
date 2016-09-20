import React from 'react';
import { Link } from 'react-router';
import RepoContent from '../RepoContent/RepoContent';
import ReactDom from 'react-dom';
import './RepoItem.scss';

export default class RepoItem extends React.Component {
    constructor(...args) {
        super(...args);
        this.click = this.click.bind(this);
    }
    
    static propTypes = {
        detailTransitionData: React.PropTypes.func.isRequired,
    }
    
    click() {
        const dom = ReactDom.findDOMNode(this.refs.link);
        this.props.detailTransitionData(dom.getBoundingClientRect(), this.props)
        // action.onNext({
        //     name: ACTIONS.DETAIL_TRANSITION_DATA,
        //     data: {
        //         startPosition: dom.getBoundingClientRect(),
        //         repoData: this.props,
        //     },
        // });
    }
    
    render() {
        return (
            <Link
                ref="link"
                to={`/user/${this.props.owner.login}/repos/${this.props.name}`}
                className="repo-item"
                onClick={this.click}
            >
                <RepoContent {...this.props} />
            </Link>
        );
    }
}
