import { PureComponent } from 'react';

import { isEmpty } from 'lodash';

export default class Thumb extends PureComponent {
  image = new Image();

  constructor() {
    this.state = {};
  }

  componentDidMount() {
    this.image.onload = () => {
      this.setState({ path: this.image.src });
    };

    this.image.onerror = () => {
      this.setState({ path: '' });
    };

    this.handleImage();
  }

  componentDidUpdate(prevProps) {
    const { url } = this.props;

    if (prevProps.url !== url) {
      this.handleImage();
    }
  }

  handleImage = () => {
    const { url } = this.props;

    if (!isEmpty(url)) {
      this.image.src = url;
    }
  };

  get thumbnail() {
    const { fallback } = this.props;
    const { path } = this.state;

    if (isEmpty(path)) {
      return fallback;
    }

    return (
      <div
        style={{ backgroundImage: `url('${path}')` }}
        role="img"
        aria-label={path}
      />
    );
  }

  render() {
    return <div>{this.thumbnail}</div>;
  }
}

// for caching
const handleSuccess = useCallback(
  (blob) => {
    const reader = new FileReader();
    reader.readAsDataURL(blob);

    reader.onloadend = function () {
      const data = reader.result;

      dispatch(
        setImageData({
          target: String(target),
          base64: data,
          status: Status.Success,
        }),
      );
    };
  },
  [target],
);
