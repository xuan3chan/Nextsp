import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { LoadingContext } from '../../contexts/loading';

export function LoadingProvider(props) {
  const [loading, setLoading] = useState(false);

  return (
    <LoadingContext.Provider
      value={{
        loading: loading,
        show: () => setLoading(true),
        hide: () => setLoading(false)
      }}>
      {props.children}
    </LoadingContext.Provider>
  );
}

LoadingProvider.propTypes = {
  children: PropTypes.node
};