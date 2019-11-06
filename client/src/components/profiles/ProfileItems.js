import React, { Component } from 'react';
import isEmpty from '../../utils/isEmpty';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types'

class ProfileItem extends Component {
    render() {
        const {profile} = this.props;
        return (
            <div className="card card-body mb-3 bg-light">
                <div className="row">
                    <div className="col-2">
                        <img src={profile.user.avatar} className="rounded-circle" />
                    </div>
                    <div className="col-8 col-md-4 col-lg-6">
                        <h3>{profile.user.name}</h3>
                        <p>{profile.status} {isEmpty(profile.company ? null : (<span>at {profile.company}</span>))}</p>
                        <Link to={`/profile/${profile.handle}`} className="btn btn-info">View Profile</Link>
                    </div>
                    <div className="col-md-4 d-none d-md-block">
                        <h4>Skills</h4>
                        <ul className="list-group">
                            {profile.skills.slice(0, 4).map((skill, index) => (
                                <li className="list-group-item" key={index}>
                                    <i className="fa fa-check pr-1" />
                                    {skill}
                                </li>
                            ))}
                        </ul>    
                    </div> 
                </div>
            </div>
        )
    }
}

ProfileItem.propTypes = {
    profile: PropTypes.object.isRequired
}

export default ProfileItem;