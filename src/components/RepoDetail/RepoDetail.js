import React from 'react';
import { Base64 } from 'js-base64';
import filesize from 'filesize';
import ReactMarkdown from 'react-markdown';
import classNames from 'classnames';
import RepoContent from '../RepoContent/RepoContent';
import languageColor from '../../utils/language-color.js';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
// import './RepoDetail.scss';

const TABS = [
    { key: 'readme', value: 'README' },
    { key: 'files', value: 'FILES & DIRECTORIES' },
    { key: 'contributors', value: 'CONTRIBUTORS' },
    { key: 'languages', value: 'LANGUAGES' },
];

export default class RepoDetail extends React.Component {
    
    constructor() {
        super();
        this.state = {
            activeTab: '',
        };
        this.wait = false;
        
        this.getProfile = this.getProfile.bind(this);
        this.switchTab = this.switchTab.bind(this);
        this.refreshContentHeight = this.refreshContentHeight.bind(this);
        this.onSectionScroll = this.onSectionScroll.bind(this);
    }

    static propTypes = {
        repoDetailReducer: React.PropTypes.object.isRequired,
        getRepoPageDetail: React.PropTypes.func.isRequired,
        clearRepoDetailPage: React.PropTypes.func.isRequired,
    }

    shouldComponentUpdate(nextProps, nextState){

        return (
            nextProps.repoDetailReducer != this.props.repoDetailReducer ||
            nextProps.repoDetailData != this.props.repoDetailData ||
            nextState.activeTab != this.state.activeTab
        )
    }

    onSectionScroll() {

        this.lastOffsetTop = this.refs.tabWrapper.parentElement.getBoundingClientRect().top;
        if (this.wait === false) {
            window.requestAnimationFrame(() => {
                if (this.lastOffsetTop < 60) {
                    this.refs.tabWrapper.classList.add('fixed');
                } else {
                    this.refs.tabWrapper.classList.remove('fixed');
                }
                this.wait = false;
            });
            this.wait = true;
        }
    }
    
    componentDidMount() {
        this.scrollDom = document.getElementById('scroll-section');
    
        this.scrollDom.addEventListener('scroll', this.onSectionScroll)

        setTimeout(()=>{
            this.getProfile()
        },300)
    }


    getProfile() {
        this.props.getRepoPageDetail(this.props.params.username, this.props.params.repoName).done(() => this.switchTab({
            key: 'readme'
        }));
    }
    
    componentWillUnmount() {
        this.props.clearRepoDetailPage()

        this.scrollDom.removeEventListener('scroll', this.onSectionScroll)
    }
    
    switchTab(tab) {
        this.setState({
            activeTab: tab.key,
        }, () => {
            this.refreshContentHeight(tab);
        });
    }
    
    refreshContentHeight(tab) {
        const selectedTab = document.getElementById(tab.key);
        var tabContent = document.getElementById('repo-tab-content');
        // this.refs.tabContent.
        tabContent.style.height = `${selectedTab.offsetHeight + 30}px`;
    }
    
    render() {

        var { repo, readme, contribs, contents, languages, loadFailed } = this.props.repoDetailReducer
        
        return (
            <div>
                <RepoContent {...(this.props.repoDetailData || repo)} />
                
                <ReactCSSTransitionGroup
                    className="tab-wrapper-transition-group"
                    transitionName="list"
                    transitionAppear
                    transitionAppearTimeout={500}
                    transitionEnterTimeout={500}
                    transitionLeaveTimeout={500}
                >
                    <div
                        id="repo-tabs-wrapper"
                        ref="tabWrapper"
                    >
                        <div id="repo-tabs">
                            {TABS.map(tab =>
                                <div
                                    key={tab.key}
                                    onClick={() => this.switchTab(tab)}
                                    className={classNames('repo-tab-item',
                                        { selected: this.state.activeTab === tab.key })}
                                >{tab.value}</div>
                            )}
                        </div>
                    </div>
                </ReactCSSTransitionGroup>
                
                {loadFailed ?
                    <div className="offline-msg">
                        You are offline!
                        <div onClick={this.getProfile()} className="blue-link">Try again</div>
                    </div> : null}
                
                <div ref="tabContent" id="repo-tab-content">
                    <div
                        className={classNames('repo-content-item', 'markdown-body',
                                  { show: this.state.activeTab === 'readme' })}
                        id="readme"
                    >
                        {readme ?
                            <ReactMarkdown source={readme} /> :
                            <div className="empty-data">No data</div>}
                    </div>

                    <div
                        className={classNames('repo-content-item', { show: this.state.activeTab === 'files' })}
                        id="files"
                    >
                        {contents.length ? contents.map(content =>
                            <div key={content.sha + content.name} className="file-item">
                                <div className="file-icon">
                                    {content.type === 'file' ?
                                        <i className="fa fa-file-text-o"></i> :
                                        <i className="fa fa-folder"></i>}
                                </div>
                                <div className="file-info">
                                    <div className="file-name">{content.name}</div>
                                    <div className="file-date">
                                        {content.type === 'file' ?
                                            filesize(content.size) : null}
                                    </div>
                                </div>
                            </div>
                        ) : <div className="empty-data">No data</div>}
                    </div>

                    <div
                        className={classNames('repo-content-item',
                                  { show: this.state.activeTab === 'contributors' })}
                        id="contributors"
                    >
                        {(contribs && contribs.length) ? contribs.map(contrib =>
                            <div key={contrib.id + contrib.login} className="contrib-item">
                                <div
                                    className="contrib-avatar"
                                    style={{ backgroundImage: `url('${contrib.avatar_url}')` }}
                                ></div>
                                <div className="contrib-info">
                                    <div className="contrib-name">{contrib.login}</div>
                                    <div className="contrib-value">{contrib.contributions} {' '}
                                        contribution{contrib.contributions === 1 ? '' : 's'}</div>
                                </div>
                            </div>
                        ) : <div className="empty-data">No data</div>}
                    </div>

                    <div
                        className={classNames('repo-content-item',
                                  { show: this.state.activeTab === 'languages' })}
                        id="languages"
                    >
                        {languages.length ? languages.map(language =>
                            <div key={language.name} className="lang-item">
                                <div
                                    className="lang-color"
                                    style={{ backgroundColor: languageColor(language.name) }}
                                ></div>
                                <div className="lang-info">
                                    <div className="lang-name">{language.name}</div>
                                    <div className="lang-value">{language.value}%</div>
                                </div>
                            </div>
                        ) : <div className="empty-data">No data</div>}
                    </div>

                </div>
            </div>
        );
    }
}
