import React, { Component } from "react";
import { Card, CardImg, CardText, CardBody, CardTitle } from "reactstrap";

class Dishdetail extends Component {
  constructor(props) {
    super(props);
  }

  renderDish(dish) {
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

  renderComment(dish) {
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
          {/* {console.log(dish)} */}
        </div>
      );
    }
    return <div></div>;
  }

  render() {
    const dish = this.props.dish;
    return (
      <div className='row'>
        <div className='col-12 col-md-5 m-1'>{this.renderDish(dish)}</div>
        <div className='col-12 col-md-5 m-1'>{this.renderComment(dish)}</div>
      </div>
    );
  }
}

export default Dishdetail;
