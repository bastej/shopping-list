import './NutrientsTable.scss';
import React from 'react';

const NutrientsTable = (props) => {
    const { calories, carbohydrates, proteins, fats } = props;
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
                    <td>{calories.toFixed(1)}</td>
                </tr>
                <tr>
                    <td className="font-weight-bold">
                    Carbohydrates
                    </td>
                    <td>{carbohydrates.toFixed(1)}</td>
                </tr>
                <tr>
                    <td className="font-weight-bold">
                    Proteins
                    </td>
                    <td>{proteins.toFixed(1)}</td>
                </tr>
                <tr>
                    <td className="font-weight-bold">
                    Fats
                    </td>
                    <td>{fats.toFixed(1)}</td>
                </tr>
                </tbody>
            </table>
        </div>
    )
}

export default NutrientsTable;