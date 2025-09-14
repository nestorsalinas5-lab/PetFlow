import React from 'react';
import { MealPlanner } from '../components/MealPlanner';

const MealPlannerView: React.FC = () => {
    return (
        <div className="container-fluid">
            <div className="row justify-content-center">
                <div className="col-12 col-md-10 col-lg-8">
                    <MealPlanner />
                </div>
            </div>
        </div>
    )
}

export default MealPlannerView;
