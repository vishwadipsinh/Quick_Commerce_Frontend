import React, { useEffect } from "react";

import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const Product = ({ items, cart, setCart }) => {

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (id, price, title, description, imgSrc) => {
    const existingItem = cart.find((item) => item.id === id);

    if (existingItem) {
      console.log("exisitng");

      setCart(
        cart.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    } else {
      console.log("not exisitng");

      const obj = { id, price, title, description, imgSrc, quantity: 1 };
      setCart([...cart, obj]);
    }

    // const obj = {
    //   id,price,title,description,imgSrc,quantity: 1
    // }
    // setCart([...cart, obj]);

    console.log("Cart element = ", cart);
    toast.success("Item added on cart", {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };
  const removeFromCart = (id) => {
    setCart(
      cart
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );
    console.log("Cart element = ", cart);

    toast.success("Item removed from cart", {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

  const truncateTitle = (title, maxLength = 18) => {
    return title.length > maxLength
      ? title.substring(0, maxLength) + "..."
      : title;
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <div className="container my-5">
        <div className="row">
          {items.map((product) => {
            // console.log(product);
            return (
              <>
                <div
                  key={product.id}
                  className="col-lg-4 col-md-6 my-3 text-center"
                >
                  <div className="card" style={{ width: "18rem" }}>
                    <Link
                      to={`/product/${product.id}`}
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <img
                        src={product.imgSrc}
                        className="card-img-top"
                        alt="..."
                      // style={{height:"300px"}}
                      />
                    </Link>
                    <div className="card-body">
                      <h5 className="card-title">
                        {truncateTitle(product.title)}
                      </h5>
                      <p className="card-text">{product.description}</p>
                      <div className="price-quantity-card">

                        <button className="btn btn-primary mx-3">
                          {product.price} ₹
                        </button>
                        {
                          cart.filter((item) => {
                            return item.id === product.id;
                          }).length > 0 ? (
                            <div className="cartButtonHome">
                              <button
                                className="btn btn-success mx-3"
                                onClick={() => removeFromCart(product.id)}
                              >
                                -
                              </button>
                              <p className="card-text">
                                {cart.find((item) => item.id === product.id)
                                  ?.quantity || 0}
                              </p>

                              <button
                                className="btn btn-success mx-3"
                                onClick={() =>
                                  addToCart(
                                    product.id,
                                    product.price,
                                    product.title,
                                    product.description,
                                    product.imgSrc
                                  )
                                }
                              >
                                +
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() =>
                                addToCart(
                                  product.id,
                                  product.price,
                                  product.title,
                                  product.description,
                                  product.imgSrc
                                )
                              }
                              className="btn btn-warning"
                            >
                              Add To Cart
                            </button>
                          )
                          // cart.map((item) => {
                          //   if (item.id === product.id) {
                          //     return (
                          //       <button
                          //         key={item.id}
                          //         className="btn btn-success mx-3"
                          //         disabled
                          //       >
                          //         In Cart
                          //       </button>
                          //     );
                          //   } else {
                          //     <button
                          //       onClick={() =>
                          //         addToCart(
                          //           product.id,
                          //           product.price,
                          //           product.title,
                          //           product.description,
                          //           product.imgSrc
                          //         )
                          //       }
                          //       className="btn btn-warning"
                          //     >
                          //       Add To Cart
                          //     </button>;
                          //   }

                          //   return null;
                          // })
                        }
                      </div>
                      {/* <button
                            onClick={() =>
                              addToCart(
                                product.id,
                                product.price,
                                product.title,
                                product.description,
                                product.imgSrc
                              )
                            }
                            className="btn btn-warning"
                          >
                            Add To Cart
                          </button> */}
                    </div>
                  </div>
                </div>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Product;
