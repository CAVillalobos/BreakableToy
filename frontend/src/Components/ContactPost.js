import React from 'react'
import {
    Form, Input, Button, notification
} from 'antd';

class ContactPost extends React.Component {
    state = {
        confirmDirty: false,
        autoCompleteResult: [],
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);

                const postData = {
                    name: values.name,
                    lastname: values.lastname,
                    company: values.company,
                    phone: values.phone,
                    email: values.email
                }
        
                if (postData.company === '') {
                    postData.company = null
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
            }else{
                notification.error({
                    message: "Error",
                    description: "Unable to save contact"
                })
            }
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;

        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 16,
                    offset: 8,
                },
            },
        };

        return (
            <div id="divForm">
                <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                    <Form.Item
                        label={(
                            <span>
                                Name&nbsp;
                        </span>
                        )}
                    >
                        {getFieldDecorator('name', {
                            rules: [{ required: true, message: 'Please input your name!', whitespace: true }],
                        })(
                            <Input />
                        )}
                    </Form.Item>
                    <Form.Item
                        label={(
                            <span>
                                Lastname&nbsp;
                        </span>
                        )}
                    >
                        {getFieldDecorator('lastname', {
                            rules: [{ required: true, message: 'Please input your lastname!', whitespace: true }],
                        })(
                            <Input />
                        )}
                    </Form.Item>
                    <Form.Item
                        label={(
                            <span>
                                Company&nbsp;
                        </span>
                        )}
                    >
                        {getFieldDecorator('company', {
                            rules: [{ required: false, message: 'Please input your company!', whitespace: true }],
                        })(
                            <Input />
                        )}
                    </Form.Item>
                    <Form.Item
                        label="Phone Number"
                    >
                        {getFieldDecorator('phone', {
                            rules: [{ required: false, message: 'Please input your phone number!' }],
                        })(
                            <Input />
                        )}
                    </Form.Item>
                    <Form.Item
                        label="E-mail"
                    >
                        {getFieldDecorator('email', {
                            rules: [{
                                type: 'email', message: 'The input is not valid E-mail!',
                            }, {
                                required: true, message: 'Please input your E-mail!',
                            }],
                        })(
                            <Input />
                        )}
                    </Form.Item>
                    <Form.Item {...tailFormItemLayout}>
                        <Button type="primary" htmlType="submit">Register</Button>
                    </Form.Item>
                </Form>
            </div >
        );
    }
}

const WrappedContactPost = Form.create({ name: 'insert' })(ContactPost);

export default WrappedContactPost