import './ProductSnippet.scss';
import React, { Component } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class ProductSnippet extends Component {

  constructor(props) {
    super(props);

    this.detailsBoxRef = React.createRef();
    this.detailBtn = React.createRef();
  }

  showDetails = (e) => {
    const btn = this.detailBtn.current;
    const detailsBox = this.detailsBoxRef.current;
    const arrowIcon = btn.children[0];
    if (btn.getAttribute("data-switch") === "false") {
      btn.setAttribute('data-switch', true);
      arrowIcon.style.transform = 'rotateX(180deg)';
      detailsBox.style.height = '80px';
    } else {
      btn.setAttribute('data-switch', false);
      arrowIcon.style.transform = 'rotateX(0deg)';
      detailsBox.style.height = '0';
    }

  }

  render() { 
    const { product, match } = this.props;
    return ( 
      <div className="product">
        <div className="badge badge-info badge-times">
          x {product.usageCount}
        </div>
        <h6 className="name">{product.name} </h6>
        <div className="badge badge-category">
          {product.category + " "}
          {match && <img src={match.img} alt={product.category} className="category-img" />}
        </div>
        <div>
          <div 
            ref={this.detailBtn}
            onClick={this.showDetails}
            data-switch="false"
          >
            <FontAwesomeIcon
              className="fa-lg nutrients-switch"
              icon="angle-down"
            />
          </div>
          <div ref={this.detailsBoxRef} className="nutrients">
            <div className="float-right nutrients_info">
              w {product.serving_weight_grams || "--"} g/ml
            </div>
            <div className="nutrients_kcal">
              cal: {product.calories || "0"}
            </div>
            <div className="nutrients_w">
              c: {product.carbohydrates || "0"}
            </div>
            <div className="nutrients_b">
              p: {product.proteins || "0"}
            </div>
            <div className="nutrients_t">f: {product.fats || "0"}</div>
          </div>
        </div>
      </div>
    );
  }
}
 
export default ProductSnippet;