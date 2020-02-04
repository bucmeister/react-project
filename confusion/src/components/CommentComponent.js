import React, { Component } from 'react';

class Comment extends Component {
    constructor(props) {
        super(props);
    }

    renderComment(dish) {
        if (dish != null) {
            const comment = dish.comments.map((set) => {
                return(
                   <li key={set.id} className="list-group-item">
                       <p>{set.comment}</p>
                       <p>-- {set.author}, {set.date}</p>
                   </li>
                )
            })
            return (
                <div className="col-12 col-md-5 m-1">
                    <h4>Comments</h4>
                    <ul className="list-group">
                        {comment}
                    </ul>
                </div>     
            )
        } else { 
            return (
                <div></div>
            ) 
        }
    }

    render() {
        return (
            this.renderComment(this.props.selectedDish)
        )
    }
}

export default Comment;