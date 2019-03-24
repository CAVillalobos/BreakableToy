import React, { Component } from 'react'
import { Table, Divider, Tag } from 'antd';
import 'antd/lib/table/style/css'
const { Column, ColumnGroup } = Table;

class Contact extends Component {
    constructor(props) {
        super(props)
        this.state = {
            page: 1,
            pages: null,
            contacts: [],
            totalDocs: null
        }
    }

    componentWillMount() {
        this.fetchContacts(this.state.page)
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
        return (
            <div>
                <Table dataSource={this.state.contacts}>
                    <ColumnGroup title="Name">
                        <Column
                            title="First Name"
                            dataIndex="name"
                            key="firstName"
                        />
                        <Column
                            title="Last Name"
                            dataIndex="lastname"
                            key="lastName"
                        />
                    </ColumnGroup>
                    <Column
                        title="Company"
                        dataIndex="company"
                        key="company"
                    />
                    <Column
                        title="Phone"
                        dataIndex="phone"
                        key="phone"
                    />
                    <Column
                        title="Email"
                        dataIndex="email"
                        key="email"
                    />
                </Table>
            </div>
        )
    }
}

export default Contact