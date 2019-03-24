import React, { Component } from 'react'

class ContactForm extends Component {
    constructor(props){
        super(props)
        this.state = {
            name: '',
            lastname: '',
            company: '',
            phone: '',
            email: ''
        }

        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    onChange(event){
        this.setState({[event.target.name]: event.target.value})
    }

    onSubmit(event){
        event.preventDefault()

        const postData = {
            name: this.state.name,
            lastname: this.state.lastname,
            company: this.state.company,
            phone: this.state.phone,
            email: this.state.email
        }

        if(postData.company === ''){
            postData.company = null
        }
        if(postData.phone === ''){
            postData.phone = null
        }

        fetch(`http://localhost:3001/api/contacts`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(postData)
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
        })
    }

  render() {
    return (
      <div>
        <h1>Add contact</h1>
        <hr />
        <form onSubmit={this.onSubmit}>
            <div>
                <label>Name </label>
                <input type="text" name="name" onChange={this.onChange} value={this.state.name} />
            </div>
            <div>
                <label>Lastname </label>
                <input type="text" name="lastname" onChange={this.onChange} value={this.state.lastname} />
            </div>
            <div>
                <label>Company </label>
                <input type="text" name="company" onChange={this.onChange} value={this.state.company} />
            </div>
            <div>
                <label>Phone </label>
                <input type="text" name="phone" onChange={this.onChange} value={this.state.phone} />
            </div>
            <div>
                <label>Email </label>
                <input type="text" name="email" onChange={this.onChange} value={this.state.email} />
            </div>
            <div>
                <button type="submit">Save</button>
            </div>
        </form>
      </div>
    )
  }
}

export default ContactForm