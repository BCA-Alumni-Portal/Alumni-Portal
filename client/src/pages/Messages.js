import '../index.css'
import 'boxicons'

export default function Messages() {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-5">
          <h2>Contacts </h2>
          <div className="list-group">
            <a href="#hayun" className="list-group-item list-group-item-action active" aria-current="true">
              Hayun Jung
            </a>
            <a href="#daniel" className="list-group-item list-group-item-action">Daniel Kim</a>
            <a href="#benen" className="list-group-item list-group-item-action">Benen Sullivan</a>
            <a href="#remington" className="list-group-item list-group-item-action">Remington Kim</a>
            <a href="#kevin" className="list-group-item list-group-item-action">Kevin Liu</a>
          </div>
        </div>
        <div className="message_box col-md-5">
          <h2 className="align-bottom text-4xl font-bold">Messages</h2>
          <div className="message list-group">
            <p className="other-message"><box-icon name='user-circle' type='solid' color='#4691f2' ></box-icon>Hi, my name's Hayun Jung</p>
            <p className="self-message">Hello, nice to meet you. <box-icon name='user-circle' type='solid' color='#4691f2' ></box-icon></p>
            <p className="other-message"><box-icon name='user-circle' type='solid' color='#4691f2' ></box-icon>I was wondering if I could possibly intern at your office?</p>
            <p className="self-message">I'll consider it.<box-icon name='user-circle' type='solid' color='#4691f2' ></box-icon></p>
          </div>
          <div className="space-y-3">
            {/* <Form.Group className="mb-3">
              <Form.Control placeholder="Enter Text" />
            </Form.Group> */}
            <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="messages" type="text" placeholder="Message"></input>
            <div className="space-x-2">
              <button class="bg-blue hover:bg-hover-blue text-xl text-cream font-semibold py-2 px-4 rounded-full" >
                Send
              </button>
              <button class="bg-blue hover:bg-hover-blue text-xl text-cream font-semibold py-2 px-4 rounded-full" >
                Upload File
              </button>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  )
}