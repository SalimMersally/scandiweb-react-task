import React, { Component } from "react";

// Icons
import RightArrow from "../../icons/RightArrow";
import LeftArrow from "../../icons/LeftArrow";

export class ItemImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentImage: 0, // By Default we set the first image
    };
  }

  // go the next image
  // if this is the last image go back to the first
  nextImage = (index) => {
    if (this.state.currentImage < this.props.gallery.length - 1) {
      this.setState((prev) => {
        const currentImage = this.state.currentImage + 1;
        return { currentImage };
      });
    } else {
      this.setState((prev) => {
        const currentImage = 0;
        return { currentImage };
      });
    }
  };

  // go the previous image
  // if this is the first go the last item
  prevImage = (index) => {
    if (this.state.currentImage > 0) {
      this.setState((prev) => {
        const currentImage = this.state.currentImage - 1;
        return { currentImage };
      });
    } else {
      this.setState((prev) => {
        const currentImage = this.props.gallery.length - 1;
        return { currentImage };
      });
    }
  };

  render() {
    const { id, gallery } = this.props;

    return (
      <div className="cartItemImage">
        <div className="leftArrow" onClick={this.prevImage}>
          <LeftArrow />
        </div>
        <img src={gallery[this.state.currentImage]} alt={id + " image"} />
        <div className="rightArrow" onClick={this.nextImage}>
          <RightArrow />
        </div>
      </div>
    );
  }
}

export default ItemImage;
