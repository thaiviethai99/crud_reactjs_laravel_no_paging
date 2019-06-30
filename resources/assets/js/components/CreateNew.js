import React, { Component } from 'react'
import Master from './Master'
import axios from 'axios'
import { withRouter } from "react-router-dom";
const configPost = {
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
}
class CreateNew extends Component {
  constructor (props) {
    super(props)
    this.state = {
      title: ''
    }

    this.handleChangeTitle = this.handleChangeTitle.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.demoBack = this.demoBack.bind(this)
  }

  handleChangeTitle(e) {
    this.setState({
      title: e.target.value
    })
  }


  handleSubmit (e) {
    e.preventDefault()
    let url = window.Laravel.baseUrl + '/api/create-title'
    const data = {
      title: this.state.title
    }
    axios.post(url, data,configPost)
      .then(response => {
        this.props.history.push('/')
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  demoBack(){
  	 this.props.history.push("/");
  }

  render () {
    return (
      <Master>
        <h1>Thêm tin tức</h1>
        <form onSubmit={this.handleSubmit}>
          <div className='form-group'>
            <label htmlFor='title'>Tiêu đề</label>
            <input type='text' className='form-control' id='title' placeholder='Title'
              value={this.state.title} onChange={this.handleChangeTitle} required />
          </div>
          <button type='submit' className='btn btn-primary' style={{marginRight: '5px'}}>Thêm</button>
          <button  className='btn btn-primary' onClick={this.demoBack}>Back</button>
        </form>
      </Master>
    )
  }
}
export default withRouter(CreateNew);