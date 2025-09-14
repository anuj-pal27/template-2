import React, { useState } from "react";
import "./OrderTracking.css";
import { FiPackage, FiTruck, FiCheckCircle, FiClock, FiSearch } from "react-icons/fi";
import { Link } from "react-router-dom";

const OrderTracking = () => {
  const [orderNumber, setOrderNumber] = useState("");
  const [email, setEmail] = useState("");
  const [trackingData, setTrackingData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Mock tracking data - in a real app, this would come from an API
  const mockTrackingData = {
    orderNumber: "12345",
    status: "shipped",
    estimatedDelivery: "2024-01-15",
    trackingNumber: "TRK789456123",
    items: [
      {
        id: 1,
        name: "Cotton T-Shirt",
        quantity: 2,
        price: 29.99,
        image: "/path/to/image.jpg"
      },
      {
        id: 2,
        name: "Denim Jeans",
        quantity: 1,
        price: 79.99,
        image: "/path/to/image.jpg"
      }
    ],
    timeline: [
      {
        status: "order_placed",
        date: "2024-01-10",
        time: "10:30 AM",
        description: "Order placed successfully",
        completed: true
      },
      {
        status: "processing",
        date: "2024-01-11",
        time: "09:15 AM",
        description: "Order is being processed",
        completed: true
      },
      {
        status: "shipped",
        date: "2024-01-12",
        time: "02:45 PM",
        description: "Order has been shipped",
        completed: true
      },
      {
        status: "in_transit",
        date: "2024-01-13",
        time: "11:20 AM",
        description: "Package is in transit",
        completed: true
      },
      {
        status: "out_for_delivery",
        date: "2024-01-15",
        time: "08:00 AM",
        description: "Out for delivery",
        completed: false
      },
      {
        status: "delivered",
        date: "2024-01-15",
        time: "Expected",
        description: "Package delivered",
        completed: false
      }
    ]
  };

  const handleTrackOrder = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const trimmedOrderNumber = orderNumber.trim();
      const trimmedEmail = email.trim();
      
      if (trimmedOrderNumber === "12345" && trimmedEmail === "user@example.com") {
        setTrackingData(mockTrackingData);
      } else {
        setTrackingData(null);
      }
      setIsLoading(false);
    }, 1500);
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "order_placed":
        return <FiPackage className="status-icon" />;
      case "processing":
        return <FiClock className="status-icon" />;
      case "shipped":
      case "in_transit":
        return <FiTruck className="status-icon" />;
      case "delivered":
        return <FiCheckCircle className="status-icon" />;
      default:
        return <FiClock className="status-icon" />;
    }
  };

  const getStatusColor = (status, completed) => {
    if (!completed) return "pending";
    switch (status) {
      case "order_placed":
      case "processing":
        return "processing";
      case "shipped":
      case "in_transit":
        return "shipped";
      case "delivered":
        return "delivered";
      default:
        return "pending";
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="order-tracking-section">
      <div className="tracking-container">
        {/* Header */}
        <div className="tracking-header">
          <h1>Track Your Order</h1>
          <p>Enter your order number and email to track your package</p>
        </div>

        {/* Search Form */}
        <div className="tracking-search-form">
          <form onSubmit={handleTrackOrder}>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="orderNumber">Order Number</label>
                <input
                  type="text"
                  id="orderNumber"
                  value={orderNumber}
                  onChange={(e) => setOrderNumber(e.target.value)}
                  placeholder="Enter order number"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter email address"
                  required
                />
              </div>
            </div>
            <button type="submit" className="track-button" disabled={isLoading}>
              {isLoading ? (
                <>
                  <FiClock className="loading-icon" />
                  Tracking...
                </>
              ) : (
                <>
                  <FiSearch />
                  Track Order
                </>
              )}
            </button>
          </form>
        </div>

        {/* Demo Info */}
        <div className="demo-info">
          <p><strong>Demo:</strong> Use Order Number: <code>12345</code> and Email: <code>user@example.com</code></p>
        </div>

        {/* Tracking Results */}
        {trackingData ? (
          <div className="tracking-results">
            {/* Order Summary */}
            <div className="order-summary">
              <h2>Order Summary</h2>
              <div className="summary-grid">
                <div className="summary-item">
                  <span className="label">Order Number:</span>
                  <span className="value">#{trackingData.orderNumber}</span>
                </div>
                <div className="summary-item">
                  <span className="label">Status:</span>
                  <span className={`value status-${getStatusColor(trackingData.status, true)}`}>
                    {trackingData.status.replace('_', ' ').toUpperCase()}
                  </span>
                </div>
                <div className="summary-item">
                  <span className="label">Tracking Number:</span>
                  <span className="value">{trackingData.trackingNumber}</span>
                </div>
                <div className="summary-item">
                  <span className="label">Estimated Delivery:</span>
                  <span className="value">{trackingData.estimatedDelivery}</span>
                </div>
              </div>
            </div>

            {/* Order Items */}
            <div className="order-items">
              <h3>Order Items</h3>
              <div className="items-list">
                {trackingData.items.map((item) => (
                  <div key={item.id} className="item-card">
                    <div className="item-info">
                      <h4>{item.name}</h4>
                      <p>Quantity: {item.quantity}</p>
                      <p className="price">${item.price.toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tracking Timeline */}
            <div className="tracking-timeline">
              <h3>Tracking Timeline</h3>
              <div className="timeline">
                {trackingData.timeline.map((step, index) => (
                  <div key={index} className={`timeline-item ${getStatusColor(step.status, step.completed)}`}>
                    <div className="timeline-icon">
                      {getStatusIcon(step.status)}
                    </div>
                    <div className="timeline-content">
                      <h4>{step.description}</h4>
                      <p>{step.date} at {step.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : trackingData === null && orderNumber && email ? (
          <div className="no-results">
            <h3>Order Not Found</h3>
            <p>We couldn't find an order with the provided information. Please check your order number and email address.</p>
            <Link to="/contact" onClick={scrollToTop} className="contact-link">
              Contact Support
            </Link>
          </div>
        ) : null}

        {/* Help Section */}
        <div className="tracking-help">
          <h3>Need Help?</h3>
          <p>If you're having trouble tracking your order, please contact our customer support team.</p>
          <div className="help-links">
            <Link to="/contact" onClick={scrollToTop} className="help-link">
              Contact Support
            </Link>
            <Link to="/shop" onClick={scrollToTop} className="help-link">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderTracking;
