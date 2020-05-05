import React, { Component } from 'react';
import { Button , Col } from 'react-bootstrap';
import { Navbar , Nav} from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal'
import Card from 'react-bootstrap/Card'
import CardColumns from 'react-bootstrap/CardColumns'
//import CardDeck from 'react-bootstrap/CardDeck'
import Form from 'react-bootstrap/Form'
import Table from 'react-bootstrap/Table'
import axios from 'axios';
import Alert from 'react-bootstrap/Alert'

class App extends Component{
  

 
  constructor(props, context) {
		super(props, context);
    this.state = {
      pizzas: [],
      show:false,
      alertshow:false,
      pizzasarray: [],
      cartquantity : 0,
      cartprice : 0,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleShow = this.handleShow.bind(this);
		this.handleClose = this.handleClose.bind(this);
		this.clearall = this.clearall.bind(this);
   
      }

     
      componentDidMount() {
     
     
       
      axios.get('https://enigmatic-crag-00974.herokuapp.com/api/pizzas')
        .then(res => {
        const pizzasarray = res.data;

         this.setState({ pizzasarray });
       }).catch((error) => {
      
            
        })
      
   
      }
     
    
     
      handleClose() {
        this.setState({ show: false });
      }
      clearall() {
        this.setState({ show: false });
        this.setState({alertshow:true},()=>{
          window.setTimeout(()=>{
            this.setState({visible:false});
            window.location.reload();
          },1000)
        });
      
 
      }
      handleShow() {
        this.setState({ show: true });
      }
    
  handleSubmit(e) {
    e.preventDefault();
       
        const { pizzas } = this.state,
        quantity = e.target.pizzaquantity.value,
        pizzaprice = e.target.pizzaprice.value,
        pizzaname = e.target.pizzaname.value,
        id= e.target.id;
        console.log(quantity);
        const newValue = pizzas.filter(pizza => pizza.id !== e.target.id);
        const pizzavalue=Number(pizzaprice)*Number(quantity);
        if(quantity !== '0'){
          console.log('not zero');
        this.setState(
            {
              pizzas: [
                ...newValue,
                {
                  quantity,
                  id,
                  pizzaprice,
                  pizzaname,
                  pizzavalue
                 
                }
              ]
            },
            () => {
                
             
              
            }
          );
          }else{
            console.log('zero');
            this.setState(
              { pizzas: newValue });
          }
       
   
    };

    render(){ 
     
        const { pizzas } = this.state;
       
        const cartquantity =pizzas.reduce((total, pizzas) => Number(total) + Number(pizzas.quantity), 0)
        const cartprice =pizzas.reduce((totalprice, pizzas) => Number(totalprice) + Number(pizzas.pizzavalue), 0)
        
     
       
      
        return (
           
            <>
           <Alert show={this.state.alertshow} variant= 'success' >
   Order Placed Successfullt !! Thanks !!
  </Alert>
            <Modal show={this.state.show}  onHide={this.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Cart Items ( {cartquantity})</Modal.Title>
        </Modal.Header>
      
        {(this.state.pizzas.length > 0 ? 
   (  <> <Modal.Body><Table striped bordered hover>
    <thead>
      <tr>
        <th>#</th>
        <th>Pizza</th>
        <th>Quantity</th>
        <th>Unitprice</th>
        <th>Price (€)</th>
        <th>Price ($) </th>
      </tr>
    </thead>
    <tbody>
          {
         this.state.pizzas.map(function(item, i){
    
    return <tr>
       <td>{Number(i) + Number(1)}</td>
      <td>{item.pizzaname}</td>
      <td>{item.quantity}</td>
      <td>{item.pizzaprice}</td>
      <td>{item.pizzavalue}</td>
      <td>{Number(item.pizzavalue*1.1).toFixed(1)}</td>
        
        
      </tr>
  
   
     
     
  
  
  }) }
  <tr>
  <td colspan='4'>Total Price</td><td>{cartprice}</td><td>{Number(cartprice*1.1).toFixed(1)}</td>
  </tr>
              </tbody>
  </Table>  </Modal.Body> <Modal.Footer>
          <Button variant="secondary" onClick={this.handleClose} >
            Close
          </Button>
          <Button variant="primary" onClick={this.clearall} >
            CheckOut
          </Button>
        </Modal.Footer></>) 
   : (<>
  <Modal.Body><h4>Your Cart is Empty !!</h4> </Modal.Body> <Modal.Footer>
    <Button variant="secondary" onClick={this.handleClose} >
      Close
    </Button>
   
  </Modal.Footer></>) 
)}
       
   
        
       
      </Modal>
   <body >
         <Navbar bg="light" expand="lg">
  <Navbar.Brand href="#home"><h2>MY PIZZA</h2></Navbar.Brand>
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse  className="justify-content-end">
   
  
  </Navbar.Collapse>
  <Navbar.Collapse className="justify-content-end">
    <Navbar.Text>
    <Button onClick={this.handleShow} variant="danger">MyCart - {cartquantity}</Button>
    </Navbar.Text>
  </Navbar.Collapse>
</Navbar>  
<div className="container">
<CardColumns>
            
            {this.state.pizzasarray.map((pizzaitem,i) => (
              <>
       <Card  ClassName="card">
     <Card.Img variant="top" src={require('./images.jpg')} />
    <Card.Body style={{backgroundColor:"9a6694"}}>
      <Card.Title>{pizzaitem.Pizza_name}</Card.Title>
      <Card.Text>Pizza Price (€)  : {pizzaitem.Pizza_price} </Card.Text>
      <Card.Text>Pizza Price ($)  : {Number(pizzaitem.Pizza_price*1.1).toFixed(1)} </Card.Text>
    </Card.Body>
    <Card.Footer>
    <Form id={pizzaitem.id}  onSubmit={this.handleSubmit}>
  <Form.Row>
    <Col>
      <Form.Control  placeholder="Quantity"  min='0' max='20' type='number' name='pizzaquantity'  />
      <Form.Control  placeholder="Quantity"  type='hidden' name='pizzaprice' value={pizzaitem.Pizza_price} />
      <Form.Control  placeholder="Quantity"  type='hidden' name='pizzaname' value={pizzaitem.Pizza_name} />
 </Col>
    <Col>
    <Button id='' type='submit'  ref='submit' variant="primary">Add to Cart</Button>
    </Col>
  </Form.Row>
</Form>
   
    </Card.Footer>
  </Card>
 
 
      </>

    ))}
 </CardColumns>

  </div>

</body>
</>
        );
    }   
}

export default App;
