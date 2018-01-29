import React from 'react'
import Modal from 'react-modal';
import 'antd/dist/antd.css'
import { Form, Icon, Input, Button, Checkbox, Slider, Select } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;


// Modal Part
const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)'
    }
  };
//End Of Modal
class ModalForm extends React.Component {
    
    constructor(props){
        super(props)
        this.state = {
            isOpen: false,
            name: '',
            description:''

        };
        this.openModal = this.openModal.bind(this);
        // this.afterOpenModal = this.afterOpenModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        //Handle All Form Input
        this.handleChangeName = this.handleChangeName.bind(this)
        this.handleChangeDescription = this.handleChangeDescription.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    handleSubmit (e){
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
          if (!err) {
            console.log('Received values of form: ', values);
            var url = 'http://localhost:9000/product';
            var data = {
                name: values.name,
                condition: values.condition_string,
                description: values.description,
                image: values.image,
                name: values.name,
                price: values.price,
                colors: values.color
            };
            console.log("Data >>",data)

            fetch(url, {
            method: 'POST', // or 'PUT'
            body: JSON.stringify(data), 
            headers: new Headers({
                'Content-Type': 'application/json'
            })
            }).then(res => res.json())
            .catch(error => {
                console.error('Error:', error)
            })
            .then(response => {
                console.log('Success:', response)
                this.setState({
                    isOpen: false
                })
                let statusSave = response.result_json.affectedRows
                console.log("statusSave >> ", statusSave)
                if(statusSave ===1){
                    alert("Success Saved To DB")
                } else{
                    alert("Failed To Save")
                }
            });
          }
        });
      }
    openModal(){
        this.setState({
            isOpen: true
        })
    }
    closeModal(){
        this.setState({
            isOpen: false
        })
    }
    handleChangeName(event) {
        this.setState({name: event.target.value});
        console.log("state name : ", this.state.name)
    }
    handleChangeDescription(event) {
        this.setState({description: event.target.value});
        console.log("state description : ", this.state.name)
    }    
    
    render(){
        console.log('MOODALLLLLL')
        const { getFieldDecorator } = this.props.form;
        return (
        <div>
        <Button type="default" onClick={this.openModal}>Add Product</Button>
        <Modal
          isOpen={this.state.isOpen}
        //   onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Form Add Product"
          closeTimeoutMS={200}
          ariaHideApp={false}
        >

          <h2 ref={subtitle => this.subtitle = subtitle}>Add New Product</h2>
        
          <Form onSubmit={this.handleSubmit} className="login-form">
            <FormItem>
            {getFieldDecorator('name', {
                rules: [{ required: true, message: 'Please input product name!' }],
            })(
                <Input prefix={<Icon type="edit" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="name" />
            )}
            </FormItem>
            <FormItem>
                {getFieldDecorator('description', {
                    rules: [{ required: true, message: 'Please input product' }],
                })(
                    <Input prefix={<Icon type="edit" style={{ color: 'rgba(0,0,0,.25)' }} />} type="text" placeholder="description" />
                )}
            </FormItem>
            <FormItem>
                {getFieldDecorator('price', {
                    rules: [{ required: true, message: 'Please input price' }],
                })(
                    <Input prefix={<Icon type="edit" style={{ color: 'rgba(0,0,0,.25)' }} />} type="text" placeholder="price" />
                )}
            </FormItem>
            <FormItem>
                {getFieldDecorator('color', {
                    rules: [{ required: true, message: 'Please input color' }],
                })(
                    <Input prefix={<Icon type="edit" style={{ color: 'rgba(0,0,0,.25)' }} />} type="text" placeholder="color" />
                )}
            </FormItem>
            <FormItem>
                {getFieldDecorator('image', {
                    rules: [{ required: true, message: 'Please input product link image' }],
                })(
                    <Input prefix={<Icon type="edit" style={{ color: 'rgba(0,0,0,.25)' }} />} type="text" placeholder="image" />
                )}
            </FormItem>
            <FormItem
                label="Select Condition"
                hasFeedback
                >
                {getFieldDecorator('condition_string', {
                    rules: [
                    { required: true, message: 'Please Choose Product Condition!' },
                    ],
                })(
                    <Select placeholder="Please select Product Condition">
                        <Option value="Used">Used</Option>
                        <Option value="New">New</Option>
                    </Select>
                )}
            </FormItem>
            <FormItem>
            {/* {getFieldDecorator('remember', {
                valuePropName: 'checked',
                initialValue: true,
            })(
                <Checkbox>Remember me</Checkbox>
            )} */}
            {/* <a className="login-form-forgot" href="">Forgot password</a> */}
            <Button type="primary" htmlType="submit" className="login-form-button">
                Save
            </Button>
            {/* Or <a href="">register now!</a> */}
            </FormItem>
        </Form>
        </Modal>
        </div>
        )
    }
}
export default Form.create()(ModalForm);