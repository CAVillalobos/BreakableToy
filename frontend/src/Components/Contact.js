import React, { Component } from 'react'
import { Table, Divider, notification, Button } from 'antd';
import ContactPost from './ContactPost'
import ContactPut from './ContactPut'
const { Column, ColumnGroup } = Table;

class Contact extends Component {
    constructor(props) {
        super(props)
        this.state = {
            page: 1,
            pages: null,
            contacts: [],
            totalDocs: null,
            showContactForm: false,
            showEditForm: false,
            columns: [
                { title: "First Name", dataIndex: "name", key: "firstName" },
                { title: "Last Name", dataIndex: "lastname", key: "lastName" },
                { title: "Company", dataIndex: "company", key: "company" },
                { title: "Phone", dataIndex: "phone", key: "phone" },
                { title: "Email", dataIndex: "email", key: "email" },
                {
                    dataIndex: "edit", key: "edit",
                    render: (text, record) => (
                        <a onClick={this.onContactCheck.bind(this, record)}>Edit</a>
                    )
                },
                {
                    dataIndex: "remove", key: "remove",
                    render: (text, record) => (
                        <a onClick={this.onContactRemove.bind(this, record)}>Remove</a>
                    )
                }
            ]
        }
    }

    onContactCheck(contact) {
        this.setState({ selectedContact: contact, showEditForm: true, showContactForm: false })
    }

    onContactRemove(contact) {
        fetch(`http://localhost:3001/api/contacts/${contact._id}`, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(contact._id)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
            })
    }

    componentWillMount() {
        this.fetchContacts(this.state.page)
    }

    showForm(){
        this.setState({showContactForm: !this.state.showContactForm, showEditForm: false})
    }

    fetchContacts(page) {
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

    onPageChange(page) {
        this.fetchContacts(page)
    }

    render() {
        const contactItems = this.state.contacts.map((contact, index) => { return Object.assign({}, contact, { key: index }) })
        return (
            <div id="usersTable">
                <Table dataSource={contactItems}
                    columns={this.state.columns}
                    pagination={{ current: this.state.page, total: this.state.totalDocs, onChange: this.onPageChange.bind(this) }}
                    bordered />
                <Button type="primary" onClick={this.showForm.bind(this)}>Add new contact</Button>
                {this.state.showEditForm && <ContactPut contact={this.state.selectedContact} reRender={this.fetchContacts.bind(this)}/>}
                {this.state.showContactForm && <ContactPost reRender={this.fetchContacts.bind(this)} />}
            </div>
        )
    }
}

export default Contact