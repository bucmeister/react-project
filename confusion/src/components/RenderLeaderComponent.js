import React from 'react';
import { Media } from 'reactstrap';


const RenderLeader = (props) => {

    const RenderThem = props.leaders.map((leader) => {
        return (
            <div key={leader.id} className="col-12 mt-5">
                <Media tag="li">
                    <Media left middle>
                        <Media object src={leader.image} alt={leader.name} />
                    </Media>
                    <Media body className="ml=5">
                        <Media heading>{leader.name}</Media>
                        <p>{leader.description}</p>
                    </Media>
                </Media>
            </div>
        );
    });

    return (
        <div className="container">
             {RenderThem}
        </div>
    );
}


export default RenderLeader;