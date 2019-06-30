import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Dialog from 'react-bootstrap-dialog';
class NewRow extends Component {
  constructor (props) {
    super(props)
    this.handleDelete = this.handleDelete.bind(this)
  }


  handleDelete (e) {
    e.preventDefault()
    this.props.alertForm.show({
      body: 'Are you sure?',
      actions: [
        Dialog.OKAction(() => {
          let url = window.Laravel.baseUrl + '/api/delete/' + this.props.obj.id
          axios.delete(url)
            .then(response => {
              this.props.deleteRow(this.props.index);
            })
            .catch(function (error) {
              console.log(error)
            })
        }),
        Dialog.CancelAction(()=>{
        }),

      ]
    })

  }
  render () {
    return (
      <tr>
        <td>
          {this.props.index+1}
        </td>
        <td>
          {this.props.obj.title}
        </td>
        <td>
          {moment(this.props.obj.created_at).format("DD-MM-YYYY hh:mm:ss") }
        </td>
        <td>
          <Link className='btn btn-primary' to={'/users/edit/' + this.props.obj.id}>Edit</Link>
        </td>
        <td>
          <button className='btn btn-danger' onClick={this.handleDelete}>Delete</button>
        </td>
      </tr>
    )
  }
}

export default NewRow