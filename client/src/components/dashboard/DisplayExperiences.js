import React, { Component } from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import Moment from 'react-moment';
import {deleteExperience} from '../../actions/profileActions'

class DisplayExperiences extends Component {
    
    onClick(id) {
        this.props.deleteExperience(id)
    }
    render() {
        const experiences = this.props.experiences.map(exp => (
            
                <tbody>
                    <tr key={exp._id}>
                    <th scope="row">{exp.company}</th>
                    <td>{exp.title}</td>
                    <td>
                    <Moment format="YYYY/MM/DD">{exp.from}</Moment> - {exp.to === null ? ('Now') : (<Moment format="YYYY/MM/DD">{exp.TO}</Moment>)}
                    
                    </td>
                    <td><button onClick={this.onClick.bind(this, exp._id)} className="btn btn-danger">Delete</button></td>
                    </tr>
                    
                </tbody>
            
        ))
        return (
            <div>
                <table className="table">
                <thead>
                    <tr>
                    <th scope="col">Company</th>
                    <th scope="col">Title</th>
                    <th scope="col">Duration</th>
                    <th scope="col"></th>
                    </tr>
                </thead>
                {experiences}
            </table>
            </div>
        )
    }
}

export default connect(null, {deleteExperience})(withRouter(DisplayExperiences))