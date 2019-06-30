import React, { Component } from 'react'
import Master from './Master'
import axios from 'axios'
import { withRouter } from "react-router-dom";
import Spinner from 'react-spinner-material';
const configPost = {
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
}
class EditNew extends Component {
  constructor (props) {
    super(props)
    this.state = {
      title: '',
      isLoading:true
    }

    this.handleChangeTitle = this.handleChangeTitle.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.demoBack = this.demoBack.bind(this)
  }

  componentDidMount () {
    let url = window.Laravel.baseUrl + '/api/edit/' + this.props.match.params.id
    axios.get(url)
      .then(response => {
        this.setState(response.data)
        this.setState({isLoading:false})
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  handleChangeTitle (e) {
    this.setState({
      title: e.target.value
    })
  }



  handleSubmit (e) {
    e.preventDefault()
    let url = window.Laravel.baseUrl + '/api/update';
    const data = {
      id:this.props.match.params.id,
      title: this.state.title,
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

  showLoading(){
    return (<Spinner size={120} spinnerColor={"red"} spinnerWidth={2} visible={true} />)
  }

  showFormEdit(){
    return <form onSubmit={this.handleSubmit}>
          <div className='form-group'>
            <label htmlFor='title'>Tiêu đề</label>
            <input type='text' className='form-control' id='title' placeholder='title'
              value={this.state.title} onChange={this.handleChangeTitle} required />
          </div>
          <button type='submit' className='btn btn-primary' style={{marginRight: '5px'}}>Sửa</button>
          <button  className='btn btn-primary' onClick={this.demoBack}>Back</button>
        </form>
  }

  render () {
    return (
      <Master>
        <h1>Sửa tin tức</h1>
        {this.state.isLoading?(this.showLoading()):this.showFormEdit()}
      </Master>
    )
  }
}
export default withRouter(EditNew);