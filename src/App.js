// App.js

import React, { useState } from 'react';
import './App.css';
import SearchComponent from './components/SearchComponent';
import ShowCourseComponent from './components/ShowCourseComponent';
import UserCartComponent from './components/UserCartComponent';
import Contact from './components/Contact'; // Import the Contact component

function App() {
  const [courses] = useState([
    { id: 1, 
      name: 'T-shirt', 
      price: 499, 
      image: 'https://media.geeksforgeeks.org/wp-content/uploads/20230823165506/gfg1.png'
    },
    { id: 2, 
      name: 'Bag', 
      price: 699, 
      image: 'https://media.geeksforgeeks.org/wp-content/uploads/20230823165553/gfg2.jpg'
    },
    { id: 3, 
      name: 'Hoodie', 
      price: 799, 
      image: 'https://media.geeksforgeeks.org/wp-content/uploads/20230823165623/gfg3.jpg'
    },
    { id: 4, 
      name: 'Shoes', 
      price: 1699, 
      image: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pierrecardinindia.com%2Fproduct%2Fpc-9047-2%2F&psig=AOvVaw1deBwkrdRneRt9_VitzcDY&ust=1713518650151000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCMD86tS4y4UDFQAAAAAdAAAAABAE', alt: "info"
    }
  ]);

  const [cartCourses, setCartCourses] = useState([]);
  const [searchCourse, setSearchCourse] = useState('');

  const addCourseToCartFunction = (GFGcourse) => {
    const alreadyCourses = cartCourses.find(item => item.product.id === GFGcourse.id);
    if (alreadyCourses) {
      const latestCartUpdate = cartCourses.map(item =>
        item.product.id === GFGcourse.id ? { 
          ...item, quantity: item.quantity + 1 
        } : item
      );
      setCartCourses(latestCartUpdate);
    } else {
      setCartCourses([...cartCourses, {product: GFGcourse, quantity: 1}]);
    }
  };

  const deleteCourseFromCartFunction = (GFGCourse) => {
    const updatedCart = cartCourses.filter(item => item.product.id !== GFGCourse.id);
    setCartCourses(updatedCart);
  };

  const totalAmountCalculationFunction = () => {
    return cartCourses.reduce((total, item) => 
      total + item.product.price * item.quantity, 0);
  };

  const courseSearchUserFunction = (event) => {
    setSearchCourse(event.target.value);
  };

  const filterCourseFunction = courses.filter((course) =>
    course.name.toLowerCase().includes(searchCourse.toLowerCase())
  );

  return (
    <div className="App">
      <SearchComponent searchCourse={searchCourse} courseSearchUserFunction={courseSearchUserFunction} />
      <main className="App-main">
        <ShowCourseComponent
          courses={courses}
          filterCourseFunction={filterCourseFunction}
          addCourseToCartFunction={addCourseToCartFunction}
        />

        <UserCartComponent
          cartCourses={cartCourses}
          deleteCourseFromCartFunction={deleteCourseFromCartFunction}
          totalAmountCalculationFunction={totalAmountCalculationFunction}
          setCartCourses={setCartCourses}
        />

        {/* Render the Contact component */}
        <Contact />
      </main>
    </div>
  );
}

export default App;