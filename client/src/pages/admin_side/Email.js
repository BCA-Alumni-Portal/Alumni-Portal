import { InputElem } from './InputElem.js'; 
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './Email.css'
//import {FileUploadPage} from './FileUploadPage.js'

export default function Email() {
  return ( 
    <div>
      <div className="sidebar">
        <h1>Filters:</h1>
        <p>2017 Culinary</p>2017 Culinary
        <p>2018 Hosa group</p>
        <p>ATCS</p>
        <p>2019 AEDT</p>
      </div>
      <div className="container">
        <h1 className="title">Write Email:</h1>
        <Form>
          <InputElem /> 
          <Form.Group className="mb-3">
            <Form.Label >Year </Form.Label>
            <Form.Control placeholder="" />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label >Academy </Form.Label>
            <Form.Control placeholder="" />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label >Group </Form.Label>
            <Form.Control placeholder="" />
          </Form.Group>
          <Form.Group>
            {/* i got to make this disabled but for now push */}
            <Form.Control as="textarea" rows={3} disabled />
            <Button type="submit">Apply Filter</Button>
          </Form.Group>
          <Button type="submit" onClick={SendEmail}>Send Email</Button>
        </Form>
      </div>
    </div>
  ) 
  }

function SendEmail(){
  alert("Email was sent")
}