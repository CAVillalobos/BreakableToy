import React, { Component } from 'react'
import { Pagination } from 'antd'
import 'antd/lib/pagination/style/css'

class Contact extends Component {
    constructor(props){
        super(props)
        this.state = {
            page: 1,
            pages: null,
            contacts: [],
            totalDocs: null
        }
    }

    componentWillMount(){
        this.fetchContacts(this.state.page)
    }

    fetchContacts(page){
        return fetch(`http://localhost:3001/api/contacts?page=${page}`)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                this.setState({
                    page: data.page,
                    pages: data.totalPages,
                    contacts: data.docs,
                    totalDocs: data.totalDocs
                })
            })
    }

    onPageChange(page){
        this.fetchContacts(page)
    }

  render() {
      const contactsItems = this.state.contacts.map(contact => (
          <div key={contact._id}>
            <p>Name: {contact.name}</p>
          </div>
      ))    
    return (
      <div>
          <Pagination
            defaultCurrent={1}
            current={this.state.page}
            total={this.state.totalDocs}
            onChange={this.onPageChange.bind(this)} />
        {contactsItems}
        <Pagination
            defaultCurrent={1}
            current={this.state.page}
            total={this.state.totalDocs}
            onChange={this.onPageChange.bind(this)} /> 
      </div>
    )
  }
}

export default Contact