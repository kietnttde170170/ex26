import React, { Component } from 'react';
import Menu from './MenuComponent';
import DishDetail from './DishdetailComponent';
import { DISHES } from '../shared/dishes';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent';
import Contact from './ContactComponent';
import { COMMENTS } from '../shared/Comment';
import { PROMOTIONS } from '../shared/Promotions';
import { LEADERS } from '../shared/Leader';
import { Routes, Route } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import Login from './Login';
class Main extends Component {

    constructor(props) {
        super(props);

        this.state = {
            dishes: DISHES,
            comments: COMMENTS,
            promotions: PROMOTIONS,
            leaders: LEADERS
        };
    }


    onDishSelect(dishId) {
        this.setState({ selectedDish: dishId });
    }

    render() {

        const HomePage = () => {
            return (
                <Home
                    dish={this.state.dishes.filter((dish) => dish.featured)[0]}
                    promotion={this.state.promotions.filter((promo) => promo.featured)[0]}
                    leader={this.state.leaders.filter((leader) => leader.featured)[0]}
                />
            );
        }

        const DishWithId = () => {
            const { dishId } = useParams();
            return (
                <DishDetail dish={this.state.dishes.filter((dish) => dish.id === parseInt(dishId, 10))[0]}
                    comments={this.state.comments.filter((comment) => comment.dishId === parseInt(dishId, 10))} />
            );
        };



        return (
            <div>

                <Header />

                <Routes>
                    <Route path='/home' element={<HomePage />} />
                    <Route path='/menu' element={<Menu dishes={this.state.dishes} onClick={(dishId) => this.onDishSelect(dishId)} />} />
                    <Route path='/login' Component={Login} />
                    <Route path='/contactus' element={<Contact />} />
                    <Route path='/menu/:dishId' element={<DishWithId />} />
                </Routes>




                <DishDetail dish={this.state.dishes.filter((dish) => dish.id === this.state.selectedDish)[0]} />
                <Footer />
            </div>
        );

    }

}

export default Main;
