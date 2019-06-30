import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Spinner from 'react-spinner-material';
import Dialog from 'react-bootstrap-dialog';
import Master from './Master'
import NewRow from './NewRow'

class NewList extends Component {
  constructor (props) {
    super(props)
    this.state = { news: '',isLoading:true }
  }
  componentDidMount () {
    axios.get(window.Laravel.baseUrl + '/api/home')
      .then(response => {
        this.setState({ news: response.data.data,isLoading:false })
      })
      .catch(function (error) {
        console.log(error)
      })
  }


  deleteRow (key) {
    var news = [...this.state.news];
    news.splice(key, 1);
    this.setState( {news} );
  }

  fetchRows () {
    if (this.state.news instanceof Array) {
      return this.state.news.map( (object, i) => {
        return <NewRow obj={object} key={i}  index={i} alertForm={this.dialog} deleteRow={ this.deleteRow.bind(this) } />
      })
    }
  }

  showLoading(){
    return (<tr><td colSpan={3} align="center"><Spinner size={120} spinnerColor={"red"} spinnerWidth={2} visible={true} /></td></tr>)
  }

  render () {
    return (
      <Master>
        <h1>Danh sách tin tức</h1>
        <div className='clearfix'>
          <Link className='btn btn-success pull-right' to='/create-title'>Thêm tin tức</Link>
        </div>
        <table className='table table-hover'>
          <thead>
            <tr>
              <td>STT</td>
              <td>Tiêu đề</td>
              <td>Ngày tạo</td>
            </tr>
          </thead>
          <tbody>
           {this.state.isLoading?(this.showLoading()):this.fetchRows()}
          </tbody>
        </table>
        <Dialog ref={(component) => { this.dialog = component }} />
      </Master>
    )
  }
}
export default NewList