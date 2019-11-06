import React, { Component } from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import Moment from 'react-moment';
import {deleteEducation} from '../../actions/profileActions'

class displayEducations extends Component {
    
    onClick(id) {
        this.props.deleteEducation(id)
    }
    render() {
        const educations = this.props.educations.map(edu => (
            
                <tbody>
                    <tr key={edu._id}>
                    <th scope="row">{edu.school}</th>
                    <td>{edu.degree}</td>
                    <td>{edu.fieldofstudy}</td>
                    <td>
                    <Moment format="YYYY/MM/DD">{edu.from}</Moment> - {edu.to === null ? ('Now') : (<Moment format="YYYY/MM/DD">{edu.TO}</Moment>)}
                    
                    </td>
                    <td><button onClick={this.onClick.bind(this, edu._id)} className="btn btn-danger">Delete</button></td>
                    </tr>
                    
                </tbody>
            
        ))
        return (
            <div>
                <table className="table">
                <thead>
                    <tr>
                    <th scope="col">School</th>
                    <th scope="col">Degree</th>
                    <th scope="col">Field of study</th>
                    <th scope="col">Duration</th>
                    </tr>
                </thead>
                {educations}
            </table>
            </div>
        )
    }
}

export default connect(null, {deleteEducation})(withRouter(displayEducations))