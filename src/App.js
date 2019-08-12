import React, { Component } from "react";
import logo from "./logo.png";
import "./App.css";

class App extends Component {
  constructor() {
    super();

    this.state = {
      isLoading: false,
      stripeToken: null
    };

    // configure Stripe Checkout
    this.stripeHandler = window.StripeCheckout.configure({
      key: "pk_live_EOze7bEz93Ma4mhV2s96mQ06001jZ7X77J",
      image: "/assets/images/car.png",
      locale: "auto",
      token: this.onGetStripeToken.bind(this)
    });
  }

  onGetStripeToken(token) {
    // Got Stripe token. This means user's card is valid!
    // We need to continue the payment process by sending this token to our own server.
    // More info: https://stripe.com/docs/charges
    this.setState({ stripeToken: token });
  }

  onClickPay(e) {
    e.preventDefault();
    this.setState({ isLoading: true });

    const onCheckoutOpened = () => {
      this.setState({ isLoading: false });
    };

    // open Stripe Checkout
    this.stripeHandler.open({
      name: "EZ VALET",
      description: "Thank you for parking with us",
      amount: 1000, // 10 USD -> 1000 cents
      currency: "usd",
      opened: onCheckoutOpened.bind(this)
    });
  }
  render() {
    var buttonText = this.state.isLoading ? "Please wait ..." : "Pay $10";
    var buttonClassName =
      "Pay-Now" + (this.state.isLoading ? " Pay-Now-Disabled" : "");
    if (this.state.stripeToken) {
      buttonText = "Processing your payment ...";
      buttonClassName = "Pay-Now Pay-Now-Disabled";
    }
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Ez valet payment option</h2>
        </div>
        {/* <p className="App-intro">
          {
            "Tap the button below to open Stripe's Checkout overlay. Replace <YOUR_STRIPE_PUBLISHABLE_KEY> in App.js with your own key."
          }
        </p> */}
        {this.state.stripeToken ? (
          <p className="App-intro">
            {"sk_test_GhzzixB7ipAuVUxXFKZ4TGd900FjvAcQjv" +
              this.state.stripeToken.id +
              ". Continue payment process in the server."}
          </p>
        ) : null}
        <a
          className={buttonClassName}
          href="#"
          onClick={this.onClickPay.bind(this)}
        >
          {buttonText}
        </a>
      </div>
    );
  }
}

export default App;
