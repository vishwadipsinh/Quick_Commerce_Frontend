import React from "react";
import { Link } from "react-router-dom";


const Cart = ({ cart, setCart }) => {
  const addToCart = (id) => {
    setCart(
      cart.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const removeFromCart = (id) => {
    setCart(
      cart
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const grandTotal = cart?.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);


  const clearCart = () => {
    setCart([])
    localStorage.setItem("cart", "");
  }

  return (
    <>
      <div className="container my-5" style={{ width: "54%" }}>
        {cart.length == 0 ? (
          <>
            <div className="text-center">
              <h1>Your Cart is Empty</h1>
              <Link to={"/"} className="btn btn-warning">
                Continue Shopping...
              </Link>
            </div>
          </>
        ) : (
          cart.map((product) => {
            return (
              <>
                <div className="card mb-3 my-5" style={{ width: "700px" }}>
                  <div className="row g-0">
                    <div className="col-md-4">
                      <img
                        src={product.imgSrc}
                        className="img-fluid rounded-start"
                        alt="..."
                      />
                    </div>
                    <div className="col-md-8">
                      <div className="card-body text-center product-box">
                        <h5 className="card-title">{product.title}</h5>
                        <div
                          style={{ display: "flex", justifyContent: "center" }}
                        >
                          <p
                            className="card-text"
                            style={{ paddingRight: "15px" }}
                          >
                            {product.description}
                          </p>
                          {/* <p
                            className="card-text"
                            style={{ paddingLeft: "15px" }}
                          >
                            {product.quantity}
                          </p> */}
                        </div>
                        <div className="price-quantity-card">
                          <button className="btn btn-primary mx-3">
                            {product.price * product.quantity} ₹
                          </button>

                          {
                            <div className="cartButtonHome">
                              <button
                                className="btn btn-success mx-3"
                                onClick={() => removeFromCart(product.id)}
                              >
                                -
                              </button>
                              <p className="card-text"> {product.quantity}</p>

                              <button
                                className="btn btn-success mx-3"
                                onClick={() => addToCart(product.id)}
                              >
                                +
                              </button>
                            </div>
                          }
                        </div>

                        {/* <button className="btn btn-warning">Buy Now</button> */}
                      </div>
                    </div>
                  </div>
                </div>
              </>
            );
          })
        )}
      </div>

      {cart.length != 0 && (
        <div
          className="container text-center my-5"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <a href="https://www.zeptonow.com/pip/zepto-cafe/12830?srsltid=AfmBOorfcEogkY8vh4RIuulhCFveS5jngucjGVOZxnLVqwaIBohmirGY">
            <button className="btn btn-warning mx-5 ">CheckOut</button>
          </a>

          <div className="btn btn-primary mx-2">Grand Total: {grandTotal}</div>

          <button onClick={clearCart} className="btn btn-secondary clearcartbutton">
            Clear Cart
          </button>
        </div>
      )}
    </>
  );
};

export default Cart;
