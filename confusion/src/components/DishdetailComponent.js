import React, { Component, useState } from "react";
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem, Row, Col, Label } from "reactstrap";
import { Link } from 'react-router-dom';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';

const minLength = len => val => val && val.length >= len;
const maxLength = len => val => !val || val.length <= len;

class CommentForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
    };
    this.toggleModal = this.toggleModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(values) {
    alert("Current State is "+JSON.stringify(values));
    this.toggleModal();
    this.props.postComment(this.props.dishId, values.rating, values.yourname, values.comment);
  }

  toggleModal() {
    this.setState({
        isModalOpen: !this.state.isModalOpen
    });
  }

  render() {
    return(
    <div>
      <Button onClick={this.toggleModal}><span className="fa fa-pencil fa-lg"/> Submit Comment</Button>
      <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
        <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
        <ModalBody>
        <LocalForm onSubmit=
        {(values) => this.handleSubmit(values)}
        >
          <Row>
            <Col>
              <Label htmlFor="rating">Rating</Label>
            </Col>
          </Row>
          <Row className="form-group">
            <Col>
              <Control.select model=".rating" name="rating"
                className="form-control"
                onChange={this.handleInputChange}>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </Control.select>
            </Col>
          </Row>
          <Row>
            <Col>
              <Label htmlFor="yourname">Your Name</Label>
            </Col>
          </Row>
          <Row className="form-group">
            <Col>
              <Control.text model=".yourname" id="yourname" name="yourname"
                placeholder="Your Name" 
                className="form-control"
                validators={{
                  minLength: minLength(2), maxLength: maxLength(15)
                }}
                />
                <Errors 
                  className="text-danger"
                  model=".yourname"
                  show="touched"
                  messages={{
                    minLength: 'Must be greater than 2 characters',
                    maxLength: 'Must be 15 characters or less'
                  }}
                />
            </Col>
          </Row>
          <Row>
            <Col>
              <Label htmlFor="comment">Comment</Label>
            </Col>
          </Row>
          <Row className="form-group">
            <Col>
              <Control.textarea model=".comment" id="comment" name="comment"
                rows="6"
                className="form-control"
                />
            </Col>
          </Row>
          <Button type="submit" color="primary">Submit</Button>
          </LocalForm>
        </ModalBody>
      </Modal>
    </div>
    )
  };
}

function RenderDish({dish}) {
    if (dish !== null) {
      return (
        <div>
          <Card>
            <CardImg top src={baseUrl + dish.image} alt={dish.name}></CardImg>
            <CardBody>
              <CardTitle>{dish.name}</CardTitle>
              <CardText>{dish.description}</CardText>
            </CardBody>
          </Card>
        </div>       
      );
    }
    return <div></div>;
  }

function RenderComments(props) {
  const { dish, postComment, dishId, comments} = props;
  console.log('dish', dish);
  console.log('postcomment', postComment);
  console.log('dishId', dishId);
  console.log('comments', comments)
    const commentsList = comments.map(comment => {
      const options = {
        year: "numeric",
        month: "long",
        day: "numeric"
      };

      return (
        <div>
        <p>{comment.comment}</p>
        <p>
          {comment.author},{" "}
          {new Date(comment.date).toLocaleDateString(
            "en-US",
            options
          )}
        </p>
      </div>
      )
    }
    );
      
    if (dish !== null) {
      return (
        <div>
          <h4>Comments</h4>
          {comments ? (
            <div>
              <ul className='list-unstyled'>
               {commentsList}
              </ul>
              <CommentForm dishId={dishId} postComment={postComment}/>
            </div>
          ) : (
            <div></div>
          )}
        </div>
      );
    }
    return <div></div>;
  }

const Dishdetail = (props) => {
  console.log('b4', props);
    if (props.isLoading) {
      return(
        <div className="container">
          <div className="row">
            <Loading />
          </div>
        </div>
      );
    } else if (props.errMess) {
      return(<div className="container">
        <div className="row">
          <h4>{props.errMess}</h4>
        </div>
      </div>
      );
    }
    if (props.dish != null) {
      return (
        <div className='container'>
          <div className="row">
            <Breadcrumb>
              <BreadcrumbItem><Link to='/menu'>Menu</Link></BreadcrumbItem>
              <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
              <div className="col-12">
                <h3>{props.dish.name}</h3>
                <hr />
              </div>
            </Breadcrumb>
          </div>
          <div className='row'>
            <div className='col-12 col-md-5 m-1'><RenderDish dish={props.dish} /></div>
            <div className='col-12 col-md-5 m-1'><RenderComments comments={props.comments} postComment={props.postComment} dishId={props.dish.id} dish={props.dish}/></div>
          </div>
        </div>
      );
    } else {
      return <div/>
    }
    
  }
  
export default Dishdetail;
