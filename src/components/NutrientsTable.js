import './NutrientsTable.scss';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { calculateNutrients } from '../actions';

class NutrientsTable extends Component {

    componentDidMount() {
        this.props.calculateNutrients(this.props.productsList);
    }

    render() { 
        const { calories, carbohydrates, proteins, fats } = this.props.nutrients;
        return ( 
            <div className="nutrients-table">
                <table className="table bg-white">
                    <thead>
                    <tr className="bg-lightblue text-white">
                        <th scope="col">Nutrients of products</th>
                        <th scope="col">Total value</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td className="font-weight-bold">
                        Calories
                        </td>
                        <td>{calories}</td>
                    </tr>
                    <tr>
                        <td className="font-weight-bold">
                        Carbohydrates
                        </td>
                        <td>{carbohydrates}</td>
                    </tr>
                    <tr>
                        <td className="font-weight-bold">
                        Proteins
                        </td>
                        <td>{proteins}</td>
                    </tr>
                    <tr>
                        <td className="font-weight-bold">
                        Fats
                        </td>
                        <td>{fats}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
         );
    }
}

const mapStateToProps = ({currentListNutrients}) => {
    return { nutrients: currentListNutrients }
}
 
export default connect(mapStateToProps, { calculateNutrients })(NutrientsTable);