import React, { Component } from 'react';
import isEmpty from '../../utils/isEmpty'

class ProfileHeader extends Component {
    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-md-12">
                        <div className="card card-body bg-info text-white mb-3">
                            <div className="row">
                            <div className="col-4 col-md-3 m-auto">
                                <img className="rounded-circle" src={this.props.profile.user.avatar} alt="" />
                            </div>
                            </div>
                            <div className="text-center">
                            <h1 className="display-4 text-center">{this.props.profile.user.name}</h1>
                            <p className="lead text-center">{this.props.profile.status} at {isEmpty(this.props.profile.company) ? null : this.props.profile.company}</p>
                            <p>{isEmpty(this.props.profile.location) ? null : this.props.profile.location}</p>
                            <p>
                                {isEmpty(this.props.profile.website) ? null : (
                                    <a className="text-white p-2" href={this.props.profile.website}>
                                    <i className="fas fa-globe fa-2x"></i>
                                    </a>
                                )}
                                {isEmpty(this.props.profile.social && this.props.profile.social.twitter) ? null : (
                                    <a className="text-white p-2" href={this.props.profile.social.twitter}>
                                    <i className="fab fa-twitter fa-2x"></i>
                                    </a>
                                )}
                                {isEmpty(this.props.profile.social && this.props.profile.social.facebook) ? null : (
                                    <a className="text-white p-2" href={this.props.profile.social.facebook}>
                                    <i className="fab fa-facebook fa-2x"></i>
                                    </a>
                                )}
                                {isEmpty(this.props.profile.social && this.props.profile.social.linkedin) ? null : (
                                    <a className="text-white p-2" href={this.props.profile.social.linkedin}>
                                    <i className="fab fa-linkedin fa-2x"></i>
                                    </a>
                                )}
                                {isEmpty(this.props.profile.social && this.props.profile.social.instgram) ? null : (
                                    <a className="text-white p-2" href={this.props.profile.social.instgram}>
                                    <i className="fab fa-instagram fa-2x"></i>
                                    </a>
                                )}
                                
                                
                            </p>
                        </div>
                    </div>
            </div>
          </div>
            </div>
        )
    }
}

export default ProfileHeader;