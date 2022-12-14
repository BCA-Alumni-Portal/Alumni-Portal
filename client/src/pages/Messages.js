import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export default function Messages() {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-5">
          <h2>Contacts </h2>
          <div className="list-group">
            <a href="#" className="list-group-item list-group-item-action active" aria-current="true">
              Hayun Jung
            </a>
            <a href="#" className="list-group-item list-group-item-action">Daniel Kim</a>
            <a href="#" className="list-group-item list-group-item-action">Benen Sullivan</a>
            <a href="#" className="list-group-item list-group-item-action">Remington Kim</a>
            <a href="#" className="list-group-item list-group-item-action">Kevin Liu</a>
          </div>
        </div>
        <div className="col-md-5">
          <h2>Messages</h2>
          <div className="message list-group">
            <p className="other-message">Hi, my name's Hayun Jung</p>
            <p className="self-message">Hello, nice to meet you. </p>
            <p className="other-message">I was wondering if I could possibly intern at your office?</p>
            <p className="self-message">I'll consider it.</p>
          </div>
          <div className="">
            <Form.Group className="mb-3">
              <Form.Control placeholder="Enter Text" />
            </Form.Group>
            <Button>Send</Button>
            <Button>Upload File</Button>
          </div>
        </div>
      </div>
    </div>
  )
}