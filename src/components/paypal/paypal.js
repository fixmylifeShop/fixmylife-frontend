import React from 'react';
import ReactDOM from 'react-dom';
import paypal from 'paypal-checkout';
import { useHistory } from "react-router-dom";

/*
* By AFelipe MX  @afelipelc
*/

const PaypalCheckoutButton = (props) => {
let history = useHistory();
  const paypalConf = {
    currency: 'USD',
    env: 'sandbox',
    client: {
      sandbox: 'AWAd4dpfsGU8VhQyB6nVyqGTuUl-9A0POTjTNA89yJKTJg3pgmlXh8_oEniCDLI9zOOIv1gLgODH20Y-',
      production: '--',
    },
    style: {
        layout :"vertical",
      label: 'pay',
      size: 'large', // small | medium | large | responsive
      shape: 'rect',   // pill | rect
      // color: 'black',  // gold | blue | silver | black
    },
  };

  const PayPalButton = paypal.Button.driver('react', { React, ReactDOM });

  const payment = (data, actions) => {
    const payment = {
      transactions: [
        {
          amount: {
            total: props.total,
            currency: paypalConf.currency,
          },
          description: 'Compra en Test App',
        //   custom: order.customer || '',
        //   item_list: {
        //     items: order.items
        //   },
        },
      ],
      note_to_payer: 'Contact us for information on your purchase',
    };

    // console.log(payment);
    return actions.payment.create({
      payment,
    });
  };

  const onAuthorize = (data, actions) => {
    return actions.payment.execute()
      .then(response => {
        props.handleClose()
        console.log(response);
        localStorage.removeItem("cart")
        props.setPurchaseComplete(true)
        // history.push("/products")
        // alert(`
        // Payment was successfully processed, ID: ${response.id}`)
      })
      .catch(error => {
        props.handleClose()
        console.log(error);
	      alert('An error occurred while processing the payment with Paypal');
      });
  };

  const onError = (error) => {
    props.handleClose()
    alert ('Payment with PayPal was not made, please try again.' );
  };

  const onCancel = (data, actions) => {
    props.handleClose()
    alert( 'Payment with PayPal was not made, the user canceled the process.' );
  };


  return (
    <PayPalButton
      env={paypalConf.env}
      client={paypalConf.client}
      payment={(data, actions) => payment(data, actions)}
      onAuthorize={(data, actions) => onAuthorize(data, actions)}
      onCancel={(data, actions) => onCancel(data, actions)}
      onError={(error) => onError(error)}
      style={paypalConf.style}
      commit
    //   locale="es_MX"
    />

  );
}

export default PaypalCheckoutButton;