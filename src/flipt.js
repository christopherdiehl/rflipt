import React from "react";

const api = (function() {
  let _url;
  let _cache = {};
  const THIRTY_MINUTES = 30 * 60 * 100;
  return {
    init: url => {
      _url = url;
    },
    /*
     * returns a Promise that resolves to a boolean representing if the flag is enabled
     * Caches the flag response for thirty minutes
     * @param {string} flag // flag key
     * @return {Promise => boolean} enabled
     */
    isFlagEnabled: async flag => {
      if (!_url) {
        return new Error("Please initialize flip before using");
      }
      let currentDate = Date.now();
      if (
        _cache[flag] == null ||
        currentDate - _cache[flag].dateAdded > THIRTY_MINUTES
      ) {
        const flagRes = await fetch(`${_url}/api/v1/flags/${flag}`, {
          method: "GET",
          "Content-Type": "application/json",
          mode: "cors"
        }).then(res => res.json());
        _cache[flag] = {
          dateAdded: currentDate,
          enabled: flagRes.enabled
        };
      }
      return _cache[flag].enabled;
    }
  };
})();

// initialize the api with your own url here
api.init("http://lvh.me:8080");

// Display component if flag is enabled
export class FliptDisplayIfEnabled extends React.PureComponent {
  state = {
    enabled: false
  };
  constructor(props) {
    super(props);
    this.getFlagInformation();
  }
  getFlagInformation = async () => {
    const enabled = await api.isFlagEnabled(this.props.flag);
    this.setState({
      enabled: enabled
    });
  };
  render() {
    if (this.state.enabled) {
      return this.props.children;
    } else {
      return null;
    }
  }
}

// Display different components depending on flag being enabled.
// Note: uses render props, if not familiar checkout: https://reactjs.org/docs/render-props.html
export class FliptEnabledDisabled extends React.PureComponent {
  state = {
    enabled: false
  };
  constructor(props) {
    super(props);
    this.getFlagInformation();
  }
  getFlagInformation = async () => {
    const enabled = await api.isFlagEnabled(this.props.flag);
    this.setState({
      enabled: enabled
    });
  };
  render() {
    if (this.state.enabled) {
      return this.props.enabled;
    } else {
      return this.props.disabled;
    }
  }
}
