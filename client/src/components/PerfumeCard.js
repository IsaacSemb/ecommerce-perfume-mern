import React from "react";

function PerfumeCard(props) {
  return (
    <div className="card">
      <div className="card-img-container">
        <img
          className="card-img-top"
          src={`${process.env.PUBLIC_URL}/img/${props.category}/${props.fileName}`}
          alt={props.fileName}
        />
      </div>
      <div className="card-body">
        <h5 className="card-title">{props.title}</h5>
        <p className="card-text">{props.description}</p>
        <div className="add-to-cart">
          <div className="btn btn-primary perfume-card ">
            Buy Item
          </div>

          <div className="price">£{props.price.toFixed(2)}</div>
        </div>
      </div>
    </div>
  );
}

function PerfumeCardCategory(props) {
  return (
    <div className="card">
      <div className="card-img-container">



        {/* <Link to={"/perfumes"}> */}

          <img
            className="card-img-top"
            src={`${process.env.PUBLIC_URL}/img/categories/${props.fileName}`}
            alt={props.fileName}
          />

        {/* </Link> */}




        
      </div>
      <div className="card-body">
        <h5 className="card-title">{props.title}</h5>
        <p className="card-text">
          {props.description}
        </p>




        <div className="btn btn-primary perfume-card" >

          Check it Out
          
        </div>






      </div>
    </div>
  );
}

export default PerfumeCard;
export { PerfumeCardCategory };
