import React, { Component } from "react";

export class ProductImages extends Component {
  constructor(props) {
    super(props);
    this.state = { currentURL: "" };
  }

  componentDidMount() {
    if (this.props.gallery[0]) {
      this.setState({ currentURL: this.props.gallery[0] });
    }
  }

  componentDidUpdate(prevProp) {
    if (prevProp !== this.props) {
      if (this.props.gallery[0]) {
        this.setState({ currentURL: this.props.gallery[0] });
      }
    }
  }

  // change the current image url
  setImage = (URL) => {
    this.setState({ currentURL: URL });
  };

  render() {
    const { gallery, name } = this.props;

    return (
      <>
        <div className="imageList">
          {gallery.map((url, index) => {
            return (
              <img
                src={url}
                key={"MiniImage " + index}
                alt={name + " image " + index}
                onClick={() => this.setImage(url)}
              />
            );
          })}
        </div>
        <div className="productImage">
          <div>
            <img src={this.state.currentURL} alt={name + " big image"} />
          </div>
        </div>
      </>
    );
  }
}

export default ProductImages;
