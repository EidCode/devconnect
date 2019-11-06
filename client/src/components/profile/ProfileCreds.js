import React, { Component } from 'react';
import Moment from 'react-moment';
import isEmpty from '../../utils/isEmpty'

class ProfileCreds extends Component {
    render() {
        const {education, experiences} = this.props;
        const experiencesDisplay = experiences.map((experience, index) => (
            <li class="list-group-item" key={index}>
                <h4>{experience.company}</h4>
                <p><Moment format="YYYY/MM/DD">{experience.from}</Moment> - {experience.to === null ? ('Now') : (<Moment format="YYYY/MM/DD">{experience.to}</Moment>)}</p>
                <p>
                    <strong>Position:</strong> {experience.title}
                </p>
                <p>
                    <strong>Description:</strong> {isEmpty(experience.description) ? null : experience.description}
                </p>
            </li>
        ));
        const educationDisplay = education.map((edu, index) => (
            <li class="list-group-item" key={index}>
                <h4>{edu.school}</h4>
                <p><Moment format="YYYY/MM/DD">{edu.from}</Moment> - {edu.to === null ? ('Now') : (<Moment format="YYYY/MM/DD">{edu.to}</Moment>)}</p>
                <p>
                    <strong>Degree: </strong>{edu.degree}</p>
                <p>
                    <strong>Field Of Study: </strong>{edu.fieldofstudy}</p>
                
                <p>
                    <strong>Description:</strong> {isEmpty(edu.description) ? null : edu.description}
                </p>
            </li>
        ))
        return (
            <div>

                <div class="row">
                    <div class="col-md-6">
                        <h3 class="text-center text-info">Experience</h3>
                        {
                            experiencesDisplay.length > 0 ? (
                            <ul class="list-group">
                            {experiencesDisplay}
                        </ul>
                        ) : (<h2>No Experiences History</h2>)
                        }
                    </div>
                    <div class="col-md-6">
                        <h3 class="text-center text-info">Education</h3>
                        {
                            educationDisplay.length > 0 ? (
                            <ul class="list-group">
                            {educationDisplay}
                        </ul>
                        ) : (<h2>No Education History</h2>)
                        }
                        
                    </div>
                </div>
            </div>
            
        )
    }
}

export default ProfileCreds;