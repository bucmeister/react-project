import React from "react";
import { Card, CardImg, CardText, CardBody, CardTitle } from "reactstrap";

  function RenderDish({dish}) {
    if (dish !== null) {
      return (
        <div>
          <Card>
            <CardImg top src={dish.image} alt={dish.name}></CardImg>
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

  function RenderComments(dish) {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric"
    };
    if (dish !== null) {
      return (
        <div>
          <h4>Comments</h4>
          {dish.comments ? (
            <ul className='list-unstyled'>
              {dish.comments.map((comment, i) => (
                <li key={i}>
                  <p>{comment.comment}</p>
                  <p>
                    -- {comment.author},{" "}
                    {new Date(comment.date).toLocaleDateString(
                      "en-US",
                      options
                    )}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <div></div>
          )}
        </div>
      );
    }
    return <div></div>;
  }

  const Dishdetail = (props) => {
    if (props.dish != null) {
      return (
        <div className='container'>
          <div className='row'>
            <div className='col-12 col-md-5 m-1'><RenderDish dish={props.dish} /></div>
            <div className='col-12 col-md-5 m-1'><RenderComments comments={props.dish.comments} /></div>
          </div>
        </div>
      );
    } else {
      return <div/>
    }
    
  }
  
export default Dishdetail;
