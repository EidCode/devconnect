import React, { Component } from 'react';
import isEmpty from '../../utils/isEmpty';

class ProfileAbout extends Component {
    
    render() {
        const {profile} = this.props;
        const skillsDisplay = profile.skills.map((skill, index) => (
            <div className="p-3" key={index}>
                    <i className="fa fa-check"></i> {skill}
            </div>
            
        ))
        
        return (
            <div>
                <div class="row">
            <div class="col-md-12">
              <div class="card card-body bg-light mb-3">
                <h3 class="text-center text-info">{profile.user.name}'s Bio</h3>
                <p class="lead text-center">{isEmpty(profile.bio) ? null : profile.bio}
                </p>
                <hr />
                <h3 class="text-center text-info">Skill Set</h3>
                <div class="row">
                  <div class="d-flex flex-wrap justify-content-center align-items-center">
                    {skillsDisplay}
                  </div>
                </div>
              </div>
            </div>
          </div>
            </div>
        )
    }
}

export default ProfileAbout;